import { imgWrapper, setElement } from '../js/utilities';
import clamp from 'clamp-js';
import { favoriteArticle, isArticleFavorited, unfavoriteArticle } from '../js/data/db';


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
        let linkToNYT = setElement("a", {
            href: this.props.url,
            target: "_blank"
        }).inner(this.props.title)
        let headline = setElement("h3", {
            lang: "en"
        })
        let externalIcon = setElement("i", {
            class: "fas fa-external"
        })
        headline.append(externalIcon, linkToNYT)

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
        let swipeIcon = setElement("i", {
            class: "far fa-bookmark"
        })
        swipeBox.append(swipeIcon)

        //Append
        this.append(imgWrap, textContainer, swipeBox)

        this.clampText(summary, hgroup)

        this.handleSwipe(swipeBox, swipeIcon)
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
            byline += ` — ${this.props.byline}`
        }

        return byline

    }

    handleSwipe(swipeBox, swipeIcon) {
        const article = this;
        let startX = 0;
        let currentX = 0;
        let dragging = false;
        let maxDrag = 104; // 6.5rem in px (negative direction)
        let saveThreshold = -90;
        let hasSwipedLeft = false;
        let moved = false;

        article.addEventListener("click", (e) => {
            let deltaX = e.clientX - startX;

            // Deadzone handling (user ISN'T swiping)
            if (Math.abs(deltaX) < 5) {
                window.open(this.props.url, '_blank').focus();
            }

        });

        article.addEventListener("pointerdown", (e) => {
            startX = e.clientX;
            dragging = true;
            hasSwipedLeft = false;
            moved = false;
            article.style.transition = "none";
            article.setPointerCapture(e.pointerId);
        });

        article.addEventListener("pointermove", (e) => {
            if (!dragging) return;

            let deltaX = e.clientX - startX;

            if (deltaX < 0) {
                currentX = deltaX;
                if (currentX < -maxDrag) currentX = -maxDrag;
                hasSwipedLeft = true;
            } else if (hasSwipedLeft) {
                currentX = deltaX;
                if (currentX > 0) currentX = 0;
            } else {
                currentX = 0;
            }

            // Deadzone handling (user IS swiping)
            if (Math.abs(deltaX) > 5) moved = true;

            article.style.transform = `translateX(${currentX}px)`;
        });

        article.addEventListener("pointerup", async (e) => {
            dragging = false;
            article.releasePointerCapture(e.pointerId);


            let transition = "";

            if (currentX <= saveThreshold) {
                const delayTime = 2000;
                const transitionTime = 300;
                
                swipeIcon.className = "fas fa-bookmark";
                transition = `transform ${transitionTime}ms ${delayTime}ms ease`;
                let isFavorited = await isArticleFavorited(this.props.id);

                if (!isFavorited) {
                    console.log("Article saved!");
                    favoriteArticle(this.props)
                } else {
                    console.log("Article unsaved!");
                    //Update DOM if on saved page
                    if (window.location.pathname === "/saved") {
                        transition += `, opacity ${transitionTime}ms ease`
                        article.style.opacity = 0.2;
                        setTimeout(() => article.remove(), transitionTime)
                    }
                    unfavoriteArticle(this.props.id);
                }

                //setTimeout(() => {this.dispatchEvent(new Event("update"))},delayTime+transitionTime+100)

            } else {
                transition = "transform 300ms ease";
            }

            // Reset position and swipeBox
            article.style.transition = transition;
            article.style.transform = "translateX(0)";

            // If no meaningful movement — simulate normal click if user tapped on a link
            if (!moved) {
                const targetElement = document.elementFromPoint(e.clientX, e.clientY);
                if (targetElement && targetElement.closest("a")) {
                    targetElement.click();
                }
            }
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