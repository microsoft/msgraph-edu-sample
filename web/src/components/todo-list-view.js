const BaseViewElement = require("./base-view");

class TodoListViewElement extends BaseViewElement {

  static tagName = "todo-list-view";

  constructor() {

      super(TodoListViewElement.tagName);

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