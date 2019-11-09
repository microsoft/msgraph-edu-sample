  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const BaseViewElement = require("./base-view");
const TeamsHelper = require("../services/teams-helper");


class TodoListViewElement extends BaseViewElement {

  static tagName = "todo-list-view";

  constructor() {

      super(TodoListViewElement.tagName);


      let teamsHelper = new TeamsHelper();
      teamsHelper.handleProviders();

      let createButton = this.shadowRoot.querySelector(".create-button");
      createButton.addEventListener("click", this.handleCreateClick.bind(this));
  }

  handleCreateClick() {
    
      console.log("Todo Create button clicked!");
      this.toggleNewTask();
      
  }


  /**
   * Toggle visibility of Microsoft Graph Toolkit Tasks
   *
   * @memberof TodoListViewElement
   */
  toggleNewTask(){

      let myTasks = this.shadowRoot.querySelector("mgt-tasks");
      myTasks.isNewTaskVisible = !myTasks.isNewTaskVisible;

  }
}

customElements.define(TodoListViewElement.tagName, TodoListViewElement);
module.exports = TodoListViewElement;