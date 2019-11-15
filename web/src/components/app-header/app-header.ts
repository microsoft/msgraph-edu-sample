/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from "../component";

export class AppHeader extends Component {
    
    connectedCallback() {

        let backArrow = this.shadowRoot!.querySelector(".back-arrow");
        backArrow!.addEventListener("click", this.backArrowClick);
    }

    // Redirect to origin landing page.
    private backArrowClick() {

        // TODO: Adjust this to use the NavigationHelper instead.
        window.location.href = "./";
    }

    protected getTemplate(): HTMLTemplateElement  {

        const template = document.createElement('template');
        template.innerHTML = require('./app-header.html');
        return template;
    }
}

customElements.define('app-header', AppHeader);
