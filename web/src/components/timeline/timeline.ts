/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { MgtAgenda } from '@microsoft/mgt';
import { Component } from '../component';
import { SessionHelper, TeamsHelper } from '../../helpers';

export class Timeline extends Component {
    
    connectedCallback() {

        const classId: string = SessionHelper.get<string>('classId');

        const createButton = this.shadowRoot!.querySelector('.create-button');
        createButton!.addEventListener('click', (e) => this.handleCreateClick());

        const agenda = <MgtAgenda>this.shadowRoot!.querySelector('mgt-agenda');
        agenda!.groupId = classId;
        agenda!.templateConverters.dayFromDateTime = this.getDateFromDateTime;
        agenda!.templateConverters.timeRangeFromEvent = this.getTimeRange;
        // TODO: Wire up click events for agenda items to deeplink to the corresponding Teams meeting
    }

    /**
     * Create a new calender event with Teams
     *
     * @memberof TimelineViewElement
     */
    handleCreateClick() {

        // TODO: Do this without string concatenation.
        let subject = encodeURI('Team Meeting');
        let startTime = encodeURI(new Date().toISOString());
        let endTime = encodeURI(new Date(Date.now() + 30 * 60 * 1000).toISOString());
        let content = encodeURI('Grabbing 30 minutes to chat about progress towards the team project.');
        let attendees = encodeURI([].join(','));
        let joinMeetingUrl = `https://teams.microsoft.com/l/meeting/new?subject=${subject}&startTime=${startTime}&endTime=${endTime}&content=${content}&attendees=${attendees}`;
        
        if (TeamsHelper.isTeamsAvailable()) {

            TeamsHelper.executeDeepLink(joinMeetingUrl);
        }
        else {

            window.open(joinMeetingUrl);
        }
    }

    /**
     * Template date convertion for Group agenda items
     *
     * @param {*} dateTimeString
     * @returns
     * @memberof TimelineViewElement
     */
    getDateFromDateTime(dateTimeString: string) {

        // TODO: Replace this with date/string formatting
        let date = new Date(dateTimeString);
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];

        let monthIndex = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();

        return `${monthNames[monthIndex]} ${day} ${year}`;
    }

    /**
     * Establish standard time range for agenda event template
     *
     * @param {*} event
     * @returns
     * @memberof TimelineViewElement
     */
    getTimeRange(event: any) {

        if (event.isAllDay) {
            return 'ALL DAY';
        }

        // TODO: Replace this with date/string formatting
        let prettyPrintTimeFromDateTime = function(date: Date) {

            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            let hours = date.getHours();
            let minutes = date.getMinutes();
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            let minutesStr = minutes < 10 ? '0' + minutes : minutes;
            return `${hours}:${minutesStr} ${ampm}`;
        };

        let start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
        let end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

        return `${start} - ${end}`;
    }
    
    protected getTemplate(): HTMLTemplateElement {
        
        const template = document.createElement('template');
        template.innerHTML = require('./timeline.html');
        return template;
    }
}

customElements.define('timeline', Timeline);