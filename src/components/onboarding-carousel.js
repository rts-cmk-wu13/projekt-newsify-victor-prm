import { setElement } from '../js/utilities';
import screenLogin from '../assets/screen_login.png'
import screenHome from '../assets/screen_home.png'
import screenSettings from '../assets/screen_settings.png'

let steps = [
    {
        title: "Stay Connected, Everywhere, Anytime",
        body: "Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.",
        img: screenLogin
    },
    {
        title: "Become a Savvy Global Citizen",
        body: "Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!",
        img: screenHome
    },
    {
        title: "Stay Connected, Everywhere, Anytime",
        body: "Be part of our dynamic community and contribute your insights and participate in enriching conversations.",
        img: screenSettings
    }
]

let currentStep = 0;

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
        let carouselImg = setElement("img", {
            src: steps[currentStep].img
        })

        //White overlay
        let textContainer = setElement("div", {
            class: "text-container"
        })
        let pageTitle = setElement("h1").inner(steps[currentStep].title)
        let pageText = setElement("p").inner(steps[currentStep].body)


        //Dots
        let dotsContainer = setElement("div", {
            class: "dots-container"
        })


        //Buttons
        let btnContainer = setElement("div", {
            class: "button-container"
        })
        let skipBtn = setElement("button", {
            class: "large-rounded"
        }).inner("Skip")
        let continueBtn = setElement("button", {
            class: "large-rounded green-button"
        }).inner("Continue")
        continueBtn.onclick = () => {
            currentStep++;
            if (currentStep < 3) {
                carouselImg.classList.add("hidden")
                carouselImg.ontransitionend = () => {
                    carouselImg.src = steps[currentStep].img
                    carouselImg.onload = () => {
                        carouselImg.classList.remove('hidden');
                    };
                }

                console.log(carouselImg.src)
                pageTitle.inner(steps[currentStep].title)
                pageText.inner(steps[currentStep].text)
            }
            else {
                window.location.href = "/"
            }
        }


        btnContainer.append(skipBtn, continueBtn)

        textContainer.append(pageTitle, pageText, btnContainer)

        this.append(carouselImg, textContainer)
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