---
source: https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/index.html
title: REST API - Cascade CMS Knowledge Base
category: api
scraped: 2026-02-16
version: cascade-cms-latest
---

# REST API

Cascade CMS REST API is a lightweight API for interfacing with Cascade's Web Services.

## Topics

-   [Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/operations.html)

Formally, [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) describes a way for a client to interact with web resources from a server using a set of stateless operations accessed via URIs.

Though the Cascade CMS v1 REST APi does not exactly follow RESTful API conventions, it is similar enough to be called so. The supported methods are "GET" and "POST". The name of the operation should be included in the URL. The request and response are in JSON format that resembles format of SOAP objects from Cascade CMS's Web Services.

Future version of the API may adhere more closely to REST.

[↑](#top)

### **What are the differences between SOAP and REST?**

The REST API's request and response structure is quite similar to the existing SOAP web services' request and response structure. The obvious difference is that SOAP web services use XML to communicate while REST uses JSON. However, there are few more subtle differences:  

-   When using REST API there is no need for any additional library to handle requests. As long as the specific language can handle JSON and sending requests through the network, that language can use REST API. This opens doors for easy usage of REST API in Javascript and .NET (.NET has a SOAP library but it is hard to set up and it runs into problems), while in PHP there is no need to enable the PHP SOAP module.
-   To use web services through SOAP with SSL (URLs with "https://"), additional settings are required in Apache to allow Cascade to connect to itself through SSL so that it can load the WSDL file. No such settings are necessary when using REST API, which reduces the burden on the server administrators.
-   There are a few differences between the XML SOAP envelope vs JSON. For instance, null values are returned in XML with **xsi:nil="true"** attribute while in JSON the null values are simply not there. Another difference is that arrays are wrapped in elements in XML, which then can be interpreted differently by different language specific libraries, while in REST API, the JSON response has plain arrays with elements in them.
-   Reading/Editing File assets using REST API uses byte array format whereas SOAP uses base64 encoded format.
-   SOAP accepts authentication only in the request body. Using REST API it is allowed to pass authentication to the URL. This is secure for the network over SSL - the credentials will be encrypted so that nobody can intercept the network connection and get the credentials. However, there is a chance that the server itself has logging enabled that stores accessed URLs. At that time, the server administrator could access the logs and see the password. To be 100% sure that the credentials cannot be seen by anyone (even the server administrator), you can pass credentials in the POST request's body. Even the "read" operation is allowed to be executed using POST request.
-   An average REST API operation has been reported to take about 30% longer time to execute. This might improve in the future.

[↑](#top)

[↑](#top)

## Related Links

-   [Getting started with REST](https://www.hannonhill.com/cascadecms/latest/faqs/development/getting-started-with-rest.html)
-   [Operations](https://www.hannonhill.com/cascadecms/latest/developing-in-cascade/rest-api/operations.html)

var copyDisable = true;