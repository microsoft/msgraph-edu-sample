# Bellows College Demo App

## Purpose

The purpose of this demo application is showcase Microsoft Graph in a real-world application. In particular, the scenario this application aims to address is student project management. We aim to Ignite the Spark that will drive success for all developers; we can ensure breadth partners are set up for success through helpers and reusable components that can enable any developer to quickly accomplish the same success.

## Contents



| File/folder       | Description                                        |
|-------------------|----------------------------------------------------|
| `teams`           | Manifest and assets to create Microsoft Teams app  |
| `web`             | Example code, also a self contained npm project    |
| `web/src`         | Source code for the project.                       |
| `web/dist`        | Webpack bundled output for the web npm project     |
| `README.md`       | This README file.                                  |
| `LICENSE`         | The license for the sample.                        |

### Technical Specifications:
* Microsoft Graph integration
* Microsoft Graph Toolkit components
* Progressive Web App
* Microsoft Teams integration with the Teams javascript SDK
* Microsoft Identity
* ES 6 , HTML 5, CSS

### Features:
* Integration with Microsoft Planner for task management
* Integration with group calendar for scheduling 
* Integration with Microsoft Teams for managing study groups
* Integration with people and classes for course information
* Integration with excel for assignment tracking and collaborative updates
* Progressive Web App install and teams tab install
* Integration with web notifications  


## Setup & Configuration

Create your own Azure tenant.  

* [Create an Azure Tenet](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-create-new-tenant)

* [Register an Azure Active Directory app in Azure portal](https://docs.microsoft.com/en-us/skype-sdk/ucwa/registeringyourapplicationinazuread)

* Ensure you register the app as multi tenant, make sure the [ID token authentication](https://stackoverflow.com/questions/49422588/aadsts70005-response-type-id-token-is-not-enabled-for-the-application) is set. Set the redirect URI to https://localhost8080, or configure it to your projects requirements. Sign in as an admin to grant all the necessary permissions. 

* Retrieve the clientID [Azure Portal](https://portal.azure.com) and set the environment variables accordingly.

#### Environment Variables

Applications will need to populate the following variables via an environment variables. For instance a locally run application might create a a .env file.

If you choose to deploy this app to Azure you can set environment variables in the Azure App Service User Interface.

* CLIENT_ID (mandatory)
* REL_FILE_PATH (optional)
* WORKBOOK_NAME (optional)
* PROGRESS_QUERY (optional)
* COLLABORATION_QUERY (optional)
* START_DATE (optional)
* END_DATE (optional)
* YEAR (optional)

### Permissions

Some permissions require Admin consent. It is recommended to first sign in with an admin account and approve permissions for entire tenant. It might take few minutes for permissions to propagate. 

### Running Locally

Navigate to the web folder and run the following commands:

1. `npm i` to install dependencies

2. `npm start` to build + deploy to http://localhost:8080/ 

3. `ngrok http 8080 -host-header=localhost:8080` to host locally using ngrok


### Deploying an App to Azure

1. `npm run build` to compile production code that will be output into the web/dist folder.
2. Use [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/) to host your application.
3. Set your environment variables accordingly

* [Example Demo Deployment](https://bellowsdemo.z22.web.core.windows.net/)​​​​​​​

### Teams Tab

We provide a sample manifest located in the teams folder that can be used to install the application as a Teams tab. To test your own app locally we recomend levraging ngrok until you have quality tested functionality and are ready for public app deployment. Developers will need to update all URLs in the manifest for their own app instance. Once the manifest is updated a developer can install the app with [App Studio for Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/get-started-app-studio) 

### Resources

* [App Studio for Microsoft Teams](https://docs.microsoft.com/en-us/microsoftteams/platform/get-started/get-started-app-studio) 
[Ngrok](https://ngrok.com/)
* [PWA Builder](https://www.pwabuilder.com/)
* [Teams JS](https://docs.microsoft.com/en-us/javascript/api/overview/msteams-client?view=msteams-client-js-latest)
* [Microsoft Graph Toolkit](https://github.com/microsoftgraph/microsoft-graph-toolkit)
* [Graph explorer](https://developer.microsoft.com/en-us/graph/graph-explorer)
* [Best practice for private config data](https://www.hanselman.com/blog/BestPracticesForPrivateConfigDataAndConnectionStringsInConfigurationInASPNETAndAzure.aspx)

## Key concepts

Teams integrations is an important aspect of this project. For instance, lets examine the contents of the `teams-helper.js` under the services folder.

``` async sendChatMessage(people, channelId, groupNameInput) ``` is a nifty function that accepts: all people chosen from the [Mgt-People-Picker](https://docs.microsoft.com/en-us/graph/toolkit/components/people-picker), a Teams channel Id, and a String that could be used for many purposes. In this project we are sending a message to our colleagues when on creation of a new teams channel. 

The services folder is chalk full of Microsoft integrations, if we take a look at the `pwabuilder-sw.js` we can find all the logic that enables us to pre-cache files, and download the app onto a machines operating system.

This project defines many custom web components. The visual HTML template elements live in the `web/src/templates` folder. The business logic associated with the User interface element lives in the web/src/components folder.

Modularization of code is an important principle of software engineering, for a cononical example of modern web components and their robust nature
look into the interactions between `create-study-group-view,js`, `study-group-item.js`,and `study-group-view.js`. 


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
