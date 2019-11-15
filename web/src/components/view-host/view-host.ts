/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from '../component';
import { ViewComponent } from '../view-component';

export class ViewHost extends Component {

    /**
     * Change the ViewComponent being displayed
     * @param view 
     */
    public updateView(view: ViewComponent) {

        const contentRoot = this.shadowRoot!.querySelector('.content-root');

        // Empty out the content-root
        while (contentRoot!.firstChild) {
            contentRoot!.removeChild(contentRoot!.firstChild);
        }

        // Append the new view
        contentRoot!.appendChild(view);
    }
    
    protected getTemplate(): HTMLTemplateElement {

        const template = document.createElement('template');
        template.innerHTML = require('./view-host.html');
        return template;
    }
}

customElements.define('view-host', ViewHost);