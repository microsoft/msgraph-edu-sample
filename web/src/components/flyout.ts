/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Component } from './component';

export abstract class Flyout extends Component {

    connectedCallback() {

        super.connectedCallback();

        const lightDismissPanel = this.shadowRoot!.querySelector('.light-dismiss-panel');
        lightDismissPanel!.addEventListener('pointerdown', (e) => this.handleRootClick(e));
    }

    /**
     * Show modal at x y coordinate of a screen.
     *
     * @param {*} x axis position of screen
     * @param {*} y axis position of screen
     * @memberof CreateStudyGroupViewElement
     */
    showAt(x: number, y: number) {

        document.body.appendChild(this);

        let flyoutPanel = <HTMLElement>this.shadowRoot!.querySelector('.flyout-panel');
        let screenWidth = document.documentElement.scrollWidth;
        x = Math.min(x, screenWidth - flyoutPanel!.clientWidth);

        flyoutPanel!.style.marginLeft = `${x}px`;
        flyoutPanel!.style.marginTop = `${y}px`;
    }

    /**
     * Dismiss modal if mouse clicks another element
     *
     * @param {*} e
     * @memberof CreateStudyGroupViewElement
     */
    handleRootClick(e: Event) {

        const lightDismissPanel = this.shadowRoot!.querySelector('.light-dismiss-panel');
        if (e.srcElement == lightDismissPanel) {

            this.hide();
        }
    }

    /**
     * Hide the flyout
     */
    hide() {

        this.remove();
    }
}