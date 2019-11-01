  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const BaseViewElement = require("./base-view");
const { Providers} = require("@microsoft/mgt");

const TeamsHelper = require("../services/teams-helper");

class CreateStudyGroupViewElement extends BaseViewElement {
  static tagName = "create-study-group-view";

  constructor() {
      super(CreateStudyGroupViewElement.tagName);

      this.flyoutPanel = this.shadowRoot.querySelector(".flyout-panel");

      this._lightDismissPanel = this.shadowRoot.querySelector(
          ".light-dismiss-panel"
      );

      this._lightDismissPanel.addEventListener(
          "pointerdown",
          this.handleRootClick.bind(this)
      );

      let createButton = this.shadowRoot.querySelector(".create-button");
      createButton.addEventListener("click", this.handleCreateClicked.bind(this));

      let groupNameInput = this.shadowRoot.querySelector(".group-name-input");
      groupNameInput.value = "New Study Group";

      let groupDescriptionInput = this.shadowRoot.querySelector(
          ".group-description-input"
      );

      groupDescriptionInput.value = "New Study group description";
  }

  /**
   * Show modal at x y coordinate of a screen.
   *
   * @param {*} x axis position of screen
   * @param {*} y axis position of screen
   * @memberof CreateStudyGroupViewElement
   */
  showAt(x, y) {
      document.body.appendChild(this);

      let screenWidth = document.documentElement.scrollWidth;
      x = Math.min(x, screenWidth - this.flyoutPanel.clientWidth);

      this.flyoutPanel.style.marginLeft = `${x}px`;
      this.flyoutPanel.style.marginTop = `${y}px`;
  }

  /**
   * Dismiss modal if mouse clicks another element
   *
   * @param {*} e
   * @memberof CreateStudyGroupViewElement
   */
  handleRootClick(e) {
      if (e.srcElement == this._lightDismissPanel) {
          this.remove();
      }
  }

  /**
   *  Wrapper function to handle event dispatch  
   *
   * @param {*} channel
   * @memberof CreateStudyGroupViewElement
   */
  createEvent(channel) {
      let event = new CustomEvent("channelCreated", {
          detail: channel
      });

      dispatchEvent(event);
  }

  /**
   * Create a channel using the input from the UI modal
   *
   * @memberof CreateStudyGroupViewElement
   */
  async handleCreateClicked() {
      let groupNameInput = this.shadowRoot.querySelector(".group-name-input");
      let groupDescriptionInput = this.shadowRoot.querySelector(
          ".group-description-input"
      );

      let people = document.body
          .querySelector("create-study-group-view")
          .shadowRoot.querySelector("mgt-people-picker").selectedPeople;

      let provider = Providers.globalProvider;
      let graphClient = provider.graph.client;
      let channel = {
          displayName: groupNameInput.value,
          description: groupDescriptionInput.value
      };
      let teamsHelper = new TeamsHelper();

      let url = new URLSearchParams(location.search);

      let createNewChannelUrl = `https://graph.microsoft.com/v1.0/teams/${url.get(
          "groupId"
      )}/channels`;
      let result = await graphClient
          .api(createNewChannelUrl).post(channel);

      let  channelId = result["id"];
      channel["webUrl"] = result["webUrl"];

      this.createEvent(channel);
      teamsHelper.handleNotification(groupNameInput.value, channelId);

      if (channelId) {
          teamsHelper.sendChatMessage(people, channelId, groupNameInput.value);
      }
      this.remove();
  }
}

customElements.define(
    CreateStudyGroupViewElement.tagName,
    CreateStudyGroupViewElement
);
module.exports = CreateStudyGroupViewElement;
