# Bellows College Demo App

## Purpose

The purpose of this demo application is showcase Microsoft Graph in a real-world application. In particular, the scenario this application aims to address is student project management. We aim to Ignite the Spark that will drive success for all developers; we can ensure breadth partners are set up for success through helpers and reusable components that can enable any developer to quickly accomplish the same success.

### Technical Specifications:
* Microsoft Graph integration
* Microsoft Graph Toolkit components
* Progressive Web App
* Microsoft Teams integration with the Teams javascript SDK
* AAD Identity
* ES 6 , HTML 5, CSS



### Features:
* Integration with Microsoft Planner for task management
* Integration with group calendar for scheduling 
* Integration with Microsoft Teams for managing study groups
* INtegration with people and classes for course information
* Integration with excel for assignment tracking and collaborative updates
* Progressive Web App install and teams tab install
* Integration with web notifications  


### Setup & Configuration


Create your own Azure tenant.  
To Do: provide steps to set up a tenant using demos.microsoft.com 

* [Create an Azure Tenet](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant)

* [Register an app in azure AAD](https://docs.microsoft.com/en-us/skype-sdk/ucwa/registeringyourapplicationinazuread)

Ensure you register the app as multi tenant, make sure the [ID token authentication](https://stackoverflow.com/questions/49422588/aadsts70005-response-type-id-token-is-not-enabled-for-the-application) is set. Set the redirect URI to https://localhost8080, or configure it to your needs. Sign in as an admin to grant all the necessary permissions.    

* Retrieve the clientID and a group ID for a course of interest via [Azure Portal](https://portal.azure.com). 


A developer needs only to change two configuration files: secrets.sample.json, and config.json.

These files are located at the root of the web directory.






#### secrets.sample.json

Leverage the Microsoft Graph explorer to populate the secret values:
* [Microsoft-Graph-Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)


1. Sign in as an administrator and retrieve your azure tenants client Id.
2. Sign in as a student and use the [Microsoft Education Graph] (https://docs.microsoft.com/en-us/graph/api/educationschool-list-classes?view=graph-rest-1.0&tabs=http) endpoints to find a class.
3. groupId is a teams Id, which can be populated via [this](https://graph.microsoft.com/v1.0/me/joinedTeams) call in the graph explorer.
4. Copy paste the returned values into the secret.sample.json


#### config.json

Microsoft Onedrive and sharpoint integration with teams allows us to create an excel file in the cloud.

Once we create the excel file, which students can use to track and optimize collaboration workflows.

1. Update the values corresponding to the cloud excel file.
2. Update the dates corresponding to the timeline of the course.

### Permissions

Admin sign in and approve permissions accordingly. 

### Ngrok & Teams

Chat with Nikola to provide best practice for end users to set this part of the app up.


### Resources

* Ngrok
* PWA Builder
* Teams JS
* Microsoft Graph toolkit
* Graph explorer





# MICROSOFT TEMPLATE



---
page_type: sample
languages:
- csharp
products:
- dotnet
description: "Add 150 character max description"
urlFragment: "update-this-to-unique-url-stub"
---

# Official Microsoft Sample

<!-- 
Guidelines on README format: https://review.docs.microsoft.com/help/onboard/admin/samples/concepts/readme-template?branch=master

Guidance on onboarding samples to docs.microsoft.com/samples: https://review.docs.microsoft.com/help/onboard/admin/samples/process/onboarding?branch=master

Taxonomies for products and languages: https://review.docs.microsoft.com/new-hope/information-architecture/metadata/taxonomies?branch=master
-->

Give a short description for your sample here. What does it do and why is it important?

## Contents

Outline the file contents of the repository. It helps users navigate the codebase, build configuration and any related assets.

| File/folder       | Description                                |
|-------------------|--------------------------------------------|
| `src`             | Sample source code.                        |
| `.gitignore`      | Define what to ignore at commit time.      |
| `CHANGELOG.md`    | List of changes to the sample.             |
| `CONTRIBUTING.md` | Guidelines for contributing to the sample. |
| `README.md`       | This README file.                          |
| `LICENSE`         | The license for the sample.                |

## Prerequisites

Outline the required components and tools that a user might need to have on their machine in order to run the sample. This can be anything from frameworks, SDKs, OS versions or IDE releases.

## Setup

Explain how to prepare the sample once the user clones or downloads the repository. The section should outline every step necessary to install dependencies and set up any settings (for example, API keys and output folders).

## Runnning the sample

Outline step-by-step instructions to execute the sample and see its output. Include steps for executing the sample from the IDE, starting specific services in the Azure portal or anything related to the overall launch of the code.

## Key concepts

Provide users with more context on the tools and services used in the sample. Explain some of the code that is being used and how services interact with each other.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
