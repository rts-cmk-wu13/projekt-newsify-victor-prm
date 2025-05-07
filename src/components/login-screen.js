import { companyLogo, getLS, setElement, setLS } from '../js/utilities';
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
        let logoContainer = setElement("div", {
            class: "logo-container"
        })
        let logo = companyLogo()
        let title = setElement("h1").inner("Newsify")
        logoContainer.append(logo, title)

        let welcomeMsg = setElement("p").inner("Welcome! Let's dive into your account!")

        let soMeButtonsContainer = setElement("div", {
            class: "some-buttons"
        })
        let fbButton = setElement("button", {
            class: "large-rounded"
        }).inner("Continue with Facebook")
        let gButton = setElement("button", {
            class: "large-rounded"
        }).inner("Continue with Google")
        soMeButtonsContainer.append(fbButton, gButton)

        let passButton = setElement("button", {
            class: "large-rounded green-button"
        }).inner("Sign in with password")

        this.append(logoContainer, welcomeMsg, soMeButtonsContainer, this.horizontalDivider(), passButton)
        this.handleRedirect();
    }

    horizontalDivider() {
        let dividerContainer = setElement("div", {
            class: "login-divider"
        })
        let divider = setElement("hr")
        let or = setElement("p").inner("or")

        dividerContainer.append(divider, or)
        return dividerContainer;
    }

    handleRedirect() {
        let buttons = this.querySelectorAll("button");
        buttons.forEach(btn => btn.onclick = () => {
            setLS("loggedIn", true)
            setLS("lastLogin", Date.now())
            if (!getLS("onboardingCompleted")) {
                window.location.href = "/onboarding"
            } else {
                window.location.href = "/"
            }
        })
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