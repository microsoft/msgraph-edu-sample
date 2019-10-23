const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
const BaseViewElement = require("./base-view");
const { TeamsProvider } = require("@microsoft/mgt");

class StudyGroupItemElement extends BaseViewElement {

    static get observedAttributes() {

        return ["display-name", "description"];
    }

  static tagName = "study-group-item";

  constructor() {

      super(StudyGroupItemElement.tagName);
  }



  /**
   * Populate an element with teams url and content.
   *
   * @param {*} data
   * @memberof StudyGroupItemElement
   */
  render(data) {

      if (data.displayName) {

          let displayNameElem = this.shadowRoot.querySelector(".display-name");
          displayNameElem.textContent = data.displayName;
      }

      if (data.description) {

          let descriptionElem = this.shadowRoot.querySelector(".description");
          descriptionElem.textContent = data.description;
      }

      if (data.webUrl) {

          let webUrlElem = this.shadowRoot.querySelector(".direct-link");

          webUrlElem.onclick = function() {

              if (TeamsProvider.isAvailable) {

                  teams.executeDeepLink(data.webUrl);
              } else {

                  parent.open(data.webUrl);
              }
          };
      }
  }

  connectedCallback() {

      let displayName = this.getAttribute("display-name");
      let description = this.getAttribute("description");
      let webUrl = this.getAttribute("webUrl");

      this.render({

          displayName: displayName,
          description: description,
          webUrl: webUrl
      });
  }

  /**
   *
   * Update Ui element of a single study group element
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   * @returns
   * @memberof StudyGroupItemElement
   */
  attributeChangedCallback(name, oldValue, newValue) {

      if (!this.isConnected || !this.shadowRoot) return;

      switch (name) {

      case "display-name":
          this.render({
              displayName: newValue
          });
          break;

      case "description":
          this.render({
              description: newValue
          });
          break;
      case "webUrl":
          this.render({
          
              webUrl: newValue
          });
      }
  }
}

customElements.define(StudyGroupItemElement.tagName, StudyGroupItemElement);
module.exports = StudyGroupItemElement;
