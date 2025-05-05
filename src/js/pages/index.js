import '../../style/main.sass'
import { categoryList } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { fetchArticlesByCategory } from '../data/data.js';
import { NavFooter } from '../../components/nav-footer.js';
import { SplashScreen } from '../../components/splash-screen.js';
import '@oddbird/css-anchor-positioning';


//Setup
let splashScreen = setElement(SplashScreen)


let contentDiv = document.querySelector('#app');
let header = setElement("header")
let main = setElement("main")
let footer = setElement("footer")
contentDiv.append(splashScreen,header, main, footer)

//Populate Header
header.append(setElement(PageHeader))

//Populate Main
export async function populateHome() {
    let news = categoryList();
    news.forEach(element => {
        let section = setElement(NewsSection)

        section.dataObject = element;
        main.append(section);

        let contentElm = section.querySelector(".content-div")

        fetchArticlesByCategory(element.title).then(items => {
            items.forEach(item => {
                let article = setElement(ArticleItem)
                article.dataObject = item;
                contentElm.append(article)
                section.firstChild.setAttribute("open", "")
            })
        })
    });
}
populateHome();

//Populate Footer
footer.append(setElement(NavFooter))