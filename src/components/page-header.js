import { setElement, companyLogo, imgWrapper } from "../js/utilities";
import logoSVG from '../assets/newsify_logo.svg';

let tagName = 'page-header'
class PageHeaderComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {
        //Logo
        let logoWrap = setElement("hgroup")
        let logo = companyLogo();
        let logoText = setElement("h1").inner("Newsify")
        logoWrap.append(logo, logoText)


        //Profile Image
        let profileGroup = setElement("div", {
            class: `${this.className}__profile`
        })
        let textGroup = setElement("div")
        let greeting = setElement("p").inner(this.timeSpecificGreeting())
        let username = setElement("p").inner("Victor P.")

        textGroup.append(greeting, username)

        let settingsBtn = this.profileSettingsBtn();

        profileGroup.append(textGroup, settingsBtn)
        this.append(logoWrap, profileGroup)
    }

    profileSettingsBtn() {
        let settingsBtn = setElement("button")
        let imgSource;
        //imgSource = logoSVG

        if (!imgSource) {
            let initials = setElement("p").inner("VP")
            settingsBtn.append(initials)


            settingsBtn.style.backgroundColor = this.stringToHslColor("Victor P.", 100, 90)
            initials.style.color = this.stringToHslColor("Victor P.", 100, 25)
        } else {
            let profileImg = setElement("img", {
                src: imgSource
            })
            settingsBtn.append(profileImg)
        }
        return settingsBtn;
    }

    timeSpecificGreeting() {
        var d = new Date();
        var time = d.getHours();
        time = 0
        console.log(time)
        let greeting


        if (time < 5) {
            greeting = "Hello there"
        }
        else if (time < 12) {
            greeting = "Good Morning"
        }
        else if (time < 18) {
            greeting = "Good Afternoon"
        }
        else {
            greeting = "Good Evening"
        }

        return greeting;
    }

    stringToHslColor(str, s, l) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        var h = hash % 360;
        return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    setClass() {
        this.className = this.getAttribute('class') || tagName
        this.classModifier = this.getAttribute('class-mod')
        if (this.classModifier) {
            this.classList.add(`${this.className}--${this.classModifier}`)
        }
    }
}

customElements.define(tagName, PageHeaderComp)
export const PageHeader = tagName;