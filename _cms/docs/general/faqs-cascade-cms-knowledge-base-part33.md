---
parent: Frequently Asked Questions
section: Header message of length \[\] received but the packetSize is only \[\]
part: 33 of 139
source: https://www.hannonhill.com/cascadecms/latest/faqs/index.html
title: FAQs - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---
# Frequently Asked Questions - Header message of length \[\] received but the packetSize is only \[\]

## Header message of length \[\] received but the packetSize is only \[\]

Problem The size of the request header exceeds what's configured for the application. Solution Edit your tomcat/conf/server.xml configuration file and add a packetSize="65536" attribute to the appropriate connector. For example, change: <Connector port="8009" protocol="AJP/1.3"...

](https://www.hannonhill.com/cascadecms/latest/faqs/common-errors/header-message-of-length-received.html)[
