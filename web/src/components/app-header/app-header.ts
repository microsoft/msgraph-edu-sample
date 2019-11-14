import { Component } from "../component";

/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */

export class AppHeader extends Component {
    
    connectedCallback() {
        let backArrow = this.shadowRoot!.querySelector(".back-arrow");
        backArrow!.addEventListener("click", this.backArrowClick);
    }

    // Redirect to origin landing page.
    private backArrowClick() {
        window.location.href = "./";
    }

    protected getTemplate(): HTMLTemplateElement  {
        const template = document.createElement('template');
        template.innerHTML = require('./app-header.html');
        return template;
    }
}

customElements.define('app-header', AppHeader);
