/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component, ViewHost } from '..';
import { PwaBuilderHelper, TeamsHelper, NavigationHelper, SessionHelper } from '../../helpers/';
import { ViewComponent } from '../view-component';

export class BellowsApp extends Component {
    
    constructor() {
        super();

        Notification.requestPermission();
        TeamsHelper.initGlobalProvider();
        PwaBuilderHelper.initServiceWorkerAsync();
        NavigationHelper.initPopStateHandler();
    }

    connectedCallback() {

        super.connectedCallback();

        const viewHost = <ViewHost>this.shadowRoot!.querySelector('view-host');
        NavigationHelper.setActiveViewHost(viewHost);

        const classId = SessionHelper.get<string>('classId');
        const groupId = SessionHelper.get<string>('groupId');
        
        const view: ViewComponent = (!classId || !groupId) 
            ? <ViewComponent>document.createElement('sign-in-view')
            : <ViewComponent>document.createElement('main-view');

        NavigationHelper.navigate(view);
    }
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./bellows-app.html');
        return template;
    }
}

customElements.define('bellows-app', BellowsApp);
