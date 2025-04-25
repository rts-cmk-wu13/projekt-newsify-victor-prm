import { setElement } from '../js/utilities';
let tagName = 'nav-footer'
class NavFooterComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {
        let nav = setElement("nav")

        let links = this.linkArray();
        links.forEach(link => {
            let linkItem = this.createNavLink(link.title, link.icon)
            nav.append(linkItem)
        })
        this.append(nav)
    }

    linkArray() {
        let linkArray = [
            {
                title: "Home",
                icon: "fas fa-home",
                href: "#"
            },
            {
                title: "Archive",
                icon: "fas fa-bookmark",
                href: "#"
            },
            {
                title: "Popular",
                icon: "fas fa-star",
                href: "#"
            }
        ]

        return linkArray
    }

    createNavLink(linkText, iconClass) {
        let linkGroup = setElement("div")
        let icon = setElement("i", {
            class: iconClass
        })
        let link = setElement("a", {
            href: "#"
        }).inner(linkText)

        linkGroup.append(icon, link)

        return linkGroup
    }

    setClass() {
        this.className = this.getAttribute('class') || tagName
        this._classModifier = this.getAttribute('class-mod')
        if (this._classModifier) {
            this.classList.add(`${this.className}--${this._classModifier}`)
        }
    }
}

customElements.define(tagName, NavFooterComp)
export const NavFooter = tagName;