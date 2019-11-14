/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from "../component";
import { MgtTasks } from "@microsoft/mgt";

export class TodoList extends Component {

    connectedCallback() {

        let createButton = <HTMLButtonElement>this.shadowRoot!.querySelector(".create-button");
        createButton.addEventListener("click", this.handleCreateClick);
    }

    /**
     * Toggle visibility of Microsoft Graph Toolkit Tasks
     */
    handleCreateClick() {
        
        let myTasks = <MgtTasks>this.shadowRoot!.querySelector("mgt-tasks");
        myTasks.isNewTaskVisible = !myTasks.isNewTaskVisible;
    }

    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = require('./todo-list.html');
        return template;
    }
}

customElements.define('todo-list', TodoList);