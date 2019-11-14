import { View } from "../view";

export class SignInView extends View {
    
    protected getTemplate(): HTMLTemplateElement {
        const template = document.createElement('template');
        template.innerHTML = require('./sign-in-view.html');
        return template;
    }
}