import '../../style/main.sass'
import { setElement } from '../utilities.js';
import { SplashScreen } from '../../components/splash-screen.js';
import { LoginScreen } from '../../components/login-screen.js';


//Setup
let splashScreen = setElement(SplashScreen)
let contentDiv = document.querySelector('#app');

//Populate Main
export async function populateLogin() {
    let loginScreen = setElement(LoginScreen)
    contentDiv.append(loginScreen)
}
populateLogin();
