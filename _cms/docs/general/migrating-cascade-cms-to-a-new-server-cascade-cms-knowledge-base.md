---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/migrate-server.html
title: Migrating Cascade CMS to a new server - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Installation & Upgrades

# Overview[](#Overview)

The following is a general overview of steps you can take to migrate your instance of Cascade CMS to a new application server:

1.  **Request a license for the new application server**. To do this, send an email to support \[at\] hannonhill.com and be sure to include:
    -   The internal host name of the machine in question. To get this value, open a command prompt/terminal on the machine and enter:  `hostname`
    -   The type of environment where you're installing Cascade CMS (production, test, development, etc).
2.  **Download the Cascade CMS installer**. Visit our [downloads page](https://www.hannonhill.com/downloads/cascade) to obtain an installer *whose version matches - or is newer than - the version that you currently use* (on the machine you're migrating away from).
3.  **Make a backup of your Cascade CMS database**. Create a backup of your database or verify that you have available backups from the previous night (just in case anything goes wrong).
4.  **Install Cascade CMS**. Follow the steps for your O/S vendor to [install/configure Cascade CMS](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/index.html). When prompted to enter the database connection information, be sure to enter the connection information for your existing Cascade CMS database.  
    
    **Warning**: Before starting Cascade CMS on the new machine, be sure to **STOP** any other Cascade CMS processes on the old app server(s) that are running against the existing database.
    
5.  **Start Cascade CMS**. Using the steps in your O/S vendor installation instructions, start Cascade CMS. When the application starts up, it will connect to your existing database (or whichever database you configured the app to point to during installation/configuration). When you browse to the login screen for the first time, you will be prompted to enter license (at which point you will enter the license key that you received from Hannon Hill in step 1).

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }