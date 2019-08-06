const teams = require("@microsoft/teams-js/dist/MicrosoftTeams");
const BaseViewElement = require("./base-view");
const { Providers, MsalProvider, TeamsProvider } = require("@microsoft/mgt");


class TimelineViewElement extends BaseViewElement {

  static tagName = "timeline-view";
  classId = "";

  constructor() {

    super(TimelineViewElement.tagName);

    let createButton = this.shadowRoot.querySelector(".create-button");
    createButton.addEventListener("click", this.handleCreateClick.bind(this));

    let url = window.location.href;
    let groupClassStr = url.split("?").slice(1,2)[0].split("&");
    console.log(groupClassStr);
    let classId = groupClassStr[0].split("=").slice(1);
    //this.classId = classId;

    let agenda = this.shadowRoot.querySelector("mgt-agenda");
    agenda.groupId = classId;
    agenda.templateConverters.dayFromDateTime = this.getDateFromDateTime;
    agenda.templateConverters.timeRangeFromEvent = this.getTimeRange;
    // TODO: Wire up click events for agenda items to deeplink to the corresponding Teams meeting
  }

  handleCreateClick() {

    let subject = encodeURI("Team Meeting");
    let startTime = encodeURI(new Date().toISOString());
    let endTime = encodeURI(
      new Date(Date.now() + 30 * 60 * 1000).toISOString()
    );
    let content = encodeURI(
      "Grabbing 30 minutes to chat about progress towards the team project."
    );
    let attendees = encodeURI([].join(","));
    let joinMeetingUrl = `https://teams.microsoft.com/l/meeting/new?subject=${subject}&startTime=${startTime}&endTime=${endTime}&content=${content}&attendees=${attendees}`;
    if (TeamsProvider.isAvailable) {

      teams.executeDeepLink(joinMeetingUrl);
    } else {

      window.open(joinMeetingUrl);
    }
  }

  getDateFromDateTime(dateTimeString) {

    let date = new Date(dateTimeString);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];

    let monthIndex = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();

    return `${monthNames[monthIndex]} ${day} ${year}`;
  }

  getTimeRange(event) {

    if (event.isAllDay) {
      return "ALL DAY";
    }

    let prettyPrintTimeFromDateTime = function(date) {
      
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      let minutesStr = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutesStr} ${ampm}`;
    };

    let start = prettyPrintTimeFromDateTime(new Date(event.start.dateTime));
    let end = prettyPrintTimeFromDateTime(new Date(event.end.dateTime));

    return `${start} - ${end}`;
  }
}

customElements.define(TimelineViewElement.tagName, TimelineViewElement);
module.exports = TimelineViewElement;
