import '../style/main.sass'
import { setElement } from './utilities';
import { PageHeader } from '../components/page-header.js'
import { ArticleItem } from '../components/article-item.js';

let contentDiv = document.querySelector('#app');

let header = setElement(PageHeader)
let main = setElement("main")

contentDiv.append(header,main)

let article1 = setElement(ArticleItem)
let article2 = setElement(ArticleItem)
let article3 = setElement(ArticleItem)


main.append(article1, article2, article3)

