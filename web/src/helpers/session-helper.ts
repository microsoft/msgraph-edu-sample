import * as Cookies from 'js-cookie';


export class SessionHelper {

    private static _sessionData: any = {};
    

    public static clear() {

        this._sessionData = {};
        Cookies.remove("classId");
        Cookies.remove("groupId");

    }

    public static set(key: string, value: any): void {

        this._sessionData[key] = value;
        this.setCookie(key,value);
    }

    public static get<T>(key: string): T {

        return <T>this._sessionData[key];
    }

    private static setCookie(key:string,value:any){

        Cookies.set(key,value, {expires: 1});
    }

    public static getCookie(key:string): string{

        return <string>Cookies.get(key);
    }

    //TODO: add url and cookie caching methods
}