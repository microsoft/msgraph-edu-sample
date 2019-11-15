/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from '../component';
import { NavigationHelper } from '../../helpers';
import { SignInView } from '../sign-in-view/sign-in-view';

export class AppHeader extends Component {
    
    connectedCallback() {

        let backArrow = this.shadowRoot!.querySelector('.back-arrow');
        backArrow!.addEventListener('click', this.backArrowClick);
    }

    private backArrowClick() {

        const view = <SignInView>document.createElement('sign-in-view');
        NavigationHelper.navigate(view);
    }

    protected getTemplate(): HTMLTemplateElement  {

        const template = document.createElement('template');
        template.innerHTML = require('./app-header.html');
        return template;
    }
}

customElements.define('app-header', AppHeader);
