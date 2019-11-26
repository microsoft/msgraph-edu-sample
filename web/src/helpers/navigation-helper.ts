/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { ViewHost, View } from '../components';
import {SessionHelper} from "./session-helper";

export class NavigationHelper {

    private static _activeViewHost: ViewHost | null;
    private static _currentView: View | null;
    private static _currentState: any = null;

    /**
     * Update the ViewHost object.
     * This clears out the currentView, so don't forget to call navigate immediately after
     * with the initial view to display.
     * @param viewHost 
     */
    public static setActiveViewHost(viewHost: ViewHost): void {        

        // Unload if necessary
        if (this._currentView && viewHost !== this._activeViewHost) {
            this._currentView.unload();
        }

        this._activeViewHost = viewHost;
        this._currentView = null;
    }

    /**
     * Change the active View being displayed in the active ViewHost
     * @param viewKey = the tagname for the target view
     * @param parameter = data to load the target view with
     */
    public static navigate(view: View, parameter: any = undefined): void {

        if (this._activeViewHost == null) return;

        // Unload previous view
        const previousView = this._currentView;
        if (previousView) {
            previousView.unload();
        }

        // Prep the new view
        this._currentView = view;
        this._currentState == parameter;

        // Update the DOM
        this._activeViewHost.updateView(view);

        const state = {
            parameter: parameter,
            viewTagName: view.tagName
        };
        history.pushState(state, '', '');

        // Load with data
        view.load(parameter);
    }

    /**
     * Wire up the popstate listener to handle back navigation
     */
    public static initPopStateHandler(): void {        
        
        window.history.replaceState(null, '', window.location.pathname);
        window.addEventListener('popstate', (e) => this.handlePopState(e));
    }

    public static goHome() {
        window.location.href = "/";
    }

    /**
     * Triggers the popState handler
     */
    public static goBack() {

        if (window.history.length > 0){

            window.history.back();
        } else {
            
            this.goHome();
        }
    }

    /**
     * Handle a back navigation
     * @param e 
     */
    private static handlePopState(e: PopStateEvent): void {

        if (!e.state) {
            window.history.back();
            return;
        }

        const { parameter, viewTagName } = e.state;
        if (this._currentState === parameter && this._currentView!.tagName === viewTagName) {
            window.history.back();
            return;
        }

        const view = document.createElement(viewTagName);
        this.navigate(view, parameter);
    }
}