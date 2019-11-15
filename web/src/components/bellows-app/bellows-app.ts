/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component, ViewHost } from '..';
import { PwaBuilderHelper, TeamsHelper, NavigationHelper } from '../../helpers/';

export class BellowsApp extends Component {
    
    constructor() {
        super();

        Notification.requestPermission();
        TeamsHelper.initGlobalProvider();
        PwaBuilderHelper.initServiceWorkerAsync();
        NavigationHelper.initPopStateHandler();
    }

    connectedCallback() {

        const viewHost = <ViewHost>this.shadowRoot!.querySelector('view-host');
        NavigationHelper.setActiveViewHost(viewHost);
    }
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./bellows-app.html');
        return template;
    }
}

customElements.define('bellows-app', BellowsApp);
