/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
export class PwaBuilderHelper {

    static async initServiceWorkerAsync() {

        try {
            if ('serviceWorker' in navigator) {
                
                if (navigator.serviceWorker.controller) {
                    
                    console.log('[PWA Builder] active service worker found, no need to register');
                } 
                else {

                    // Register the service worker
                    const scriptUrl: string = './pwabuilder-sw.js';
                    const reg = await navigator.serviceWorker.register(scriptUrl, { scope: './' });
                    console.log('[PWA Builder] Service worker has been registered for scope: ' + reg.scope);
                }
            }
        }
        catch(e) {

            console.log(e);
        }
    }
}