/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
export abstract class Component extends HTMLElement {    

    constructor() {
        super();

        this.applyTemplate();
    }

    protected abstract getTemplate(): HTMLTemplateElement;

    private applyTemplate() {
        
        const template = this.getTemplate();
        const clone = document.importNode(template.content, true);
        this.attachShadow({ mode: 'open' }).appendChild(clone);
    }

    // Invoked each time the custom element is appended into a document-connected element. 
    // This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
    connectedCallback() {

        // Note: connectedCallback may be called once your element is no longer connected, use Node.isConnected to make sure.
        // if (this.isConnected) { }
    }

    // Invoked each time the custom element is disconnected from the document's DOM.
    disconnectedCallback() {

    }

    // Invoked each time the custom element is moved to a new document.
    adoptedCallback() {

    }

    // Invoked each time one of the custom element's attributes is added, removed, or changed. 
    // Which attributes to notice change for is specified in a static get observedAttributes method
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {

    }
}