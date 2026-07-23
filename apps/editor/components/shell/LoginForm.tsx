"use client";

import { useState, type FormEvent } from "react";
import { login, type Me } from "../../lib/api";

/**
 * Cascade-backed login (cascade-auth-migration-plan.md section 3): plain
 * username + password, validated against the user's own Cascade account.
 * The two failure modes get distinct messages -- "forbidden" (valid Cascade
 * account, never granted the docs site) is the one people will actually
 * hit, and it needs to say what to do about it rather than looking like a
 * typo'd password.
 */
export function LoginForm({ onLoggedIn }: { onLoggedIn: (me: Me) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const result = await login(username.trim(), password);
      if (result.ok) {
        onLoggedIn({ username: result.username, email: result.email });
        return;
      }
      if (result.kind === "unauthorized") {
        setError("Username or password is incorrect.");
      } else if (result.kind === "forbidden") {
        setError("Your Cascade account doesn't have access to the docs site -- ask Sean to add you.");
      } else {
        setError(`Sign-in failed: ${result.message}`);
      }
    } catch {
      setError("Sign-in failed: couldn't reach the server. Try again in a moment.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="login-screen">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-wordmark">MACS Docs</div>
        <p className="login-hint">Sign in with your Cascade CMS username and password.</p>
        <label className="login-field">
          <span>Username</span>
          <input
            type="text"
            name="username"
            autoComplete="username"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className="login-field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {error && (
          <p className="login-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="login-submit" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
