import { setElement } from "../js/utilities";
import { companyLogo } from "../js/utilities";

let tagName = 'page-header'
class PageHeaderComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {
        let logo = companyLogo();
    
        let logoText = setElement("h1").inner("Newsify")
        
        this.append(logo,logoText)
    }
    setClass() {
        this.className = this.getAttribute('class') || tagName
        this.classModifier = this.getAttribute('class-mod')
        if (this.classModifier) {
            this.classList.add(`${this.className}--${this.classModifier}`)
        }
    }
}

customElements.define(tagName, PageHeaderComp)
export const PageHeader = tagName;