import '../../style/main.sass'
import { setElement, setLS } from '../utilities.js';
import { SplashScreen } from '../../components/splash-screen.js';
import { OnboardingCarousel } from '../../components/onboarding-carousel.js';

//Setup
let contentDiv = document.querySelector('#app');
setLS("splashScreenShown", false)

//Populate Main
export async function populateOnboarding() {
    let carousel = setElement(OnboardingCarousel)
    contentDiv.append(carousel)
}
populateOnboarding();

contentDiv.style.overflow = 'hidden';