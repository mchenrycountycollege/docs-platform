---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/connectors/how-to-set-up-a-spectate-connector.html
title: Spectate Connector - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Connectors and Integrations

# Creating a Spectate Connector[](#CreatingaSpectateConnector)

To create a Spectate Connector:

1.  Obtain the API Key from your Spectate account by logging into Spectate, clicking the **My Settings** link, and copying the key.
2.  Navigate to **Manage Site** > **Connectors**.
3.  Navigate to the container in which the new Connector will be stored, or create a new container using **Add** > **Container**.
4.  Click **Add** > **Connector**.
5.  Select **Spectate** and then click **Choose**.
6.  In the **Name** field, enter the name for your Connector.
7.  In the **Parent Container** field, select a container for your Connector, if desired.
8.  In the **Spectate API Key** field, paste the key you copied from your Spectate account.
9.  Click **Submit**.

# Verifying/Unverifying the Spectate Connector[](#VerifyingUnverifyingtheSpectateConnector)

To verify or unverify your Spectate connector:

1.  While viewing (but not editing) your Connector, click **Verify**. If unsuccessful, an appropriate error message will be displayed.
2.  Once verified, the **Unverify** link is available to deactivate the Connector.

Your Spectate Connector is now enabled. You can now select and insert your Spectate forms through the WYSIWYG when editing a page.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }