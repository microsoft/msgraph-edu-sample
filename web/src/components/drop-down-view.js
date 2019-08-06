const BaseViewElement = require("./base-view");
const {

    Providers,
    MsalProvider,
    TeamsProvider,
    ProviderState,
    prepScopes
  } = require("@microsoft/mgt");
const GraphCalls = require("../services/graph-calls");

class DropDownViewElement extends BaseViewElement {

  static tagName = "drop-down-view";

  constructor() {

    super(DropDownViewElement.tagName);

    this.populateCourseDropDown();
    this.populateGroupDropDown();

    let submitButton = this.shadowRoot.querySelector(".submit-button");
    if(submitButton){

      submitButton.addEventListener('click', this.handleSubmitClick.bind(this));
    }
    let loginComponent = this.shadowRoot.querySelector("login-component");
    if(loginComponent){

      loginComponent.addEventListener('click', this.handleLogInClick.bind(this));
    }
  }

  handleLogInClick(){

      let wrapperDropDown = this.shadowRoot.querySelector("wrapper-drop-down");
      wrapperDropDown.style.setProperty('opacity',1);
  }

  handleSubmitClick(){

    let groupDropDown = this.shadowRoot.querySelector(".group-selector");
    let classDropDown = this.shadowRoot.querySelector(".course-selector");

    let groupId = groupDropDown.options[groupDropDown.selectedIndex].value;
    let classId = classDropDown.options[classDropDown.selectedIndex].value;
    
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url);

    params.append("classId",classId);
    params.append("groupId",groupId);

    let app = document.querySelector("bellows-app");
    let view = document.createElement('main-view');
    app.navigate(view, {

      groupId: groupId,
      classId: classId
    });
  }

  async populateCourseDropDown(){

    let provider = Providers.globalProvider;
    if (provider) {

      try {

        let graphClient = provider.graph.client;
        let coursesInfo = await graphClient
          .api(`education/me/classes`)
          .middlewareOptions(prepScopes("EduRoster.ReadBasic"))
          .get();

          let courseDropDown = this.shadowRoot.querySelector(".course-selector");
          courseDropDown.options[0] = new Option('Select a Course','');
          courseDropDown.options[0].style.cssText = "background-color:#335795;";

          for (i = 0; i < coursesInfo["value"]["length"]; i++) {

            courseDropDown.options[(i +1)] = new Option(coursesInfo["value"][i]["displayName"],coursesInfo["value"][i]["id"]);
            courseDropDown.options[(i +1)].style.cssText = "background-color:#335795;"
          }


      } catch (error){

        console.log(error);
      }
  }
}

async populateGroupDropDown(){

  let provider = Providers.globalProvider;
    if (provider) {

      try {

        let graphClient = provider.graph.client;
        let groupsInfo = await graphClient
          .api(`/me/joinedTeams`).middlewareOptions(prepScopes("User.Read.All", "User.ReadWrite.All"))
          .get();

          let groupsDropDown = this.shadowRoot.querySelector(".group-selector");
          groupsDropDown.options[0] = new Option('Select a Study Group','');
          groupsDropDown.options[0].style.cssText = "background-color:#335795;";

          for (i = 0; i < groupsInfo["value"]["length"]; i++) {

            groupsDropDown.options[(i +1)] = new Option(groupsInfo["value"][i]["displayName"],groupsInfo["value"][i]["id"]);
            groupsDropDown.options[(i +1)].style.cssText = "background-color:#335795;";
            
          }

      } catch (error){
        console.log(error);
    }   
  }
 }
}
customElements.define(DropDownViewElement.tagName, DropDownViewElement);
module.exports = DropDownViewElement;
