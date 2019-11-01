  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
const {Providers} = require("@microsoft/mgt");

class TeamsHelper {
    constructor() {}

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

                new Notification(
                    `Channel ${groupNameInput} was successfully created`
                );
            } else if (permission !== "denied") {

                Notification.requestPermission(function(permission) {

                    if (permission === "granted") {

                        new Notification(
                            `Channel ${groupNameInput} was successfully created`
                        );
                    }
                });
            }
        } else {
            if (permission === "granted") {

                new Notification(
                    `Channel ${groupNameInput} was not created since a channel with that name already exists`
                );
            } else if (permission !== "denied") {

                Notification.requestPermission(function(permission) {

                    if (permission === "granted") {

                        new Notification(
                            `Channel ${groupNameInput} was not created since a channel with that name already exists`
                        );
                    }
                });
            }
        }
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
        let url = new URLSearchParams(location.search);
        try {

            for (let i = 0; i < people.length; i++) {

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
                contentString += `<at id=\"${i}\">${people[i]["displayName"]}</at>, `;
            }
            let messageUrl = `teams/${url.get(
                "groupId"
            )}/channels/${channelId}/messages`;
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
}
module.exports = TeamsHelper;
