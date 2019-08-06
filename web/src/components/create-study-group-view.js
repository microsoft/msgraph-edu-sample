const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
const BaseViewElement = require("./base-view");
const { Providers, TeamsProvider,  prepScopes } = require("@microsoft/mgt");
const secrets = require("../.././secrets-sample.json");

class CreateStudyGroupViewElement extends BaseViewElement {
  
  static tagName = "create-study-group-view";
  groupId = "";
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
    let url = window.location.href;
    let groupClassStr = url.split("?").slice(1,2)[0].split("&");
    let classId = groupClassStr[0].split("=").slice(1);
    this.classId = classId;
    let groupId = groupClassStr[1].split("=").slice(1);
    this.groupId = groupId;
  }

  showAt(x, y) {

    document.body.appendChild(this);

    let screenWidth = document.documentElement.scrollWidth;
    x = Math.min(x, screenWidth - this.flyoutPanel.clientWidth);

    this.flyoutPanel.style.marginLeft = `${x}px`;
    this.flyoutPanel.style.marginTop = `${y}px`;
  }

  handleRootClick(e) {

    if (e.srcElement == this._lightDismissPanel) {

      this.remove();
    }
  }

  createEvent(channel) {

    let event = new CustomEvent("channelCreated", {
      detail: channel
    });

    this.dispatchEvent(event);
  }


   /**
 * Send a chat message to selected users for creation of a channel.
 * 
 * @param {mgt-people-picker} people selected individuals
 * @param {String} ChannelId Id of the Microsoft teams channel
 * @param {String} groupNameInput Title of the study group created
 */
  async sendChatMessage(people, channelId, groupNameInput) {

    let provider = Providers.globalProvider;
    let graphClient = provider.graph.client;
    let mentionsJsonArray = [];
    let contentString = "";
    try {

      for (i = 0; i < people.length; i++) {

        let mentionInstance = {

          id: i,
          mentionText: people[i]["displayName"],
          mentioned: {
            user: {
              displayName: people[i]["displayName"],
              id: people[i]["id"],
              userIdentityType: "aadUser"
            }
          }
        };
        mentionsJsonArray.push(mentionInstance);
        contentString =
          contentString + `<at id=\"${i}\">${people[i]["displayName"]}</at>, `;
      }
      let messageUrl = `teams/${this.groupId}/channels/${channelId}/messages`;
      let messageContent = {

        body: {

          contentType: "html",
          content: `Hi, ${contentString} I created this group to help us better communicate about ${groupNameInput}`
        },
        mentions: mentionsJsonArray
      };

      let sendIt = await graphClient
        .api(messageUrl)
        .version("beta")
        .post(messageContent);
    } catch (error) {

      console.log(error);
    }
  }

 /**
 * Send a notification for creation of a channel.
 * 
 * @param {String} groupNameInput
 * @param {bool} flag indicates success or failure of Http Post. 
 */
  async handleNotification(groupNameInput, flag) {

    let permission = Notification.permission;
    if (flag) {

      if (permission === "granted") {

        let notification = new Notification(
          `Channel ${groupNameInput} was successfully created`
        );
      } else if (permission !== "denied") {

        Notification.requestPermission(function(permission) {

          if (permission === "granted") {
            
            let notification = new Notification(
              `Channel ${groupNameInput} was successfully created`
            );
          }
        });
      }
    } else {

      if (permission === "granted") {

        let notification = new Notification(
          `Channel ${groupNameInput} was not created since a channel with that name already exists`
        );
      } else if (permission !== "denied") {
        Notification.requestPermission(function(permission) {

          if (permission === "granted") {

            let notification = new Notification(
              `Channel ${groupNameInput} was not created since a channel with that name already exists`
            );
          }
        });
      }
    }
  }

  async handleCreateClicked() {

    let groupNameInput = this.shadowRoot.querySelector(".group-name-input");
    let groupDescriptionInput = this.shadowRoot.querySelector(".group-description-input");

    let people = document.body
        .querySelector("create-study-group-view")
        .shadowRoot.querySelector("mgt-people-picker").selectedPeople;

    let provider = Providers.globalProvider;
    let graphClient = provider.graph.client;
    let channel = {

      displayName: groupNameInput.value,
      description: groupDescriptionInput.value
    };

    //TO DO: refactor to allow users to choose what team/group channels to load.

    let createNewChannelUrl = `https://graph.microsoft.com/v1.0/teams/${this.groupId}/channels`;
    let result = await graphClient.api(createNewChannelUrl).middlewareOptions(prepScopes("Group.ReadWrite.All")).post(channel);

    channelId = result["id"];
    channel["webUrl"] = result["webUrl"];

    this.createEvent(channel);
    this.handleNotification(groupNameInput.value, channelId);

    if (channelId) {

      this.sendChatMessage(
        people,
        channelId,
        groupNameInput.value
      );
    }
    this.remove();
  }
}

customElements.define(
  CreateStudyGroupViewElement.tagName,
  CreateStudyGroupViewElement
);
module.exports = CreateStudyGroupViewElement;
