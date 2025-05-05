import '../../style/main.sass'
import { categoryList, popularList, redirectIfLoggedOut } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { fetchArticlesByPopularity } from '../data/data.js';
import { NavFooter } from '../../components/nav-footer.js';
import '@oddbird/css-anchor-positioning';
redirectIfLoggedOut();


//Setup
let contentDiv = document.querySelector('#app');
let header = setElement("header")
let main = setElement("main")
let footer = setElement("footer")
contentDiv.append(header, main, footer)

//Populate Header
header.append(setElement(PageHeader))

//Populate Main
export async function populatePopular() {
    let news = popularList();
    news.forEach(element => {
        let section = setElement(NewsSection)

        section.dataObject = element;
        main.append(section);

        let contentElm = section.querySelector(".content-div")
        fetchArticlesByPopularity(element.title).then(items => {
            console.log(items)
            items.forEach(item => {
                let article = setElement(ArticleItem)
                article.dataObject = item;
                contentElm.append(article)
                section.firstChild.setAttribute("open", "")
            })
        })
    });
}
populatePopular();

//Populate Footer
footer.append(setElement(NavFooter))