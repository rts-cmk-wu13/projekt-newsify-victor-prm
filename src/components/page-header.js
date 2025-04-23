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
        this._classModifier = this.getAttribute('class-mod')
        if (this._classModifier) {
            this.classList.add(`${this.className}--${this._classModifier}`)
        }
    }
}

customElements.define(tagName, PageHeaderComp)
export const PageHeader = tagName;