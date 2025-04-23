import { setElement } from '../js/utilities';
let tagName = 'news-section'
class NewsSectionComp extends HTMLElement {

    set dataObject(value) {
        this.props = value;
    }

    constructor() {
        super();
        this.props = {};
    }

    connectedCallback() {
        this.setClass();
        this.render();

    }

    render() {
        //Details
        let accordion = setElement("details", {
            open: ""
        })

        //Summary
        let summary = setElement("summary")
        let titleGroup = setElement("hgroup")
        let categoryIcon = setElement("i", {
            class: this.props.icon
        })

        let title = setElement("h2").inner(this.props.title)
        titleGroup.append(categoryIcon, title)

        let icon = setElement("i", {
            class: "fas fa-chevron-right"
        })

        let contentDiv = setElement("div", {
            class: "content-div"
        })

        summary.append(titleGroup, icon)
        accordion.append(summary, contentDiv)
        this.append(accordion)

    }

    setClass() {
        this.className = this.getAttribute('class') || tagName
        this.classModifier = this.getAttribute('class-mod')
        if (this.classModifier) {
            this.classList.add(`${this.className}--${this.classModifier}`)
        }
        this.role = "region"
    }
}

customElements.define(tagName, NewsSectionComp)
export const NewsSection = tagName;