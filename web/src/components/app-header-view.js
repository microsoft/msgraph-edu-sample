const { Providers } = require("@microsoft/mgt");
const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
const BaseViewElement = require("./base-view");
const config = require("../.././config.json");
const secrets = require("../.././secrets-sample.json");

class AppHeaderViewElement extends BaseViewElement {

  static tagName = "app-header-view";

  constructor() {

    super(AppHeaderViewElement.tagName);

    let hamburgerButton = this.shadowRoot.querySelector(".hamburger-button");
    hamburgerButton.addEventListener(
      "click",
      this.handleHamburgerClick.bind(this)
    );
    this.handleDocumentUpdate();
  }

  handleHamburgerClick() {
    window.location.href = "./signin.html";
  }

  async handleDocumentUpdate() {

    //TO DO: Figure out how to programmatically populate path and queries, or remove UI element
    let provider = Providers.globalProvider;
    if (provider) {

        let graphClient = provider.graph.client;
        let ProgressEndPoint = `groups/${secrets.groupId}/drive/root:${config.RelativeFilePath}:/workbook/worksheets(${config.WorkBookName})/range(address=${config.ProgressQuery})`;
        let progress = await graphClient.api(ProgressEndPoint).get();
        let CollaborationEndPoint = `groups/${secrets.groupId}/drive/root:${config.RelativeFilePath}:/workbook/worksheets(${config.WorkBookName})/range(address=${config.CollaberationQuery})`;
        let collaboration = await graphClient.api(CollaborationEndPoint).get();

        let collaborationValue = collaboration["values"][0];
        let numerator = progress["values"][0][0];
        let denominator = progress["values"][0][1];
        let workProgress = numerator + "/" + denominator + " Pages";
        let workCollaboration = collaborationValue[0] + "%";

        this.shadowRoot.querySelector(".work-collaboration").innerHTML = workCollaboration;
        this.shadowRoot.querySelector(".work-progress").innerHTML = workProgress;
    }
  }
}

customElements.define(AppHeaderViewElement.tagName, AppHeaderViewElement);
module.exports = AppHeaderViewElement;
