class BaseViewElement extends HTMLElement {

    constructor(tagName) {

        super();

        let template = this.getTemplate(tagName);
        let templateContent = template.content;

        this.attachShadow({ mode: "open" }).appendChild(
            templateContent.cloneNode(true)
        );
    }

    /**
     * View handler for all children  views.
     *
     * @param {*} tagName
     * @returns
     * @memberof BaseViewElement
     */
    getTemplate(tagName) {
    
        let templateString = require(`../templates/${tagName}.html`);
        let template = document.createElement("template");
        template.innerHTML = templateString;
        return template;
    }

    initialize() {}

    unload() {}
}

module.exports = BaseViewElement;
