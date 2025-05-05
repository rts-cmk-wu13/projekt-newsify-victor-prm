import { companyLogo, setElement } from '../js/utilities';
let tagName = 'login-screen'
class LoginScreenComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {
        let logo = companyLogo()
        let title = setElement("h1").inner("Newsify")
        let welcomeMsg = setElement("p").inner("Welcome! Let's dive into your account!")
        let fbButton = setElement("button").inner("Continue with Facebook")
        let gButton = setElement("button").inner("Continue with Google")

        this.append(logo,title, welcomeMsg, fbButton, gButton)
    }

    setClass() {
        this.className = this.getAttribute('class') || tagName
        this._classModifier = this.getAttribute('class-mod')
        if (this._classModifier) {
            this.classList.add(`${this.className}--${this._classModifier}`)
        }
    }
}

customElements.define(tagName, LoginScreenComp)
export const LoginScreen = tagName;