/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import teams from '@microsoft/teams-js';
import { Providers, TeamsProvider, MsalProvider, MgtPeople } from '@microsoft/mgt';
import { SessionHelper, ConfigHelper } from '.';


export class TeamsHelper {
    
    private static _scopes = [
        'user.read',
        'people.read',
        'user.readbasic.all',
        'contacts.read',
        'calendars.read',
        'files.read',
        'group.read.all',
        'tasks.readwrite',
        'Group.ReadWrite.All',
        'EduRoster.ReadBasic',
        'User.Read.All',
        'User.ReadWrite.All'
    ];
    

    /**
     * Handles authentication for various providers 
     *
     * @memberof TeamsHelper
     */
    public static initGlobalProvider(){

        const clientId = ConfigHelper.CLIENT_ID;
        if (!clientId) {
            throw new Error('Missing clientId value in env');
        }

        if (TeamsProvider.isAvailable) {

            TeamsProvider.microsoftTeamsLib = teams;
            
            Providers.globalProvider = new TeamsProvider({
                clientId: clientId,
                authPopupUrl: './', // TODO: fix this
                scopes: this._scopes
            });
        } 
        else {

            Providers.globalProvider = new MsalProvider({
                clientId: clientId,
                scopes: this._scopes
            });
        }
    }

    public static handleAuth() {

        TeamsProvider.handleAuth();
    }

    public static isTeamsAvailable(): boolean {

        return TeamsProvider.isAvailable;
    }

    public static executeDeepLink(deeplink: string, onComplete?: ((status: boolean, reason?: string | undefined) => void) | undefined): void {

        teams.executeDeepLink(deeplink, onComplete);
    }

    /**
     * Send a notification for creation of a channel.
     *
     * @param {String} groupNameInput
     * @param {bool} flag indicates success or failure of Http Post.
     */
    public static async handleNotification(groupNameInput: string, flag: boolean) {

        const sendNotification = (granted: boolean) => {

            new Notification(granted
                ? `Channel ${groupNameInput} was successfully created`
                : `Channel ${groupNameInput} was not created since a channel with that name already exists`);
        }

        let permission = Notification.permission;
        if (permission === 'granted') {

            sendNotification(flag);
        }
        else if (permission !== 'denied') {

            Notification.requestPermission((p) => sendNotification(p === 'granted'));
        }
    }

    /**
     * Send a chat message to selected users for creation of a channel.
     *
     * @param {mgt-people-picker} people selected individuals
     * @param {String} ChannelId Id of the Microsoft teams channel
     * @param {String} groupNameInput Title of the study group created
     */
    public static async sendChatMessage(people: Array<any>, channelId: string, groupNameInput: string) {

        const provider = Providers.globalProvider;
        const graphClient = provider.graph.client;
        const groupId = SessionHelper.get<string>('groupId');

        try {

            let mentionsJsonArray = [];
            let contentString = '';

            for (let i = 0; i < people.length; i++) {

                mentionsJsonArray.push({
                    id: i,
                    mentionText: people[i]['displayName'],
                    mentioned: {
                        user: {
                            displayName: people[i]['displayName'],
                            id: people[i]['id'],
                            userIdentityType: 'aadUser'
                        }
                    }
                });

                contentString += `<at id=\'${i}\'>${people[i]['displayName']}</at>, `;
            }

            const messageUrl = `teams/${groupId}/channels/${channelId}/messages`;
            const messageContent = {
                body: {
                    contentType: 'html',
                    content: `Hi, ${contentString} I created this group to help us better communicate about ${groupNameInput}`
                },
                mentions: mentionsJsonArray
            };

            await graphClient
                .api(messageUrl)
                .version('beta')
                .post(messageContent);
        } 
        catch (error) {

            console.log(error);
        }
    }
}