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
            //console.log(link)
            let linkItem = this.createNavLink(link.title, link.href, link.icon)
            nav.append(linkItem)
        })

        this.append(nav)
    }

    linkArray() {
        let linkArray = [
            {
                title: "Home",
                icon: "fas fa-home",
                href: "/"
            },
            {
                title: "Saved",
                icon: "fas fa-bookmark",
                href: "/saved"
            },
            {
                title: "Popular",
                icon: "fas fa-star",
                href: "/popular"
            }
        ]

        return linkArray
    }

    createNavLink(linkText, href, iconClass) {
        let icon = setElement("i", {
            class: iconClass
        })
        let link = setElement("a", {
            href: href,
        }).inner(linkText)
        if (href === window.location.pathname) link.setAttribute('aria-current', 'page');

        link.prepend(icon)

        return link
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