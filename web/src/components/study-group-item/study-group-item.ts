/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from '../component';
import { TeamsHelper } from '../../helpers';

export class StudyGroupItem extends Component {

    static get observedAttributes() {

        return ['display-name', 'description'];
    }

    /**
     * Populate an element with teams url and content.
     *
     * @param {*} data
     * @memberof StudyGroupItemElement
     */
    render(data: { displayName?: string | null | undefined, description?: string | null | undefined, webUrl?: string | null | undefined}) {

        if (data.displayName) {

            const displayNameElem = this.shadowRoot!.querySelector('.display-name');
            displayNameElem!.textContent = data.displayName;
        }

        if (data.description) {

            const descriptionElem = this.shadowRoot!.querySelector('.description');
            descriptionElem!.textContent = data.description;
        }

        if (data.webUrl) {

            const webUrl: string = data.webUrl;
            const webUrlElem = this.shadowRoot!.querySelector('.direct-link');
            webUrlElem!.addEventListener('click', function() {

                if (TeamsHelper.isTeamsAvailable()) {

                    TeamsHelper.executeDeepLink(webUrl);
                } 
                else {

                    parent.open(webUrl);
                }
            });
        }
    }

    connectedCallback() {

        let displayName = this.getAttribute('display-name');
        let description = this.getAttribute('description');
        let webUrl = this.getAttribute('webUrl');

        this.render({

            displayName: displayName,
            description: description,
            webUrl: webUrl
        });
    }

    /**
     *
     * Update Ui element of a single study group element
     * @param {*} name
     * @param {*} oldValue
     * @param {*} newValue
     * @returns
     * @memberof StudyGroupItemElement
     */
    attributeChangedCallback(name: string, oldValue: any, newValue: any) {

        if (!this.isConnected) return;

        switch (name) {

            case 'display-name':
                this.render({ displayName: newValue });
                break;

            case 'description':
                this.render({ description: newValue });
                break;

            case 'webUrl':
                this.render({ webUrl: newValue });
                break;
        }
    }
        
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./study-group-item.html');
        return template;
    }
}

customElements.define('study-group-item', StudyGroupItem);
