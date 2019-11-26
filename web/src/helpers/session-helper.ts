import * as Cookies from 'js-cookie';

import * as ls from 'local-storage';


export class SessionHelper {

    private static _sessionData: any = {};
    

    public static clear() {

        this._sessionData = {};
        Cookies.remove("classId");
        Cookies.remove("groupId");
        ls.clear();
    }

    public static set(key: string, value: any): void {

        this._sessionData[key] = value;
        this.setLocalStorage(key,value);
    }

    public static get<T>(key: string): T {

        return <T>this._sessionData[key];
    }

    private static setLocalStorage (key:string, value:any){
        ls.set(key,value);
    }

    public static getLocalStorage<T>(key:string): T {
        return <T>ls.get(key);
    }

    private static setCookie(key:string,value:any){

        Cookies.set(key,value, {expires: 1});
    }

    public static getCookie(key:string): string{

        return <string>Cookies.get(key);
    }

    //TODO: add url and cookie caching methods
}