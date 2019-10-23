const { TeamsProvider } = require("@microsoft/mgt");
const BaseViewElement = require("./base-view");
const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");

class TeamsAuthView extends BaseViewElement {

  static tagName = "teams-auth-view";

  constructor() {

      super(TeamsAuthView.tagName);
      TeamsProvider.microsoftTeamsLib = teams;
      TeamsProvider.handleAuth();
  }
}

customElements.define(TeamsAuthView.tagName, TeamsAuthView);
module.exports = TeamsAuthView;
