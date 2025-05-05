import { companyLogo, setElement } from '../js/utilities';
let tagName = 'splash-screen'
class SplashScreenComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {
        let logoContainer = setElement("div")
        let logo = companyLogo();
        let companyText = setElement("p").inner("Newsify")

        logoContainer.append(logo, companyText)
        this.append(logoContainer)

        //Animations
        let transitionTime = 600;
        setTimeout(() => {
            logo.style.transition = `width ${transitionTime}ms ease`
            logo.style.width = `180px`
            
            companyText.style.transition = `opacity ${transitionTime}ms ${transitionTime}ms ease`
            companyText.style.opacity = `1`
            
            this.style.transition = `opacity ${transitionTime}ms ${transitionTime*4}ms ease`
            this.style.opacity = 0;
        }, 300)

        //Remove Splash Screen
        setTimeout(() => { this.remove() }, transitionTime*5)


    }
    setClass() {
        this.className = this.getAttribute('class') || tagName
        this._classModifier = this.getAttribute('class-mod')
        if (this._classModifier) {
            this.classList.add(`${this.className}--${this._classModifier}`)
        }
    }
}

customElements.define(tagName, SplashScreenComp)
export const SplashScreen = tagName;