require("./todo-list-view");
require("./timeline-view");
require("./study-groups-view");
const {Providers} = require("@microsoft/mgt");
const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
const BaseViewElement = require("./base-view");

class MainViewElement extends BaseViewElement {
  
  static tagName = "main-view";
  constructor() {

      super(MainViewElement.tagName);
      Notification.requestPermission();
   
  }

  /**
   * Populate course information.
   *
   * @param {*} params
   * @memberof MainViewElement
   */
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
                  .api(`/education/classes/${params.classId}`).get();
    
              let teacherInfo = await graphClient
                  .api(`/education/classes/${params.classId}/teachers`).get();

              let groupName = groupInfo["displayName"];
              teamName.innerHTML = groupName;
              let startDate = process.env.START_DATE;
              let endDate = process.env.END_DATE;
              let year = process.env.YEAR;
              let courseDates = startDate + " - " + endDate + ", " + year;

       

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
    
      //TODO: Configure a group mate 'friend' or update the UI to start a chat with a colleague.
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

      //TODO: Configure a class expert or remove this. 
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

      //TODO: update to actually send the course teacher a message, the code lives in create-study-group-view.js.
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
