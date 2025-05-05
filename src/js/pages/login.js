import '../../style/main.sass'
import { setElement } from '../utilities.js';
import { SplashScreen } from '../../components/splash-screen.js';
import { LoginScreen } from '../../components/login-screen.js';


//Setup
let splashScreen = setElement(SplashScreen)

let contentDiv = document.querySelector('#app');

//Populate Header
//header.append(setElement(PageHeader))

//Populate Main
export async function populateLogin() {
    let loginScreen = setElement(LoginScreen)
    contentDiv.append(loginScreen)
}
populateLogin();

//Populate Footer
//footer.append(setElement(NavFooter))