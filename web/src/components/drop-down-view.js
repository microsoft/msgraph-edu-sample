  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const BaseViewElement = require("./base-view");
const {Providers} = require("@microsoft/mgt");


class DropDownViewElement extends BaseViewElement {

  static tagName = "drop-down-view";

  constructor() {

      super(DropDownViewElement.tagName);
   
      this.populateCourseDropDown();
      this.populateGroupDropDown();

      let submitButton = this.shadowRoot.querySelector(".submit-button");
      if(submitButton){

          submitButton.addEventListener("click", this.handleSubmitClick.bind(this));
      }
  }

  /**
   * Navigate to main view with selected params on dropdown. 
   *
   * @memberof DropDownViewElement
   */
  handleSubmitClick(){

      let groupDropDown = this.shadowRoot.querySelector(".group-selector");
      let classDropDown = this.shadowRoot.querySelector(".course-selector");

      let groupId = groupDropDown.options[groupDropDown.selectedIndex].value;
      let classId = classDropDown.options[classDropDown.selectedIndex].value;
    
      let url = new URL(window.location.href);
      let params = new URLSearchParams(url);

      params.append("classId",classId);
      params.append("groupId",groupId);

      let app = document.querySelector("bellows-app");
      let view = document.createElement("main-view");
      app.navigate(view, {

          groupId: groupId,
          classId: classId
      });
  }

  /**
   * Populate drop down selector for classes.
   *
   * @memberof DropDownViewElement
   */
  async populateCourseDropDown(){

      let provider = Providers.globalProvider;
      if (provider) {

          try {

              let graphClient = provider.graph.client;
              let coursesInfo = await graphClient.api("education/me/classes").get();

              let courseDropDown = this.shadowRoot.querySelector(".course-selector");
              courseDropDown.options[0] = new Option("Select a Course","");
              courseDropDown.options[0].style.cssText = "background-color:#335795;";

              for (let i = 0; i < coursesInfo["value"]["length"]; i++) {

                  courseDropDown.options[(i +1)] = new Option(coursesInfo["value"][i]["displayName"],coursesInfo["value"][i]["id"]);
                  courseDropDown.options[(i +1)].style.cssText = "background-color:#335795;";
              }
          } catch (error){

              console.log(error);
          }
      }
  }

  /**
   * Populate drop down selector for groups. 
   *
   * @memberof DropDownViewElement
   */
  async populateGroupDropDown(){

      let provider = Providers.globalProvider;
      if (provider) {

          try {

              let graphClient = provider.graph.client;
              let groupsInfo = await graphClient
                  .api("/me/joinedTeams").get();

              let groupsDropDown = this.shadowRoot.querySelector(".group-selector");
              groupsDropDown.options[0] = new Option("Select a Study Group","");
              groupsDropDown.options[0].style.cssText = "background-color:#335795;";

              for (let i = 0; i < groupsInfo["value"]["length"]; i++) {

                  groupsDropDown.options[(i +1)] = new Option(groupsInfo["value"][i]["displayName"],groupsInfo["value"][i]["id"]);
                  groupsDropDown.options[(i +1)].style.cssText = "background-color:#335795;";
            
              }

          } catch (error){
              console.log(error);
          }   
      }
  }
}
customElements.define(DropDownViewElement.tagName, DropDownViewElement);
module.exports = DropDownViewElement;
