---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/running-cascade-cms-as-a-linux-service.html
title: Running Cascade CMS as a Linux service - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Installation & Upgrades

# Using systemd[](#Usingsystemd)

A sample systemd file can be found below:

`[Unit] Description=Cascade CMS Wants=network-online.target After=network-online.target  [Service] Type=forking User=cascade ExecStart=/path/to/cascade/cascade.sh start ExecStop=/path/to/cascade/cascade.sh stop 15 -force ExecReload=/path/to/cascade/cascade.sh stop 15 -force | sleep 5 | /path/to/cascade/cascade.sh start Restart=on-failure RestartSec=30s  [Install] WantedBy=multi-user.target`

**Note**: The sample above assumes that your O/S account is named `cascade`.

**Using Apache as a proxy?** You'll want to change lines 3 and 4 above to the following:

`Wants=network-online.target httpd.service After=network-online.target httpd.service`

# Using init.d[](#Usinginit_d)

A sample init.d file can be found below:

`#!/bin/bash # Cascade startup script #chkconfig: 2345 80 05 #description: Hannon Hill Cascade CMS  # Source function library. . /etc/rc.d/init.d/functions  # Wait time for stopping (and restarting) the service WAIT_TIME=15  # Cascade Linux service controller script APP=CASCADE BASE=/path/to/cascade USER=cascade cd $BASE  function start {  echo "Starting $APP"  sudo -u $USER $BASE/cascade.sh start  return $? }  function stop {  echo "Stopping $APP"  sudo -u $USER -c $BASE/cascade.sh stop $WAIT_TIME -force  return $? }  case "$1" in  start)   start   RETVAL=$?   ;;  stop)   stop   RETVAL=$?   ;;  restart)   stop   sleep $(($WAIT_TIME + 1))   start   RETVAL=$?   ;;  *)   echo "Usage: $0 {start|restart|stop}"   RETVAL=2   ;; esac  exit $RETVAL`

**Note**: The sample above assumes that your O/S account is named `cascade`.

# Looking to create a system user for the service?[](#Lookingtocreateasystemuserfortheservice)

## Create new system user with group

To create a new `cascade` system user without a home directory and without login/bash ability, along with a corresponding group, execute the following command:

`sudo useradd -M -s /usr/sbin/nologin cascade`

To verify the new user was created:

`sudo id cascade`

### Configure `ulimit` for the new user

Cascade CMS can potentially open many files at a time which can sometimes lead to issues such as "too many open files" error messages. To add a user-specific ulimit configuration:

`sudo touch /etc/security/limits.d/cascade_limits.conf sudo bash -c 'echo "cascade - core unlimited" >> /etc/security/limits.d/cascade_limits.conf' sudo bash -c 'echo "cascade - nofile 999999" >> /etc/security/limits.d/cascade_limits.conf'`

To verify the new limits:

`sudo -u cascade bash -c "ulimit -Ha"`

**Note:** The commands above may vary depending on the flavor of Linux you are using.

[↑](#top)

# Related Links

-   [Installation/Upgrade (ZIP)](https://www.hannonhill.com/cascadecms/latest/cascade-administration/installation-and-upgrades/linux.html)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }