import { setElement } from '../js/utilities';
let tagName = 'onboarding-carousel'
class OnboardingCarouselComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {

    }

    setClass() {
        this.className = this.getAttribute('class') || tagName
        this._classModifier = this.getAttribute('class-mod')
        if (this._classModifier) {
            this.classList.add(`${this.className}--${this._classModifier}`)
        }
    }
}

customElements.define(tagName, OnboardingCarouselComp)
export const OnboardingCarousel = tagName;