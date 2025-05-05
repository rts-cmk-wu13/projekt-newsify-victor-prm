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
        this.append(logo,title)
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