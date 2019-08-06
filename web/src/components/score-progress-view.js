const BaseViewElement = require("./base-view");

class ScoreProgressViewElement extends BaseViewElement {

  static tagName = "score-progress-view";

  constructor() {

      super(ScoreProgressViewElement.tagName);
  }
}

customElements.define(
  ScoreProgressViewElement.tagName,
  ScoreProgressViewElement
);
module.exports = ScoreProgressViewElement;
