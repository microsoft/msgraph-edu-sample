const {

  Providers,
  MsalProvider,
  TeamsProvider,
  prepScopes
} = require("@microsoft/mgt");

require("./todo-list-view");
require("./timeline-view");
require("./study-groups-view");
require("./score-progress-view");
require("./leaderboard-view");
require("./sign-in-view");
const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
const BaseViewElement = require("./base-view");
const secrets = require("../.././secrets-sample.json");
const config = require("../.././config.json");

class MainViewElement extends BaseViewElement {
  
  static tagName = "main-view";
  constructor() {

    super(MainViewElement.tagName);
    let scopes = [
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

    if (TeamsProvider.isAvailable) {

      TeamsProvider.microsoftTeamsLib = teams;
      Providers.globalProvider = new TeamsProvider({

        clientId: secrets.clientId,
        authPopupUrl: "auth.html",
        scopes:scopes
      });
    } else {

      Providers.globalProvider = new MsalProvider({

        clientId: secrets.clientId,
        scopes:scopes
      });
    }


    //TO DO: Set up state history.
    this.addEventListener('popstate',(event) => {
      console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
    });

  


    Notification.requestPermission();
   
  }

 

  handlePopState() {
     // TO DO: figure out how to initialize pop state, reset params if back button is clicked and navigate to drop down view
   
  }
  async populateTeamInfo(params) {


    let teamName = this.shadowRoot.querySelector(".team-name");

    let provider = Providers.globalProvider;
    if (provider) {

      try {

        let graphClient = provider.graph.client;
        let groupInfo = await graphClient
            .api(`groups/${params.groupId}`)
            .get();
        
        let groupMembers = await graphClient
            .api(`groups/${params.groupId}/members`)
            .get();
    
        let classInfo = await graphClient
            .api(`/education/classes/${params.classId}`)
            .middlewareOptions(prepScopes("EduRoster.ReadBasic"))
            .get();
    
        let teacherInfo = await graphClient
            .api(`/education/classes/${params.classId}/teachers`)
            .middlewareOptions(prepScopes("EduRoster.ReadBasic"))
            .get();

        let groupName = groupInfo["displayName"];
        teamName.innerHTML = groupName;
        let startDate = config.StartDate;
        let endDate = config.EndDate;
        let courseDates = startDate + " - " + endDate + ", " + config.Year;

       

        this.shadowRoot.querySelector(".class-dates").innerHTML = courseDates;
        this.shadowRoot.querySelector(".class-name").innerHTML =  classInfo["displayName"];

        let teacherIndex = teacherInfo["value"]["length"] - 3;
        let teacher = teacherInfo["value"][teacherIndex];

        let teacherCard = this.shadowRoot.querySelector(".teacher-person");
        teacherCard.setAttribute("person-query", teacher["userPrincipalName"]);

      
        let mgtPeople = this.shadowRoot.querySelector(
          ".team-members mgt-people"
        );
        mgtPeople.groupId = params.groupId;
        mgtPeople.people = groupMembers["value"];
      } catch (error) {

        console.log(error);
      }
    }
  }

  initialize(parameter) {

    this.populateTeamInfo(parameter);
    let askFriendButton = this.shadowRoot.querySelector(".ask-friend-button");
    askFriendButton.addEventListener(
      "click",
      this.handleAskFriendClick.bind(this)
    );

    let findExpertButton = this.shadowRoot.querySelector(".find-expert-button");
    findExpertButton.addEventListener(
      "click",
      this.handleFindExpertClick.bind(this)
    );

    let askTeacherButton = this.shadowRoot.querySelector(".ask-teacher-button");
    askTeacherButton.addEventListener(
      "click",
      this.handleAskTeacherClick.bind(this)
    );
  }

  unload() {}

  handleAskFriendClick() {
    
    //TO DO: Configure a group mate 'friend' or update the UI to start a chat with a colleague.
    let friend = "";
    let users = encodeURI(friend);
    let topicName = encodeURI("Ask a friend");
    let message = encodeURI("Hey friend, can I ask you a question?");
    let createChatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${message}`;

    let t = setTimeout(function() {
      window.open(createChatUrl);
    }, 1000);

    teams.getContext(function() {
      clearTimeout(t);
      teams.executeDeepLink(createChatUrl);
    });
  }

  handleFindExpertClick() {

    //TO DO: configure a class expert or remove this. 
    let expert = "";
    let users = encodeURI(expert);
    let topicName = encodeURI("Find an expert");
    let message = encodeURI("Hey expert, can I ask you a question?");
    let createChatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${message}`;

    let t = setTimeout(function() {

      window.open(createChatUrl);
    }, 1000);

    teams.getContext(function() {

      clearTimeout(t);
      teams.executeDeepLink(createChatUrl);
    });
  }

  handleAskTeacherClick() {

    //TO DO: update to actually send the course teacher a message, the code lives in create-study-group-view.js.
    let teacher = "";
    let users = encodeURI(teacher);
    let topicName = encodeURI("Ask the teacher");
    let message = encodeURI("Hey professor, can I ask you a question?");
    let createChatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${message}`;

    let t = setTimeout(function() {

      window.open(createChatUrl);
    }, 1000);

    teams.getContext(function() {

      clearTimeout(t);
      teams.executeDeepLink(createChatUrl);
    });
  }
}

customElements.define(MainViewElement.tagName, MainViewElement);
module.exports = MainViewElement;
