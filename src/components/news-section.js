import { sectionTitle, setElement } from '../js/utilities';
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
        let accordion = setElement("details")

        //Summary
        let summary = setElement("summary")
        let titleGroup = sectionTitle(this.props.title, this.props.icon)

        let icon = setElement("i", {
            class: "fas fa-chevron-right"
        })

        let contentDiv = setElement("div", {
            class: "content-div"
        })

        summary.append(titleGroup, icon)
        accordion.append(summary, contentDiv)
        this.append(accordion)

        this.monitorItems(contentDiv, this);
    }

    monitorItems(targetDiv, parentDiv) {
        // Define the mutation observer callback
        const callback = function (mutationsList, observer) {
            //for (let mutation of mutationsList) {
                if (targetDiv.childElementCount < 1) {
                    parentDiv.remove()
                }
            //}
        };

        // Create an observer instance
        const observer = new MutationObserver(callback);

        // Specify the mutation types to observe (subtree looks at all descendants)
        const config = { childList: true };

        // Start observing the target node
        observer.observe(targetDiv, config);
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