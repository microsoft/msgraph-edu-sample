const {
  Providers,
  MsalProvider,
  TeamsProvider,
  ProviderState
} = require("@microsoft/mgt");

const secrets = require("../../secrets-sample.json");





class GraphCalls  {
    _scopes = [];
    _clientId = "";
    _state = null;
  
    

    
    

    constructor() {
     this._scopes = [
        "user.read",
        "people.read",
        "user.readbasic.all",
        "contacts.read",
        "calendars.read",
        "files.read",
        "group.read.all",
        "tasks.readwrite",
        "Group.ReadWrite.All"
      ];
      this._clientId = secrets.clientId;
    
      this.InitGraphPermissions();
    }

    

        InitGraphPermissions()
        {



            if (TeamsProvider.isAvailable) {
                TeamsProvider.microsoftTeamsLib = teams;
        
                Providers.globalProvider = new TeamsProvider({
                clientId: this._clientId,
                authPopupUrl: "auth.html",
                scopes:this._scopes
                });
            } else {
                Providers.globalProvider = new MsalProvider({
                clientId: this._clientId,
                scopes:this._scopes
                });
            }

             
             console.log(Providers.globalProvider.state);


          

            
        }

        updateSignIn(status) {
            let event = new CustomEvent("updateSignIn", {
              detail: status
            });
        
            this.dispatchEvent(event);
          }

        updateClass(ClassId) {
            let event = new CustomEvent("updateClassId", {
              detail: ClassId
            });
        
            this.dispatchEvent(event);
          }

        updateGroup(GroupId) {
            let event = new CustomEvent("updateGroupId", {
                detail: GroupId
              });
          
              this.dispatchEvent(event);
            }

        getParams(url){
          let params = {};
          let parser = document.createElement('a');
          parser.href = url;
          let query = parser.search.substring(1);
          let vars = query.split('&');
          
          for(let i = 0; i < vars.length; i++){
            let pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
          }
        return params;
        }

     

        handleSignInFlow(){

        
     /* if (Providers.globalProvider.state === ProviderState.SignedIn) {

        // Group/class check
        // TODO: Check for the URL params first.
        // THEN: Check that those values are REAL. Validate with a get against the graph

        let hasGroupAndClass = false;
        if (hasGroupAndClass) {
          // Go to index or main view or whatever
          let view = document.createElement('main-view');
          */

          //App navigation isn't working, why?
         
          

     /*     
        }
        else {
          // TODO: Go prompt for group and class view
        }
      }
      else {
        //Go to sign in view
      }

      */
      
    } 


        

        setLocalStorage(key,value){
            if (typeof (Storage) !== "undefined") {

            window.localStorage.setItem(key, value);
            } else {
                throw console.error("Storage is undefined on this device, sorry");
            }
        }
        getLocalStorage(key){
            if (typeof (Storage) !== "undefined") {
            let value = window.localStorage.getItem(key);
            return value;
        } else {
            throw console.error("Storage is undefined on this device, sorry");
        }
    }

    setUrlParam(key,value){

        //TO DO: test this out 
        let url = new URL(window.location.href);
        let params = new URLSearchParams(url.search.slice(1));
        console.log(params.ToString());
        params.set(key,value);

        return params;

    }

    getUrlParam(key){
        let url = new URL(window.url.href);
        let value =  url.searchParams.get(key);
        return value;
    }

    setState(ProviderState){

        //how or why should I use enum import class?

        if(this._state == null) {
            this._state = ProviderState;
        }


    }

    testFunction(string){
      console.log(string);
    }

        clearLocalStorage(){
            localStorage.clear();
        }

        


}


module.exports = GraphCalls;
