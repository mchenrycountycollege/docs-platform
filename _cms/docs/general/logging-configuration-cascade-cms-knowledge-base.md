---
source: https://www.hannonhill.com/cascadecms/latest/cascade-administration/administration-tools/logging-configuration.html
title: Logging Configuration - Cascade CMS Knowledge Base
category: general
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Administration Tools

# Overview[](#Overview)

This section of the Administration area provides system administrators with the ability to configure additional logging for troubleshooting purposes.

**Note** - In general, you should not change the default logging configuration unless troubleshooting a problem with the help of the Hannon Hill support team. Increasing logging may impact the performance of the system and should only be done for a limited time.

# Configuring Additional Logging[](#ConfiguringAdditionalLogging)

To configure additional logging for various areas of the system:

1.  Click the system menu button ( ) > **Administration** > **Logging Configuration.**
2.  Under the **Add Log Category or Package**section, click the first dropdown menu to display a list of available categories for logging. Alternatively, specific class names (provided to you by Hannon Hill) may be entered into this field.
3.  After selecting a category/package, use the dropdown menu below that field to select the type of logging to enable for the selected category (`Fatal`, `Error`, `Warn`, `Info`, `Debug`).
4.  Click **Add Category**.
5.  Repeat steps 2-4 above to add logging for additional categories or classes if needed.

# Reset Logging[](#ResetLogging)

To reset all logging back to the default configuration:

1.  Click the system menu button ( ) > **Administration** > **Logging Configuration**.
2.  Click **Reset to Default**.
3.  Click **OK** on the confirmation screen that appears.

# Performance Logging[](#PerformanceLogging)

Whenever DEBUG level logging is enabled for a particular class, performance information for that class will also be logged. Performance logging statements are written to a separate file named `cascade-performance.log`. This log contains information about how long it took to execute specific parts of the class being logged.  
  
It is also possible to enable performance logging for all classes in the system by selecting the `Performance` category and enabling the DEBUG logging level for it.

**Warning** - enabling Performance Logging should only be done at the request of the Hannon Hill support team.

# Slow Execution Logging[](#SlowExecutionLogging)

Whenever DEBUG level logging is enabled for a particular class, information about operations that take an excessive amount of time will also be logged to a separate slow execution log. This log file is named `cascade-slow-execution.log`.  
  
In addition to the information included in the Performance log, the Slow Execution log also includes a full stack trace for slow operations.  
  
It is also possible to enable Slow Execution log for all classes in the system by selecting the `Slow Execution` category and enabling the DEBUG logging level for it.

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }