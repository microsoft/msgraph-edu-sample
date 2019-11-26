/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component, ViewHost } from '..';
import { PwaBuilderHelper, NavigationHelper, SessionHelper, ProvidersHelper } from '../../helpers/';
import { View } from '../view';

export class BellowsApp extends Component {
    
    constructor() {
        super();

        Notification.requestPermission();
        ProvidersHelper.initGlobalProvider();
        PwaBuilderHelper.initServiceWorkerAsync();
        NavigationHelper.initPopStateHandler();
    }

    connectedCallback() {

        super.connectedCallback();

        const viewHost = <ViewHost>this.shadowRoot!.querySelector('view-host');
        NavigationHelper.setActiveViewHost(viewHost);



        const classId = SessionHelper.getCookie('classId');
        const groupId = SessionHelper.getCookie('groupId');

        SessionHelper.set("classId", classId);
        SessionHelper.set("groupId", groupId);
 
        const view: View = ((!classId || !groupId) || classId != undefined || groupId != undefined) 
            ? <View>document.createElement('sign-in-view')
            : <View>document.createElement('main-view');

        NavigationHelper.navigate(view);
    }
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./bellows-app.html');
        return template;
    }
}

customElements.define('bellows-app', BellowsApp);
