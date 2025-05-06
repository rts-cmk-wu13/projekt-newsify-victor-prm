import { setElement, setLS } from '../js/utilities';
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

let tagName = 'onboarding-carousel'
class OnboardingCarouselComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.currentStep = 0;

        this.setClass();
        this.render();
    }

    render() {


        let carouselImg = setElement("img", {
            src: steps[this.currentStep].img
        })

        //White overlay
        let textContainer = setElement("div", {
            class: "text-container"
        })
        let pageTitle = setElement("h1").inner(steps[this.currentStep].title)
        let pageText = setElement("p").inner(steps[this.currentStep].body)


        //Dots
        let dotsContainer = setElement("div", {
            class: "dots-container"
        })
        let dots = [];
        steps.forEach((item, index) => {
            let dot = setElement("button", {
                class: "carousel-dot"
            })

            if (index === this.currentStep) {
                dot.classList.add("selected-dot")
            } else {
                dot.classList.remove("selected-dot")
            }

            dot.onclick = () => {
                this.currentStep = index;
                console.log(this.currentStep)
                this.updateIndex(carouselImg,pageTitle,pageText,dots);
            }

            dots.push(dot)
        })
        dotsContainer.append(...dots)


        //Buttons
        let btnContainer = setElement("div", {
            class: "button-container"
        })
        let skipBtn = setElement("button", {
            class: "large-rounded"
        }).inner("Skip")
        skipBtn.onclick = () => {
            this.currentStep = 3;
            this.updateIndex(carouselImg,pageTitle,pageText,dots);
        }
        let continueBtn = setElement("button", {
            class: "large-rounded green-button"
        }).inner("Continue")
        continueBtn.onclick = () => {
            this.currentStep++;
            this.updateIndex(carouselImg,pageTitle,pageText,dots);
        }


        btnContainer.append(skipBtn, continueBtn)

        textContainer.append(pageTitle, pageText, dotsContainer, btnContainer)

        this.append(carouselImg, textContainer)
    }

    updateIndex(carouselImg,pageTitle,pageText,dots) {
        if (this.currentStep < 3) {
            //Change Slide
            carouselImg.classList.add("hidden")
            carouselImg.ontransitionend = () => {
                carouselImg.src = steps[this.currentStep].img
                carouselImg.onload = () => {
                    carouselImg.classList.remove('hidden');
                };
            }
            pageTitle.inner(steps[this.currentStep].title)
            pageText.inner(steps[this.currentStep].text)

            //Update dot
            dots.forEach((dot, index) => {
                if (index === this.currentStep) {
                    dot.classList.add("selected-dot")
                } else {
                    dot.classList.remove("selected-dot")
                }
            })
        }
        else {
            setLS("onboardingCompleted", true)
            window.location.href = "/"
        }
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