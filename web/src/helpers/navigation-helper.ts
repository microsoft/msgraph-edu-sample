/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { ViewHost, ViewComponent } from '../components';

export class NavigationHelper {

    private static _activeViewHost: ViewHost | null;
    private static _currentView: ViewComponent | null;

    /**
     * Update the ViewHost object.
     * This clears out the currentView, so don't forget to call navigate immediately after
     * with the initial view to display.
     * @param viewHost 
     */
    public static setActiveViewHost(viewHost: ViewHost): void {        

        // Unload if necessary
        if (viewHost !== this._activeViewHost) {
            this._currentView!.unload();
        }

        this._activeViewHost = viewHost;
        this._currentView = null;
    }

    /**
     * Wire up the popstate listener to handle back navigation
     */
    public static initPopStateHandler(): void {        
        
        window.addEventListener('popstate', () => {
            
            // TODO: Fix this
            //window.location = location.origin;
        });
    }

    /**
     * Change the active ViewComponent being displayed in the active ViewHost
     * @param viewKey = the tagname for the target view
     * @param parameter = data to load the target view with
     */
    public static navigate(view: ViewComponent, parameter: any): void {

        // Timeout is used to avoid timing issues
        // TODO: Reevaluate whether the timeout is required or not.
        setTimeout(() => {

            // Unload previous view
            NavigationHelper._currentView!.unload();

            // Prep the new view
            NavigationHelper._currentView = view;

            // Update the DOM
            this._activeViewHost!.updateView(view);

            // Load with data
            view.load(parameter);
        }, 0);
    }
}