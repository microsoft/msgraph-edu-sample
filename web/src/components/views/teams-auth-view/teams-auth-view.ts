/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { View } from "../view";
import { TeamsProvider } from '@microsoft/mgt';
import teams from '@microsoft/teams-js';

export class TeamsAuthView extends View {

    constructor() {

        super();
        TeamsProvider.microsoftTeamsLib = teams;
        TeamsProvider.handleAuth();
    }

    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = require('./teams-auth-view.html');
        return template;
    }
}

customElements.define('teams-auth-view', TeamsAuthView);