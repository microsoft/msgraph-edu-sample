/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Providers, MgtPeoplePicker } from '@microsoft/mgt';
import { Flyout } from '../flyout';
import { TeamsHelper, SessionHelper } from '../../helpers';

export class CreateStudyGroupFlyout extends Flyout {
    
    connectedCallback() {

        super.connectedCallback();

        const createButton = this.shadowRoot!.querySelector('.create-button');
        createButton!.addEventListener('click', (e) => this.handleCreateClicked());
    }

    /**
     *  Wrapper function to handle event dispatch  
     *
     * @param {*} channel
     * @memberof CreateStudyGroupViewElement
     */
    createEvent(channel: { displayName: string, description: string, webUrl: string }) {
        
        const event = new CustomEvent('channelCreated', {
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

        const groupNameInput = <HTMLInputElement>this.shadowRoot!.querySelector('.group-name-input');
        const groupDescriptionInput = <HTMLInputElement>this.shadowRoot!.querySelector('.group-description-input');
        const peoplePicker = <MgtPeoplePicker>this.shadowRoot!.querySelector('mgt-people-picker');

        const groupName = "-"+groupNameInput.value;
        console.log(groupName);
        const groupDescription = groupDescriptionInput.value;
        const people = peoplePicker!.selectedPeople;
        let channel = {
            displayName: groupName,
            description: groupDescription
        };

        const groupId = SessionHelper.get<string>('groupId');
        const createNewChannelUrl = `https://graph.microsoft.com/v1.0/teams/${groupId}/channels`;
        const graphClient = Providers.globalProvider.graph.client;
        const result = await graphClient.api(createNewChannelUrl).post(channel);
        
        const channelId = result['id'];

        // Send an event with the channel object and webUrl appended on.
        this.createEvent(Object.assign(channel, { webUrl: result['webUrl'] }));
        TeamsHelper.handleNotification(groupNameInput.value, channelId);

        if (channelId) {

            TeamsHelper.sendChatMessage(people, channelId, groupName);
        }

        this.hide();
    }    
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./create-study-group-flyout.html');
        return template;
    }
}

customElements.define('create-study-group-flyout', CreateStudyGroupFlyout);