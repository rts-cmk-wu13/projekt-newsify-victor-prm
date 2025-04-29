import { setElement, companyLogo, imgWrapper, sectionTitle, newsList } from "../js/utilities";

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
        let logoWrap = setElement("hgroup",{
            class: "logo-wrap"
        })
        let logo = companyLogo();
        let logoText = setElement("h1").inner("Newsify")
        logoWrap.append(logo, logoText)


        //Profile Image
        let profileGroup = setElement("div", {
            class: `${this.className}__profile`
        })
        let user = "John D."

        let textGroup = setElement("div")
        let greeting = setElement("p").inner(this.timeSpecificGreeting())
        let username = setElement("p").inner(user)

        textGroup.append(greeting, username)

        let settingsBtn = this.profileSettingsBtn(user);
        let settingsDialog = this.settingsDialog()
        console.log(settingsDialog)

        profileGroup.append(textGroup, settingsBtn, settingsDialog)
        this.append(logoWrap, profileGroup)


        this.openCloseSettingsDialog(settingsBtn, settingsDialog)

    }

    profileSettingsBtn(user) {
        let settingsBtn = setElement("button")
        let imgSource;
        //imgSource = logoSVG

        if (!imgSource) {
            let initialsText = user.split(" ")
            initialsText = initialsText[0].substring(0, 1) + initialsText[1].substring(0, 1);

            let initials = setElement("p").inner(initialsText)
            settingsBtn.append(initials)


            settingsBtn.style.backgroundColor = this.stringToHslColor(user, 100, 90)
            initials.style.color = this.stringToHslColor(user, 100, 25)
        } else {
            let profileImg = setElement("img", {
                src: imgSource
            })
            settingsBtn.append(profileImg)
        }

        return settingsBtn;
    }

    openCloseSettingsDialog(settingsBtn, settingsDialog) {
        settingsBtn.onclick = () => {
            console.log(settingsDialog.open)
            if (settingsDialog.open) {
                settingsDialog.close()
            }
            else {
                settingsDialog.show()
            }
        }
        let modHeight = window.innerHeight - settingsBtn.getBoundingClientRect().bottom - 8
        settingsDialog.style.height = modHeight + "px"
    }

    settingsDialog() {
        let settingsDialog = setElement("dialog", {
            class: "settings-dialog"
        })
        let settingsTitle = setElement("h2").inner("Settings")
        settingsDialog.append(settingsTitle)

        let news = newsList()
        news.forEach(element => {
            let section = sectionTitle(element.title, element.icon);
            settingsDialog.append(section);
        })

        return settingsDialog
    }

    timeSpecificGreeting() {
        var d = new Date();
        var time = d.getHours();
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