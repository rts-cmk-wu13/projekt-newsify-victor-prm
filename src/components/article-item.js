import { imgWrapper, setElement } from '../js/utilities';
import clamp from 'clamp-js';

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
        //console.log(this.props)
        this.setClass();
        this.render();
    }

    render() {
        //Image
        let imgWrap = imgWrapper(this.className)

        let img = setElement("img", {
            class: `${this.className}--img`,
            src: this.props.thumbnail
        })
        imgWrap.append(img)

        //Text
        let textContainer = setElement("article")
        let hgroup = setElement("hgroup")
        let headline = setElement("h3",{
            lang: "en"
        }).inner(this.props.title)


        let byline = setElement("p").inner(this.byline())
        clamp(byline, { clamp: 1 });

        hgroup.append(headline, byline)

        let summary = setElement("p",{
            class: "summary"
        }).inner(this.props.abstract || "This article has no preview.")
        //clamp(summary, { clamp: 1 });
        textContainer.append(hgroup, summary)

        //Append
        this.append(imgWrap, textContainer)

        this.clampText(summary, hgroup)


    }

    clampText(textElm, occupiedSpace) {

        new ResizeObserver(() => {
            let clampLines = 2
            if (occupiedSpace.clientHeight > 40) {
                clampLines = 1
            }
            clamp(textElm, {
                clamp: clampLines
            });
        }).observe(this)
    }

    byline(){
        let byline = this.formatDate();
        if(this.props.byline){
            byline += `${this.props.byline}` 
        }

        return byline

    }

    formatDate() {

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