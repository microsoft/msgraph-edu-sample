export class SessionHelper {

    private static _sessionData: any = {};
    

    public static clear() {

        this._sessionData = {};
    }

    public static set(key: string, value: any): void {

        this._sessionData[key] = value;
    }

    public static get<T>(key: string): T {

        return <T>this._sessionData[key];
    }

    //TODO: add url and cookie caching methods
}