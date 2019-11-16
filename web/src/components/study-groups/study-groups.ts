  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Providers } from '@microsoft/mgt';
import { Component } from '../component';
import { CreateStudyGroupFlyout, StudyGroupItem } from '..';
import { SessionHelper } from '../../helpers';

export class StudyGroups extends Component {

    private _studyGroupItems: Array<StudyGroupItem> = [];

    async connectedCallback() {

        super.connectedCallback();

        const createButton = this.shadowRoot!.querySelector('.create-button');
        createButton!.addEventListener('click', (e) => this.handleCreateClick());

        this.fetchChannels();
    }
   
    private render() {

        if (this._studyGroupItems && this._studyGroupItems.length > 0) {

            let itemsContainer = this.shadowRoot!.querySelector('.items-container');
            while (itemsContainer && itemsContainer.lastChild) {

                itemsContainer!.removeChild(itemsContainer.lastChild);
            }

            for (let i = 0; i < this._studyGroupItems.length; i++) {

                let item = this._studyGroupItems[i];
                itemsContainer!.appendChild(item);
            }
        }
    }
    
    /**
     * Get and set coordinates for stydy group creation modal
     *
     * @memberof StudyGroupsViewElement
     */
    private handleCreateClick() {

        const createButton = this.shadowRoot!.querySelector('.create-button');
        const rect = createButton!.getBoundingClientRect();
        const top  = window.pageYOffset || document.documentElement.scrollTop;
        const left = window.pageXOffset || document.documentElement.scrollLeft;

        const x = rect.left + left;
        const y = rect.bottom + top;

        const flyout = new CreateStudyGroupFlyout();
        flyout.addEventListener('channelCreated', (e) => this.refreshChannels(e));
        flyout.showAt(x, y);
    }

    /**
     * Append the new study group item to the list of study groups.
     *
     * @param {*} e
     * @memberof StudyGroupsViewElement
     */
    private async refreshChannels(e: any){

        let content = e.detail;
        let item = <StudyGroupItem>document.createElement('study-group-item');

        item.setAttribute('display-name', content['displayName']);
        item.setAttribute('description', content['description']);

        // TODO: Validate that this doesn't need to operate differently in a Teams context.
        item.addEventListener('click', () => parent.open(content['webUrl']));
       
        this._studyGroupItems.push(item);

        let itemsContainer = this.shadowRoot!.querySelector('.items-container');
        itemsContainer!.appendChild(item);
    }

    /**
     * Get all channels for a group and create study group wrapper elements 
     *
     * @memberof StudyGroupsViewElement
     */
    private async fetchChannels(){
        
        const groupId = SessionHelper.get<string>('groupId');
        const provider = Providers.globalProvider;
        const graphClient = provider.graph.client;
        const channels = await graphClient.api(`/teams/${groupId}/channels`).get();
        const totalChannels = channels['value']['length'];
        
        for(let i = 0; i < totalChannels; i++) {

            let content = channels['value'][i];

            let item = <StudyGroupItem>document.createElement('study-group-item');
            item.setAttribute('display-name', content['displayName']);
            item.setAttribute('description', content['description']);
            item.setAttribute('webUrl', content['webUrl']);

            this._studyGroupItems.push(item);
        }

        this.render();
    }
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./study-groups.html');
        return template;
    }
}

customElements.define('study-groups', StudyGroups);