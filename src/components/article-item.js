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
            class: `${this.className}__img`,
            src: this.props.thumbnail
        })
        imgWrap.append(img)

        //Text
        let textContainer = setElement("article")
        let hgroup = setElement("hgroup")
        let headline = setElement("h3", {
            lang: "en"
        }).inner(this.props.title)


        let byline = setElement("p").inner(this.byline())
        clamp(byline, { clamp: 1 });

        hgroup.append(headline, byline)

        let summary = setElement("p", {
            class: "summary"
        }).inner(this.props.abstract || "This article has no preview.")
        //clamp(summary, { clamp: 1 });
        textContainer.append(hgroup, summary)


        let swipeBox = setElement("div", {
            class: `${this.className}__swipe-box`,
        })
        let swipeIcon = setElement("p").inner("Save")
        swipeBox.append(swipeIcon)

        //Append
        this.append(imgWrap, textContainer, swipeBox)

        this.clampText(summary, hgroup)

        this.handleSwipe(swipeBox)
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

    byline() {
        let byline = this.formatDate();
        if (this.props.byline) {
            byline += `${this.props.byline}`
        }

        return byline

    }

    handleSwipe(swipeBox) {
        const article = this;
        let startX = 0;
        let currentX = 0;
        let dragging = false;
        let maxDrag = 104; // 6rem in px (negative direction)
        let saveThreshold = -90;
        let hasSwipedLeft = false;

        article.addEventListener("pointerdown", (e) => {
            startX = e.clientX;
            dragging = true;
            hasSwipedLeft = false;
            article.style.transition = "none";
            article.setPointerCapture(e.pointerId);
        });

        article.addEventListener("pointermove", (e) => {
            if (!dragging) return;

            let deltaX = e.clientX - startX;

            if (deltaX < 0) {
                // Only allow dragging to the left from initial position
                currentX = deltaX;
                if (currentX < -maxDrag) currentX = -maxDrag;
                hasSwipedLeft = true;
            } else if (hasSwipedLeft) {
                // If the user already moved left, allow moving right but not past 0
                currentX = deltaX;
                if (currentX > 0) currentX = 0;
            } else {
                // If no left swipe yet and trying to go right — ignore it
                currentX = 0;
            }

            if (currentX <= saveThreshold) {
                swipeBox.innerHTML = "Saved!"
                swipeBox.classList.add("save-complete")
            }

            article.style.transform = `translateX(${currentX}px)`;
        });

        article.addEventListener("pointerup", (e) => {
            dragging = false;
            article.releasePointerCapture(e.pointerId);

            if (currentX <= saveThreshold) {
                console.log("Article saved!");
            }

            // Animate back to original position
            article.style.transition = "transform 0.2s ease";
            article.style.transform = "translateX(0)";
        });
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