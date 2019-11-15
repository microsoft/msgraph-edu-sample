/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const { PwaBuilder } = require('../../services/pwabuilder-sw.js');

export class PwaBuilderHelper {

    static async initServiceWorkerAsync() {

        if ('serviceWorker' in navigator) {
            
            if (navigator.serviceWorker.controller) {
                console.log('[PWA Builder] active service worker found, no need to register');
            } 
            else {
                // Register the service worker
                // TODO: Validate that this actually works. PwaBuilder object is not a url, and register func seems to expect a url.
                const reg = await navigator.serviceWorker.register(PwaBuilder, { scope: './' });
                console.log('[PWA Builder] Service worker has been registered for scope: ' + reg.scope);
            }
        }
    }
}