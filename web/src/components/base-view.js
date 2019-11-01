  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
class BaseViewElement extends HTMLElement {

    constructor(tagName) {

        super();

        let template = this.getTemplate(tagName);
        let templateContent = template.content;
        let clone = document.importNode(templateContent, true);
        this.attachShadow({ mode: "open" }).appendChild(
           clone
        );
    }

    /**
     * View handler for all children  views.
     *
     * @param {*} tagName
     * @returns
     * @memberof BaseViewElement
     */
    getTemplate(tagName) {
        let templateString = require(`../templates/${tagName}.html`);
        let template = document.createElement("template");
        template.innerHTML = templateString;
        return template;
    }

    initialize() {}

    unload() {}
}

module.exports = BaseViewElement;
