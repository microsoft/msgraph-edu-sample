import { Component } from "../component";

export class ViewHost extends Component {
    
    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = require('./view-host.html');
        return template;
    }
}

customElements.define('view-host', ViewHost);