import { setElement } from '../js/utilities';

let tagName = 'article-item'
class ArticleItemComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();

    }

    render() {
        //Image
        let imgWrap = setElement("figure", {
            class: `${this.className}--img-wrap`
        })

        let img = setElement("img", {
            class: `${this.className}--img`
        })
        imgWrap.append(img)

        //Text
        let textContainer = setElement("article")
        let headline = setElement("h1").inner("Title")
        let summary = setElement("p").inner("Summary")
        textContainer.append(headline, summary)
      
        //Append
        this.append(imgWrap, textContainer)
    }
    setClass() {
        this.className = this.getAttribute('class') || tagName
        this.classModifier = this.getAttribute('class-mod')
        if (this.classModifier) {
            this.classList.add(`${this.className}--${this.classModifier}`)
        }
    }
}

customElements.define(tagName, ArticleItemComp)
export const ArticleItem = tagName;