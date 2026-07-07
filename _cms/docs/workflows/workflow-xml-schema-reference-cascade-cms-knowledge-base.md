---
source: https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-xml-schema-reference.html
title: Workflow XML Schema Reference - Cascade CMS Knowledge Base
category: workflows
scraped: 2026-02-16
version: cascade-cms-latest
---

main{ display: flex; flex-direction: column; gap: 1em; }

Workflows

# System Workflow Definition[](#SystemWorkflowDefinition)

The system-workflow-definition element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| system-workflow-definition |  | 
The root tag for Workflow Definitions.

 | Yes |

## Attribute(s)

Attributes of the system-workflow-definition element
| Attribute Name | Values | Description | Req. |
| --- | --- | --- | --- |
| **name** | \[string\] | 
The name of the Workflow Definition.

 | Yes |
| **initial-step** | \[step identifier\] | 

The first step in the workflow process – the value here is the identifier for a step.

 | Yes |

* * *

# Triggers[](#Triggers)

The triggers element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| triggers | system-workflow-definition | 
Used to declare workflow triggers to be used later on by actions in the workflow.

 | No |

# Trigger[](#Trigger)

The trigger element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| trigger | triggers, action | 
Used to execute a process in the CMS pertaining to the content in the workflow process.

 | No |

## Attribute(s)

Attributes of the trigger element
| Attribute Name | Values | Description | Req. |
| --- | --- | --- | --- |
| **name** | \[string\] | 
The name of the trigger.

 | Yes |
| **class** | \[package name\] | 

The name of the Java class invoked by the trigger. This value is only needed in the initial declaration and not in subsequent invocations. Available triggers can be found on the [Triggers listing page](https://www.hannonhill.com/cascadecms/latest/content-management/workflows/workflow-triggers/index.html).

 | Yes |

# Steps[](#Steps)

The steps element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| steps | system-workflow-definition | 
Used to denote the start of the steps section in the workflow.

 | Yes |

# Non-ordered Steps[](#Non-orderedSteps)

The non-ordered-steps element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| non-ordered-steps | system-workflow-definition | 
Used to organize steps that are not part of the standard order in the workflow.

 | No |

## Attribute(s)

Attributes of the non-ordered-steps element
| Attribute Name | Values | Description | Req. |
| --- | --- | --- | --- |
| identifier | \[string\] | 
The name of the step used to refer to in other actions.

 | Yes |

# Step[](#Step)

The step element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| step | steps, non-ordered-steps | 
An individual step in the workflow. Typical steps include edit, approval, and publish.

 | Yes |

## Attribute(s)

Attributes of the step element
| Attribute Name | Values | Description | Req. |
| --- | --- | --- | --- |
| identifier | \[string\] | 
An identifying name for the step.

 | Yes |
| label | \[string\] | 

The text displayed on the screen as the title of the step.

 | Yes |
| type | transition, edit, system | 

The type of step in the system.

 | Yes |
| default-user | \[user\] | 

A default user to be supplied for this step.

 | No |
| default-group | \[group\] | 

A default group to be supplied for this step.

 | No |
| restrict-to-type | group, role | 

Restriction for the user chooser option associated with the step.

 | No |
| restrict-to-value | \[group\], Contributor, Approver, Publisher, Administrator | 

The actual filter for the restrict-to-type.

 | No |
| allow-user-group-change | true, false | 

If enabled, this feature allows the user or group assignment for the step to be changed when the workflow is started.

 | No |
| escalate-to | \[string\] | 

The step identifier of the step to escalate the workflow to.

 | No |
| escalation-hours | \[string\] | 

The number of hours to wait in this step before the workflow is escalated.

 | No |

# Actions[](#Actions)

The actions element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| actions | step | 
Available actions for the step. Typical actions included approve, reject, make further changes, and publish.

 | Yes |

# Action[](#Action)

The action element
| Tag Name | Parent Element | Description | Req. |
| --- | --- | --- | --- |
| action | actions | 
A specific action item for the step.

 | Yes |

## Attribute(s)

Attributes of the action element
| Attribute Name | Values | Description | Req. |
| --- | --- | --- | --- |
| identifier | \[string\] | 
The unique name identifying the action.

 | Yes |
| label | \[string\] | 

The text displayed on the screen as the link a user can click.

 | Yes |
| move | forward, reverse | 

The direction for the step to move.

 | No |
| next-id | \[identifier\] | 

The identifier of the next step in which to move.

 | No |

[↑](#top)

function toggleWidthAndIcon() { var element = document.getElementById("expand"); var icon = document.getElementById("iconToggle"); // Check if the content is currently full width if (element.classList.contains("width-full")) { // If yes, switch to "width" and update the icon to "expand" element.classList.remove("width-full"); element.classList.add("width"); icon.classList.remove('fa-down-left-and-up-right-to-center'); icon.classList.add('fa-up-right-and-down-left-from-center'); } else { // If not, switch to "width-full" and update the icon to "un-expand" element.classList.remove("width"); element.classList.add("width-full"); icon.classList.remove('fa-up-right-and-down-left-from-center'); icon.classList.add('fa-down-left-and-up-right-to-center'); } }