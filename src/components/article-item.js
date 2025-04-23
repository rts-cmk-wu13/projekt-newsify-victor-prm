import { setElement } from '../js/utilities';

let tagName = 'article-item'
class ArticleItemComp extends HTMLElement {

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
        //Image
        let imgWrap = setElement("figure", {
            class: `${this.className}--img-wrap`
        })

        let img = setElement("img", {
            class: `${this.className}--img`,
            src: this.props.multimedia.thumbnail.url
        })
        imgWrap.append(img)

        //Text
        let textContainer = setElement("article")
        let headline = setElement("h3").inner(this.props.headline.main)







        let byline = setElement("p").inner(this.props.byline.original + " — " + this.formatDate())
        let summary = setElement("p").inner(this.props.abstract)
        textContainer.append(headline, byline, summary)

        //Append
        this.append(imgWrap, textContainer)
    }

    formatDate(){

        const dateStr = this.props.pub_date
        const dateObj = new Date(dateStr);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);

        return formattedDate;
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