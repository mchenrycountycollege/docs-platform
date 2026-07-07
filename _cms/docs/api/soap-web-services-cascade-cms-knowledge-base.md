---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/index.html
title: SOAP Web Services - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

# SOAP Web Services

Web services provide Cascade CMS users with a powerful way to work with the system by providing a powerful back-end interface with which to interact.

## Topics

-   [SOAP Web Services Changelog](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-changelog.html)
-   [SOAP Web Services Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/soap-web-services-api/soap-web-services-operations.html)

## Background[](#Background)

Web services leverage the power of XML to communicate using SOAP (Simple Object Access Protocol). While most of the time one will use a framework that abstracts the logic away from writing the pure XML requests (such as a PHP SOAP client or Apache Axis), the common denominator are these SOAP messages in the XML format that must conform to the WSDL set forth by Cascade CMS.

For more information about the SOAP standard, please see: [https://www.w3.org/TR/soap/](https://www.w3.org/TR/soap/)

We also provide a [version of our webservices API based on REST that used JSON](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html).

[↑](#top)

## The WSDL[](#TheWSDL)

WSDL is the Web Services Description Language, and it describes all the information that is valid for transmission in a SOAP request and response for a specific web services implementation. It is simply a standard XML file containing descriptive information about how everything in a SOAP request/response is related.

For more information about WSDL, see: [https://www.w3.org/TR/wsdl](https://www.w3.org/TR/wsdl)

[↑](#top)

## Web Services End Points[](#WebServicesEndPoints)

### The Cascade CMS Asset Operation Endpoint

Most requests go through the Cascade CMS web services endpoint called the AssetOperationService. This Endpoint is responsible for create, read, edit, delete, publish, and batch operations.  
  
You can find a copy of the WSDL for this Endpoint on your local instance at `/ws/services/AssetOperationService?wsdl`, for instance at `http://cascade.mycompany.com:8080/ws/services/AssetOperationService?wsdl.`

### The Cascade CMS Security Endpoint

This endpoint is available to enable an external application to authenticate a user login for Cascade CMS. You can find a copy of the WSDL for this Endpoint on your local instance at `/ws/services/SecurityService?wsdl`, for instance at `http://cascade.mycompany.com:8080/ws/services/SecurityService?wsdl.`

[↑](#top)

## Sample Web Services Projects[](#SampleWebServicesProjects)

There is a [sample Java project](https://github.com/hannonhill/Webservices-Java-Sample-Project) and [sample PHP project](https://github.com/hannonhill/Webservices-PHP-Sample-Project) in a Git repository on [Hannon Hill's GitHub page](https://github.com/hannonhill) to help users get started using the Cascade SOAP Web Services.

To use Git, [download](https://git-scm.com/download) it from the website. If you a client installed already, repositories can be cloned using the Git url: git://github.com/hannonhill/Webservices-Java-Sample-Project.git from the GitHub project page, for example.

[↑](#top)

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }