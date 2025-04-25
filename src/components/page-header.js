import { setElement, companyLogo, imgWrapper } from "../js/utilities";

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
        //Logo
        let logoWrap = setElement("hgroup")
        let logo = companyLogo();
        let logoText = setElement("h1").inner("Newsify")
        logoWrap.append(logo, logoText)


        //Profile Image
        let profileGroup = setElement("div", {
            class: `${this.className}__profile`
        })
        let textGroup = setElement("div")
        let greeting = setElement("p").inner("Good Morning")
        let username = setElement("p").inner("Victor P.")

        let imgWrap = imgWrapper(this.className)
        let initials = setElement("p").inner("VP")
        let profileImg = setElement("img")


        textGroup.append(greeting, username)

        imgWrap.append(initials, profileImg)
        

        profileGroup.append(textGroup, imgWrap)
        this.append(logoWrap, profileGroup)
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