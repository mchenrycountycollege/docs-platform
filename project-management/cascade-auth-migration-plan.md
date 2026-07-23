# Cascade-backed login — migration plan

**Status:** code complete (§3 + §5 step 2 done 2026-07-22, typecheck/tests/
build clean, 401-paths smoke-tested locally against live Cascade). Remaining:
§5 steps 1 and 3–8 (Cascade group setup, secret, deploy, verify, rate limit,
remove Access, cleanup). Written 2026-07-21.
**Supersedes:** Cloudflare Access email OTP as the editor's gate
(`editor-implementation-plan.md` §7, item 3).

---

## 1. Why

The editor is currently gated by **Cloudflare Access email OTP** with an
explicit email allow-list. Three problems, in the order they actually bite:

1. **Not self-serve.** Every coworker must be hand-added to an allow-list in
   the Cloudflare dashboard before they can log in at all.
2. **Depends on inbound email.** The OTP code is sent from Cloudflare's mail
   system to an `@mchenry.edu` inbox. College mail filtering (Defender /
   Proofpoint / Barracuda) may quarantine "here's your login code" mail from
   an unfamiliar sender. **This risk applies to any email-based flow**,
   including a bespoke signup-with-verification — which is why that option
   was rejected too.
3. **Two doors.** Access sits in front of the app's own UI, so a future
   in-app login would mean logging in twice.

**Cascade CMS becomes the identity provider instead.** We already provision
and administer Cascade user accounts, seat capacity is not a constraint, and
Cascade's REST API validates a username+password directly — so there is no
new account system to build and no email in the login loop.

### Verified 2026-07-21 (live, against `mchenry.cascadecms.com`)

Tested with a real scoped account (`docstest`). All three responses are
HTTP 200 — **the outcome is in the JSON body, not the status code**:

| Case | Response body |
|---|---|
| Valid credentials, permitted op (`listSites`) | `{"sites":[…],"success":true}` |
| Valid credentials, op needs higher privilege (`readPreferences`) | `{"success":false,"message":"Your user is not authorized to read system preferences."}` |
| **Wrong password** | `{"success":false,"message":"The username or password is incorrect"}` |

Two things this establishes:

- Authentication failure is **distinguishable** from authorization failure,
  which is exactly what a login gate needs.
- `listSites` is callable by a low-privilege account and **returns only the
  sites that account may access** — `docstest` saw `_common` and
  `Campus Safety`, *not* the docs site. That property is reused below as the
  authorization check.

---

## 2. Design

### 2.1 Cascade is the identity provider only — not the content credential

**The shared `CASCADE_API_KEY` service account keeps performing all content
reads and writes.** The user's own credentials are used for exactly one
thing: a single validation call at login. They are **never stored, never
persisted, and never used for content operations.**

Rationale: the alternative (proxying every content op as the logged-in user)
would let Cascade enforce per-user permissions natively, but it requires
holding user credentials for the whole session and rewrites every call site
in `cascade-client`. Not worth it here. The cost of the chosen approach is
that **authorization becomes the app's job** — handled in §2.3.

### 2.2 Login flow

```
POST /api/login  { username, password }
      │
      ├─ call Cascade  GET /api/v1/listSites?u=…&p=…   (user's own creds)
      │
      ├─ body says "The username or password is incorrect"  → 401, done
      ├─ CASCADE_SITE_NAME absent from returned sites       → 403, done   (§2.3)
      └─ otherwise → mint app session cookie, 200
```

**Credential-check rule (deliberately fail-closed):** treat as authenticated
only when `success === true`. Do **not** infer success from "the error
message wasn't the incorrect-password one" — that inverts safely-failing
logic into a string-match that a Hannon Hill wording change could turn into
an auth bypass. Log any unrecognized response shape and reject.

### 2.3 Authorization — who is allowed in

A valid Cascade login is *not* sufficient. Every Cascade user at the college
would otherwise get editor rights on the wiki.

**Check:** the `listSites` response must contain `CASCADE_SITE_NAME`. Since
Cascade only returns sites the account may access, this proves the account
was deliberately granted the docs site. No extra API call, no separate
allow-list to maintain — access is granted in Cascade, where accounts are
already managed.

**Cascade-side setup (do this first, it gates everything else):** create a
dedicated Group + Role — e.g. `wiki-contributors` — scoped to read+edit on
the docs site's path only. Do **not** reuse an existing broad role: these
credentials are real Cascade credentials, and a user given an admin-ish role
could sign into Cascade's own UI and touch unrelated content. Add each
coworker's account to that group.

### 2.4 Session

- **Format:** HS256 JWT via `jose` — already a dependency (`access-auth.ts`
  imports it), so no new package.
- **Claims:** `sub` (Cascade username), `iat`, `exp`.
- **Lifetime:** 30 days, sliding (reissue when <7 days remain) — this is an
  internal wiki, and short sessions would recreate the friction being removed.
- **Cookie:** `HttpOnly`, `Secure`, `SameSite=Lax`, `Path=/`.
  `HttpOnly` matters — it keeps the session unreadable from JS.
- **Signing key:** new `SESSION_SECRET` Pages **secret** (32+ random bytes).
  ⚠️ Per the memory note on this project: updating a Pages secret requires a
  fresh `wrangler pages deploy` to take effect — `secret put` alone does not
  touch the live deployment.

### 2.5 Brute force

`/api/login` accepts unlimited guesses against **real Cascade accounts**,
and a lockout there is a Cascade-side lockout. Add a Cloudflare **Rate
Limiting rule** on `/api/login` (e.g. 10 requests / 10 min / IP) before
removing Access. Access is currently absorbing this exposure implicitly;
removing it without a replacement is a genuine regression.

---

## 3. Code changes

All paths relative to `apps/editor/`.

| File | Change |
|---|---|
| `functions/lib/session.ts` | **New.** `createSessionCookie(username, env)`, `verifySession(request, env)`, `clearSessionCookie()`. Mirrors `access-auth.ts`'s fail-closed shape: throws `SessionAuthError`, callers return 401. |
| `functions/lib/cascade-login.ts` | **New.** `validateCascadeLogin(username, password, env)` → `{ ok: true } \| { ok: "unauthorized" } \| { ok: "forbidden" }`. Owns the `listSites` call, the `success === true` rule, and the site-membership check. **Must not** log or echo the password. |
| `functions/lib/access-auth.ts` | **Delete** once §5 is verified — not before. |
| `functions/lib/env.ts` | Add `SESSION_SECRET`. Remove `ACCESS_AUD`, `ACCESS_TEAM_DOMAIN` at cleanup. |
| `functions/worker.ts` | `handleApi` (line ~179): swap `verifyAccessJwt` → `verifySession`. Route `/api/login` and `/api/logout` **before** the session check. `email` variable → `username`; see §4. |
| `wrangler.toml` | Remove `ACCESS_TEAM_DOMAIN` / `ACCESS_AUD` vars at cleanup. `SESSION_SECRET` is a secret — never committed here. |
| `.dev.vars.example` | Add `SESSION_SECRET`; drop the two `ACCESS_*` entries. |
| `components/shell/LoginForm.tsx` | **New.** Username + password form. On 401 → "Username or password is incorrect." On 403 → "Your Cascade account doesn't have access to the docs site — ask Sean to add you." Distinct messages; the 403 case is the one people will actually hit. |
| `app/page.tsx` | Gate the shell: unauthenticated (any `/api/*` → 401) renders `LoginForm` instead of the tree. |
| `lib/api.ts` | Add `login()` / `logout()`. Cookie is same-origin so existing `fetch` calls need no change. Add a shared 401 handler that flips the app back to the login view on session expiry. |

---

## 4. Open question — what to stamp as `authorEmail`

**RESOLVED 2026-07-22: (b) with automatic fallback to (c), as implemented.**
Verified live: REST `read/user/{username}` *does* exist as an operation, but
the scoped service account gets "You do not have read permissions for the
requested asset" — so the lookup is instead attempted **with the user's own
credentials during login** (the one moment we legitimately hold them). If
Cascade returns the account's email it's carried in the session JWT and
stamped; any failure silently degrades to stamping the bare username.
`cascade-login.ts` owns this (`readOwnEmail`); it can never block a login.
Whether a low-privilege user may read their *own* record is still unverified
live — the fallback makes the answer non-blocking either way (check the
stamped value during §5 step 4 verification).

Original analysis, kept for context:

Cascade usernames are **not** email addresses, but the metadata field is
`authorEmail` (`worker.ts` lines 339, 406, 540; `structured-data.ts:91`) and
the git path writes real emails into it. Options:

- **(a) Derive** `${username}@mchenry.edu` via a new var. Simple; wrong for
  any account whose username ≠ email local-part.
- **(b) Read the user's email from Cascade** at login. Correct, but the REST
  operations list has no `readUser` — would need SOAP or an extra call.
  Verify before committing to it.
- **(c) Store the username as-is** and accept mixed semantics in the field.

**Recommendation: (b) if a working `readUser` exists, else (c)** — (c) is
honest about what we know, whereas (a) silently fabricates addresses that
may not exist. If (c), rename the field's *meaning* in a comment rather than
migrating stored data.

---

## 5. Sequencing — order matters

**Do not remove the Access policy until the new login is verified in
production.** Between removal and a working login, the app is fully open.

1. Cascade: create `wiki-contributors` group/role, scope to the docs site,
   add real users. Confirm `listSites` as one of them returns
   `CASCADE_SITE_NAME`.
2. ~~Build §3. Unit-test `cascade-login.ts` against all three known response
   bodies (§1) plus an unrecognized shape.~~ **Done 2026-07-22.** All §3
   files built (plus `GET /api/me` as the client's session probe and
   `functions/lib/session.test.ts`); 30 tests pass, typecheck and the full
   `pnpm build` worker bundle are clean. Smoke-tested via `pnpm pages:dev`:
   no-cookie → 401, wrong password → 401 (round-tripped through live
   Cascade), bad body → 400, logout clears the cookie, shell HTML serves.
   The login-success path can't be exercised until step 1 provides a real
   permitted account.
3. Set `SESSION_SECRET`; deploy.
4. **Verify on a preview deployment** (Pages Access policies are set per
   production/preview, so a preview can be exercised without fighting
   Access): log in as a real user, edit + save a page, confirm the write
   lands and `authorEmail` is stamped; log in as an account *without* docs
   site access → expect 403; wrong password → 401.
5. Add the `/api/login` rate limiting rule (§2.5).
6. **Now** remove the Access policy (Pages project → Settings → Access
   policy) and immediately re-verify: logged out in a clean browser →
   login form, not the tree; no `/api/*` route answers without a cookie.
7. Cleanup: delete `access-auth.ts`, drop `ACCESS_*` from `env.ts` /
   `wrangler.toml` / `.dev.vars.example`, and remove `jose`'s JWKS usage if
   nothing else needs it.
8. Update `editor-implementation-plan.md` §7 item 3 and the §4a audience
   table ("Allow-listed staff (Cloudflare Access OTP)") to describe
   Cascade-backed login. Update `v1-test-checklist.md` §3 — its Access-OTP
   steps (lines 16, 53–55, 89–95) become invalid.

---

## 6. Risks

| # | Risk | Mitigation |
|---|---|---|
| 1 | Access removed before login works → wiki fully public | Strict §5 ordering; verify on preview first |
| 2 | Credential-check logic inverted by an upstream wording change | Require `success === true`; never infer auth from a non-matching error string |
| 3 | Any Cascade user in the instance gets editor rights | §2.3 site-membership check — not just "did the password work" |
| 4 | Brute force against real Cascade accounts | Rate limiting rule (§2.5) before Access comes off |
| 5 | Wiki login doubles as real Cascade CMS login | Tightly scoped group/role (§2.3); users can reach Cascade's UI, so the role must be genuinely low-privilege |
| 6 | `SESSION_SECRET` set but not deployed | Redeploy after `secret put` — known Pages gotcha |
| 7 | Password logged via error paths | `cascade-login.ts` never logs the credential; send creds in the POST **body**, not the query string (the REST docs warn URLs may land in server logs) |

---

## 7. Housekeeping

**Rotate the `docstest` password.** It was pasted into a chat transcript on
2026-07-21 to run the verification in §1. It is a real Cascade account.
