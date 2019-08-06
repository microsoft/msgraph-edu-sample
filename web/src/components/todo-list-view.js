const BaseViewElement = require("./base-view");

class TodoListViewElement extends BaseViewElement {

  static tagName = "todo-list-view";

  constructor() {

    super(TodoListViewElement.tagName);

    let createButton = this.shadowRoot.querySelector(".create-button");
    createButton.addEventListener("click", this.handleCreateClick);
  }

  handleCreateClick() {
    
    console.log("Todo Create button clicked!");
  }
}

customElements.define(TodoListViewElement.tagName, TodoListViewElement);
module.exports = TodoListViewElement;