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

        console.log(this.props)
    }

    render() {
        //Details
        let accordion = setElement("details", {
            class: "content"
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

        summary.append(titleGroup, icon)
        accordion.append(summary)
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