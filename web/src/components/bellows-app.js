  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const BaseViewElement = require("./base-view");
const { Providers, MsalProvider, TeamsProvider } = require("@microsoft/mgt");
const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
require("./drop-down-view");
require("./main-view");
require("./app-header-view");
require("./teams-auth-view");

const { PwaBuilder} = require("../services/pwabuilder-sw.js");

class BellowsApp extends BaseViewElement {
  static tagName = "bellows-app";

  static getInstance() {
      let tagName = BellowsApp.tagName;
      return document.querySelector(tagName);
  }

  currentView = null;
  contentRoot = null;

  constructor() {
      super(BellowsApp.tagName);

      //Define the scope of permissions for the application
      let scopes = [
          "user.read",
          "people.read",
          "user.readbasic.all",
          "contacts.read",
          "calendars.read",
          "files.read",
          "group.read.all",
          "tasks.readwrite",
          "Group.ReadWrite.All",
          "EduRoster.ReadBasic",
          "User.Read.All",
          "User.ReadWrite.All"
      ];

      const clientId = process.env.CLIENT_ID;

      if (TeamsProvider.isAvailable) {
          TeamsProvider.microsoftTeamsLib = teams;
          Providers.globalProvider = new TeamsProvider({
              clientId: clientId,
              authPopupUrl: "auth.html",
              scopes: scopes
          });
      } else {
          Providers.globalProvider = new MsalProvider({
              clientId: clientId,
              scopes: scopes
          });
      }


      if ("serviceWorker" in navigator) {
        if (navigator.serviceWorker.controller) {
          console.log("[PWA Builder] active service worker found, no need to register");
        } else {
          // Register the service worker
          navigator.serviceWorker
            .register(PwaBuilder, {
              scope: "./"
            })
            .then(function (reg) {
              console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
            });
        }
      }
      this.contentRoot = this.shadowRoot.getElementById("content-root");
      window.addEventListener("popstate", () => {
          window.location = location.origin;
      });
  }

  /**
   * @param {JSON} parameters Json object of values that will be injected into the url query
   * @param {String} title Title of teh route that will be loaded.  
   * 
   */
  updateParameterState(parameters, title) {
      let keys = Object.keys(parameters);
      let values = Object.values(parameters);

      let updatedUrl = location.origin + "?";
      for (let i = 0; i < keys.length; i++) {
          if (i == 0) {
              updatedUrl = updatedUrl + keys[i] + "=" + values[i];
          } else {
              updatedUrl = updatedUrl + "&" + keys[i] + "=" + values[i];
          }
      }

      window.history.pushState({}, title, updatedUrl);
  }

  /**
   * Initialize parameter values. THe canonical landing values are operationalized to -1 for simplicity.
   * One can add additional query values here to initialize them.
   */
  initSignInFlow(viewName) {
      let parameters = { groupId: -1, classId: -1 };
      let view = document.createElement(viewName);
      this.navigate(view, parameters);
  }


  /**
   * Router logic that handles state and parameter changes
   *
   * @param {Web Component} view Dom element to route the UI
   * @param {JSON} parameters Json object that is injected into the url query
   */
  navigate(view, parameters) {
      setTimeout(() => {
          if (this.currentView && this.currentView.unload) {
              this.currentView.unload();
          }

          let title = "Bellows App";
          let initView = "drop-down-view";

          if (parameters !== undefined) {
              let parameterKeys = Object.keys(parameters);
              let parametersValues = Object.values(parameters);
              //Check to see if parameters have been initialized to -1
              let parametersCheck = parametersValues.filter(value => value === -1);
              if (parametersCheck.length != parameterKeys.length) {
                  //36 is the length of a id token for both classes and groups, and most Azure resources.
          
                  parametersCheck = parametersValues.filter(
                      value => value.length === 36
                  );
                  //If a developer wants to add additional routes this code would need to be abstracted further.
                  if (parametersCheck.length != parameterKeys.length) {
                      alert("One of the values was not selected, please fix that.");
                      return null;
                  } else {
                      this.updateParameterState(parameters, title);
                  }
              }
          } else {
              this.initSignInFlow(initView);
              return null;
          }

          this.currentView = view;
          while (
              this.contentRoot.firstChild &&
        this.contentRoot.firstChild !== view
          ) {
              this.contentRoot.removeChild(this.contentRoot.firstChild);
          }

          this.contentRoot.appendChild(this.currentView);

          if (this.currentView.initialize) {
              this.currentView.initialize(parameters);
          }
      }, 0);
  }
}

customElements.define(BellowsApp.tagName, BellowsApp);
module.exports = BellowsApp;
