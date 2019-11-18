/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { View } from '../view';
import { TeamsHelper } from '../../helpers';

export class TeamsAuthView extends View {

    load() {

        TeamsHelper.handleAuth();
    }

    protected getTemplate(): HTMLTemplateElement {

        const template = document.createElement('template');
        template.innerHTML = require('./teams-auth-view.html');
        return template;
    }
}

customElements.define('teams-auth-view', TeamsAuthView);