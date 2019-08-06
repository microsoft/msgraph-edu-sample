const CreateStudyGroupViewElement = require('./create-study-group-view');
const BaseViewElement = require("./base-view");
const { Providers }  =  require('@microsoft/mgt');
require('../components/study-group-item');

const secrets = require("../.././secrets-sample.json");

class StudyGroupsViewElement extends BaseViewElement {

    static tagName ='study-groups-view';
    groupId = "";

    _studyGroupItems = [];

    constructor() {
        super(StudyGroupsViewElement.tagName);
        this.createButton = this.shadowRoot.querySelector('.create-button');
        this.createButton.addEventListener('click', this.handleCreateClick.bind(this));
        //URL query parse js . 

        let url = window.location.href;
        let groupClassStr = url.split("?").slice(1,2)[0].split("&");
        let groupId = groupClassStr[1].split("=").slice(1);
        this.groupId = groupId;
    }
    async connectedCallback() {
       this.fetchChannels();
    }

   
    render() {

        if (this._studyGroupItems && this._studyGroupItems.length > 0) {

            let itemsContainer = this.shadowRoot.querySelector('.items-container');
            while (itemsContainer.hasChildNodes()) {
                itemsContainer.removeChild(itemsContainer.lastChild);
              }

            for (let i = 0; i < this._studyGroupItems.length; i++) {

                let item = this._studyGroupItems[i];
                itemsContainer.appendChild(item);
            }
        }
    }

    
    handleCreateClick(e) {

        let rect = this.createButton.getBoundingClientRect();
        let top  = window.pageYOffset || document.documentElement.scrollTop;
        let left = window.pageXOffset || document.documentElement.scrollLeft;
        let x = rect.left + left;
        let y = rect.bottom + top;
        let createStudyGroupView = new CreateStudyGroupViewElement();
        createStudyGroupView.addEventListener('channelCreated', this.refreshChannels.bind(this));
        createStudyGroupView.showAt(x, y);
    }

    async refreshChannels(e){
        let content = e.detail;
        let item = document.createElement('study-group-item');
        item.setAttribute('display-name', content["displayName"]);
        item.setAttribute('description', content["description"]);

    
        item.onclick = function () {parent.open(content["webUrl"])};
       
        this._studyGroupItems.push(item);
        let itemsContainer = this.shadowRoot.querySelector('.items-container');
        itemsContainer.appendChild(item);
    }

    async fetchChannels(){
        let provider = Providers.globalProvider;
        let channels = null; 
        let graphClient = provider.graph.client;
        channels = await graphClient.api(`/teams/${this.groupId}/channels`).get();
        let totalChannels = channels["value"]["length"];
        for(let i = 0; i < totalChannels; i++) {
            let item = document.createElement('study-group-item');
            let content = channels["value"][i];
            item.setAttribute('display-name', content["displayName"]);
            item.setAttribute('description', content["description"]);
            item.setAttribute('webUrl', content["webUrl"]);
            this._studyGroupItems.push(item);
        }
        this.render();

    }

  
}

customElements.define(StudyGroupsViewElement.tagName, StudyGroupsViewElement);
module.exports = StudyGroupsViewElement;