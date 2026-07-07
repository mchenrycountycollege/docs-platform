---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/index.html
title: System Configuration - Cascade CMS Knowledge Base
category: system-settings
scraped: 2026-02-16
version: cascade-cms-latest
---

# System Configuration

This section contains a number of pages related to configuring the application server itself along with the firewall.

## Topics

-   [Securing session cookies](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/securing-session-cookies.html)
-   [Updating the license key](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/update-license.html)
-   [Modifying the Heap Size](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-heap-size.html)
-   [Modifying the Database Configuration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-db.html)
-   [Modifying the Thread Stack Size](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-thread-stack.html)
-   [Load Balancing](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/load-balancing.html)
-   [Modifying Application Ports](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/modify-ports.html)
-   [Firewall Considerations](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/firewall.html)
-   [Configuring outbound proxy support for system-generated emails](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/email-proxy-support.html)
-   [Configuring Cascade CMS to point to a Java installation](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/java-configuration.html)
-   [Configuring the Heap Dump on Out of Memory option](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/heap-dump-oom.html)
-   [Upgrading Tomcat independently of Cascade CMS](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/upgrade-tomcat.html)
-   [SSL/TLS Configuration](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/ssl-tls-configuration.html)
-   [Forcing connections to use SSL/TLS](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/force-ssl-tls.html)
-   [Enabling or Disabling TLS Versions](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/enabling-or-disabling-tls-versions.html)
-   [Enabling HTTP Strict Transport Security (HSTS)](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/enabling-http-strict-transport-security-hsts.html)
-   [Using Apache 2.4 to proxy Cascade CMS](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/apache-2.4-proxy.html)
-   [Configuring Cascade CMS Log Rotation and Compression](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/system-configuration/logging-rotation-compression.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }