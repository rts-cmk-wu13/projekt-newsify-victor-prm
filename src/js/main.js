import '../style/main.sass'
import { setElement } from './utilities';
import { PageHeader } from '../components/pageHeader.js'

let contentDiv = document.querySelector('#app');

let header = setElement(PageHeader)

contentDiv.append(header)