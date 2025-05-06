import '../../style/main.sass'
import { redirectIfLoggedIn, setElement, setLS } from '../utilities.js';
import { SplashScreen } from '../../components/splash-screen.js';
import { LoginScreen } from '../../components/login-screen.js';
redirectIfLoggedIn()

//Setup
let splashScreen = setElement(SplashScreen)
let contentDiv = document.querySelector('#app');
contentDiv.append(splashScreen)
setLS("splashScreenShown", false)

//Populate Main
export async function populateLogin() {
    let loginScreen = setElement(LoginScreen)
    contentDiv.append(loginScreen)
}
populateLogin();
