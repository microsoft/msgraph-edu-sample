/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { Providers, TeamsProvider } from '@microsoft/mgt';
import { NavigationHelper, SessionHelper } from '../../helpers';
import { View } from '..';

export class SignInView extends View {
    
    connectedCallback() {

        super.connectedCallback();
        
        if (TeamsProvider.isAvailable) {

            let loginButton = this.shadowRoot!.querySelector('.login-component');
            loginButton!.classList.add('hidden');
        }
    
        this.populateCourseDropDown();
        this.populateGroupDropDown();

        let submitButton = this.shadowRoot!.querySelector('.submit-button');
        submitButton!.addEventListener('click', (e) => this.submit());
    }

    /**
     * Navigate to main view with selected params on dropdown. 
     *
     * @memberof DropDownViewElement
     */
    private submit(){

        let groupDropDown = <HTMLSelectElement>this.shadowRoot!.querySelector('.group-selector');
        let classDropDown = <HTMLSelectElement>this.shadowRoot!.querySelector('.course-selector');

        let groupId = groupDropDown!.options[groupDropDown.selectedIndex].value;
        let classId = classDropDown!.options[classDropDown.selectedIndex].value;
        
        if (!groupId || !classId) {

            return;
        }

        SessionHelper.set('classId', classId);
        SessionHelper.set('groupId', groupId);

        let view = <View>document.createElement('main-view');
        NavigationHelper.navigate(view, {
            groupId: groupId,
            classId: classId
        });
    }

    /**
     * Populate drop down selector for classes.
     *
     * @memberof DropDownViewElement
     */
    async populateCourseDropDown(){

        let provider = Providers.globalProvider;
        if (provider) {

            try {

                let graphClient = provider.graph.client;
                let coursesInfo = await graphClient.api('education/me/classes').get();

                let courseDropDown = <HTMLSelectElement>this.shadowRoot!.querySelector('.course-selector');
                courseDropDown.options[0] = new Option('Select a Course','');

                for (let i = 0; i < coursesInfo['value']['length']; i++) {

                    courseDropDown.options[(i +1)] = new Option(coursesInfo['value'][i]['displayName'],coursesInfo['value'][i]['id']);                }
            } 
            catch (error){

                console.log(error);
            }
        }
    }

    /**
     * Populate drop down selector for groups. 
     *
     * @memberof DropDownViewElement
     */
    async populateGroupDropDown(){

        let provider = Providers.globalProvider;
        if (provider) {

            try {

                let graphClient = provider.graph.client;
                let groupsInfo = await graphClient.api('/me/joinedTeams').get();

                let groupsDropDown = <HTMLSelectElement>this.shadowRoot!.querySelector('.group-selector');
                groupsDropDown.options[0] = new Option('Select a Study Group','');

                for (let i = 0; i < groupsInfo['value']['length']; i++) {

                    groupsDropDown.options[(i +1)] = new Option(groupsInfo['value'][i]['displayName'],groupsInfo['value'][i]['id']);
                }

            } 
            catch (error){
                
                console.log(error);
            }   
        }
    }
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./sign-in-view.html');
        return template;
    }
}

customElements.define('sign-in-view', SignInView);
