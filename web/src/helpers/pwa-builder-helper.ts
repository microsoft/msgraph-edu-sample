const { PwaBuilder} = require("../../services/pwabuilder-sw.js");

export class PwaBuilderHelper {

    static async initServiceWorkerAsync() {

        if ("serviceWorker" in navigator) {
            
            if (navigator.serviceWorker.controller) {
                console.log("[PWA Builder] active service worker found, no need to register");
            } 
            else {
                // Register the service worker
                const reg = await navigator.serviceWorker.register(PwaBuilder, { scope: "./" });
                console.log("[PWA Builder] Service worker has been registered for scope: " + reg.scope);
            }
        }
    }
}