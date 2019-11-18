/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import teams from '@microsoft/teams-js';
import { Providers, IProvider, MgtPeople } from '@microsoft/mgt';
import { View } from '../view';
import { ConfigHelper } from '../../helpers';

export class MainView extends View {
    
    /**
     * Populate course information.
     *
     * @param {*} params
     * @memberof MainView
     */
    async populateTeamInfo(params: any) {

        const provider = <IProvider>Providers.globalProvider;
        if (!provider) {
            return;
        }
            
        let teamName = this.shadowRoot!.querySelector('.team-name');
        
        try {

            let graphClient = provider.graph.client;
            let groupInfo = await graphClient
                .api(`groups/${params.groupId}`)
                .get();
        
            let groupMembers = await graphClient
                .api(`groups/${params.groupId}/members`)
                .get();
    
            let classInfo = await graphClient
                .api(`/education/classes/${params.classId}`)
                .get();
    
            let teacherInfo = await graphClient
                .api(`/education/classes/${params.classId}/teachers`)
                .get();

            let groupName = groupInfo['displayName'];
            teamName!.textContent = groupName;
            
            let startDate = ConfigHelper.START_DATE;
            let endDate = ConfigHelper.END_DATE;
            let year = ConfigHelper.YEAR;
            let courseDates = startDate + ' - ' + endDate + ', ' + year;

            this.shadowRoot!.querySelector('.class-dates')!.textContent = courseDates;
            this.shadowRoot!.querySelector('.class-name')!.textContent =  classInfo['displayName'];

            let teacherIndex = teacherInfo['value']['length'] - 3;
            let teacher = teacherInfo['value'][teacherIndex];

            let teacherCard = this.shadowRoot!.querySelector('.teacher-person');
            teacherCard!.setAttribute('person-query', teacher['userPrincipalName']);
    
            let mgtPeople = <MgtPeople>this.shadowRoot!.querySelector('.team-members mgt-people');
            mgtPeople!.groupId = params.groupId;
            mgtPeople!.people = groupMembers['value'];
        } 
        catch (error) {

            console.log(error);
        }
    }

    load(parameter: any) {

        this.populateTeamInfo(parameter);

        let askFriendButton = this.shadowRoot!.querySelector('.ask-friend-button');
        askFriendButton!.addEventListener('click', (e) => this.handleAskFriendClick());

        let findExpertButton = this.shadowRoot!.querySelector('.find-expert-button');
        findExpertButton!.addEventListener('click', (e) => this.handleFindExpertClick());

        let askTeacherButton = this.shadowRoot!.querySelector('.ask-teacher-button');
        askTeacherButton!.addEventListener('click', (e) => this.handleAskTeacherClick());
    }

    handleAskFriendClick() {
        
        //TODO: Configure a group mate 'friend' or update the UI to start a chat with a colleague.
        let friend = '';
        let users = encodeURI(friend);
        let topicName = encodeURI('Ask a friend');
        let message = encodeURI('Hey friend, can I ask you a question?');
        let createChatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${message}`;

        let t = setTimeout(function() {
            window.open(createChatUrl);
        }, 1000);

        teams.getContext(function() {
            clearTimeout(t);
            teams.executeDeepLink(createChatUrl);
        });
    }

    handleFindExpertClick() {

        //TODO: Configure a class expert or remove this. 
        let expert = '';
        let users = encodeURI(expert);
        let topicName = encodeURI('Find an expert');
        let message = encodeURI('Hey expert, can I ask you a question?');
        let createChatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${message}`;

        let t = setTimeout(function() {

            window.open(createChatUrl);
        }, 1000);

        teams.getContext(function() {

            clearTimeout(t);
            teams.executeDeepLink(createChatUrl);
        });
    }

    handleAskTeacherClick() {

        //TODO: Update to actually send the course teacher a message
        let teacher = '';
        let users = encodeURI(teacher);
        let topicName = encodeURI('Ask the teacher');
        let message = encodeURI('Hey professor, can I ask you a question?');
        let createChatUrl = `https://teams.microsoft.com/l/chat/0/0?users=${users}&topicName=${topicName}&message=${message}`;

        let t = setTimeout(function() {

            window.open(createChatUrl);
        }, 1000);

        teams.getContext(function() {

            clearTimeout(t);
            teams.executeDeepLink(createChatUrl);
        });
    }

    protected getTemplate(): HTMLTemplateElement {

        const template = document.createElement('template');
        template.innerHTML = require('./main-view.html');
        return template;
    }
}

customElements.define('main-view', MainView);
