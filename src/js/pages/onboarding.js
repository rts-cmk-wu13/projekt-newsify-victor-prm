import '../../style/main.sass'
import { setElement } from '../utilities.js';
import { SplashScreen } from '../../components/splash-screen.js';
import { OnboardingCarousel } from '../../components/onboarding-carousel.js';

//Setup
let splashScreen = setElement(SplashScreen)
let contentDiv = document.querySelector('#app');

//Populate Main
export async function populateOnboarding() {
    let carousel = setElement(OnboardingCarousel)
    contentDiv.append(carousel)
}
populateOnboarding();
