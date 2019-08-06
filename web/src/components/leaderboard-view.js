const BaseViewElement = require("./base-view");

class LeaderboardViewElement extends BaseViewElement {

  static tagName = "leaderboard-view";
  constructor() {
    
    super(LeaderboardViewElement.tagName);
  }
}

customElements.define(LeaderboardViewElement.tagName, LeaderboardViewElement);
module.exports = LeaderboardViewElement;
