const BaseViewElement = require("./base-view");
require("./sign-in-view");
require("./drop-down-view");
require("./main-view");
require("./app-header-view");
require("./teams-auth-view");

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
    this.contentRoot = this.shadowRoot.getElementById("content-root");
    graphCalls.handleSignInFlow();
    window.addEventListener("popstate", event => {

      window.location = location.origin;

    });
  }

  navigate(view, parameter) {

    setTimeout(() => {

      if (this.currentView && this.currentView.unload) {

        this.currentView.unload();
      }

      let url = location.search;
      let urlParams = new URLSearchParams(url);
      let title = "Bellows App";

      if (parameter !== undefined){
        
        if (
           !(parameter.classId.length > 1) ||
           !(parameter.groupId.length > 1)
        ) {

          alert("One of the values was not selected, please fix that.")
          return null;
        } else if (urlParams.has("classId") && urlParams.has("groupId")) {

          let updatedUrl =  location.origin+"?classId="+parameter.classId+"&groupId="+parameter.groupId;

          window.history.pushState(
            {},
            title,
            updatedUrl);
        } else if (urlParams.has("classId") && !urlParams.has("groupId")) {

          alert("Please select a valid group and try again.")
          return null;

        } else if (!urlParams.has("classId") && urlParams.has("groupId")) {

          alert("Please select a valid course and try again.");
          return null;
        
        } else {

          urlParams.set("classId", parameter.classId);
          urlParams.set("groupId", parameter.groupId);
          window.history.pushState(
            {},
            title,
            decodeURIComponent(`${location.pathname}?${urlParams}`)
          );
        }
      } else {

        let view = document.createElement('drop-down-view');
        this.navigate(view,{
          
          groupId: "-1",
          classId: "-1"
        });
         
        return null;
      }

      this.currentView = view;
      if (this.contentRoot.firstChild && this.contentRoot.firstChild !== view) {

        this.contentRoot.removeChild(this.contentRoot.firstChild);
      }

      this.contentRoot.appendChild(this.currentView);

      if (this.currentView.initialize) {

        this.currentView.initialize(parameter);
      }
    }, 0);
  }
}

customElements.define(BellowsApp.tagName, BellowsApp);
module.exports = BellowsApp;
