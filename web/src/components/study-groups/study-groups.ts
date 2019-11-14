  
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Providers } from '@microsoft/mgt';
import { Component } from '../component';
import { CreateStudyGroupFlyout } from '..';

export class StudyGroups extends Component {
    
    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = require('./study-groups.html');
        return template;
    }

    _studyGroupItems = [];

    async connectedCallback() {

        this.createButton = this.shadowRoot!.querySelector(".create-button");
        this.createButton.addEventListener("click", this.handleCreateClick.bind(this));

        this.fetchChannels();
    }

   
    render() {

        if (this._studyGroupItems && this._studyGroupItems.length > 0) {

            let itemsContainer = this.shadowRoot!.querySelector(".items-container");
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
    handleCreateClick() {

        let rect = this.createButton.getBoundingClientRect();
        let top  = window.pageYOffset || document.documentElement.scrollTop;
        let left = window.pageXOffset || document.documentElement.scrollLeft;

        let x = rect.left + left;
        let y = rect.bottom + top;

        let createStudyGroupView = new CreateStudyGroupFlyout();
        createStudyGroupView.addEventListener("channelCreated", this.refreshChannels.bind(this));
        createStudyGroupView.showAt(x, y);
    }

    /**
     * Append the new study group item to the list of study groups.
     *
     * @param {*} e
     * @memberof StudyGroupsViewElement
     */
    async refreshChannels(e){

        let content = e.detail;
        let item = document.createElement("study-group-item");

        item.setAttribute("display-name", content["displayName"]);
        item.setAttribute("description", content["description"]);
        item.onclick = function () {parent.open(content["webUrl"]);};
       
        this._studyGroupItems.push(item);
        let itemsContainer = this.shadowRoot!.querySelector(".items-container");
        itemsContainer.appendChild(item);
    }

    /**
     * Get all channels for a group and create study group wrapper elements 
     *
     * @memberof StudyGroupsViewElement
     */
    async fetchChannels(){
        
        let url = new URLSearchParams(location.search);
        let provider = Providers.globalProvider;
        let channels = null; 
        let graphClient = provider.graph.client;
        channels = await graphClient.api(`/teams/${url.get("groupId")}/channels`).get();
        let totalChannels = channels["value"]["length"];
        for(let i = 0; i < totalChannels; i++) {

            let item = document.createElement("study-group-item");
            let content = channels["value"][i];
            item.setAttribute("display-name", content["displayName"]);
            item.setAttribute("description", content["description"]);
            item.setAttribute("webUrl", content["webUrl"]);
            this._studyGroupItems.push(item);
        }
        this.render();
    }
}

customElements.define('study-groups-view', StudyGroupsView);