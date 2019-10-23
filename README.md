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


The routing in this application is handled in bellows.js and is built from scratch.

This project defines many custom web components. The visual elements live in the `web/src/templates` folder. The business logic associated with the User interface element lives in the web/src/components folder.

In particular, the `create-study-group-view.js` file contains great introductory functions for developers interested in better leveraging the Microsoft Graph Toolkit. 

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
