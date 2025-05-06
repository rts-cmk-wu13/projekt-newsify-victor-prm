import { setElement, companyLogo, sectionTitle, categoryList, setLS, lockScroll, unlockScroll, getLS } from "../js/utilities";

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
        let logoWrap = setElement("hgroup", {
            class: "logo-wrap"
        })
        let logo = companyLogo();
        let logoText = setElement("h1").inner("Newsify")
        logoWrap.append(logo, logoText)


        //Profile Image
        let profileGroup = setElement("div", {
            class: `${this.className}__profile`
        })
        let user = "Victor P."

        let textGroup = setElement("div")
        let greeting = setElement("p").inner(this.timeSpecificGreeting())
        let username = setElement("p").inner(user)

        textGroup.append(greeting, username)

        let settingsBtn = this.profileSettingsBtn(user);
        let settingsDialog = this.settingsDialog()
        //console.log(settingsDialog)

        profileGroup.append(textGroup, settingsBtn, settingsDialog)
        this.append(logoWrap, profileGroup)


        this.toggleSettingsDialog(settingsBtn, settingsDialog)

    }

    profileSettingsBtn(user) {
        let settingsBtn = setElement("button", {
            class: "settings-button"
        })
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

    toggleSettingsDialog(settingsBtn, settingsDialog) {
        settingsBtn.onclick = () => {
            if (settingsDialog.open) {
                settingsDialog.close()
            }
            else {
                lockScroll();
                settingsDialog.showModal()
            }
            let modHeight = window.innerHeight - settingsBtn.getBoundingClientRect().bottom - 8
            settingsDialog.style.height = modHeight + "px"
        }

        document.onkeydown = (e) => {
            if (e.key === "Escape") {
                unlockScroll();
                settingsDialog.close()
            }
        }
    }

    settingsDialog() {
        let settingsDialog = setElement("dialog", {
            class: "settings-dialog"
        })
        let settingsContainer = setElement("div", {
            class: "settings-container"
        })

        let settingsTitle = setElement("h2").inner("Profile Settings")
        let settingsIcon = setElement("i", {
            class: "fas fa-cog"
        })
        settingsTitle.prepend(settingsIcon)
        let description = setElement("p").inner("Choose which categories you would like displayed on the home page")
        settingsContainer.append(settingsTitle, description)


        //Toggle List
        let list = categoryList();
        list.push({
            title: "Dark Mode",
            icon: "far fa-moon",
        })

        let settingsArray = getLS("settingsArray") || new Array(list.length)
        list.forEach((element, index) => {
            let listItem = setElement("div", {
                class: "settings-item"
            })
            let section = sectionTitle(element.title, element.icon);
            let toggleInput = setElement("input", {
                type: "checkbox",
                role: "switch"
            })

            if (settingsArray[index] === false) {
                toggleInput.checked = false
            }else{
                toggleInput.checked = true
            }


            toggleInput.onclick = () => {
                let updatedSettingsArray = getLS("settingsArray")
                updatedSettingsArray[index] = toggleInput.checked;
                setLS("settingsArray", updatedSettingsArray);
                console.log(updatedSettingsArray)
            }


            listItem.append(section, toggleInput)
            settingsContainer.append(listItem);
        })
        settingsDialog.append(settingsContainer)

        //Buttons Container
        let settingsButtons = setElement("div", {
            class: "settings-buttons"
        })
        //Redo Button
        let redoTutorialBtn = setElement("button", {
            class: "large-rounded settings"
        }).inner("Redo Onboarding")
        redoTutorialBtn.onclick = () => {
            setLS("onboardingCompleted", false)
            window.location.href = "/onboarding"
        }
        //Logout Button
        let logoutBtn = setElement("button", {
            class: "large-rounded settings"
        }).inner("Log Out")

        logoutBtn.onclick = () => {
            setLS("loggedIn", false)
            window.location.href = "/login"
        }

        //Append
        settingsButtons.append(redoTutorialBtn, logoutBtn)
        settingsDialog.append(settingsButtons)


        settingsDialog.onclick = (event) => {
            var rect = settingsDialog.getBoundingClientRect();
            var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                settingsDialog.close();
                unlockScroll();
            }
        }


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