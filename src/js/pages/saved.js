import '../../style/main.sass'
import { categoryList, popularList } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { loadArticlesByCategory, loadArticlesByPopularity } from '../data/data.js';
import { NavFooter } from '../../components/nav-footer.js';
import { getArticlesByCategory } from '../data/db.js';

//Setup
let contentDiv = document.querySelector('#app');
let header = setElement("header")
let main = setElement("main")
let footer = setElement("footer")
contentDiv.append(header, main, footer)

//Populate Header
header.append(setElement(PageHeader))

//Populate Main
let news = categoryList().concat(popularList())
//console.log(news)


news.forEach(element => {
    let section = setElement(NewsSection)

    section.dataObject = element;
    main.append(section);

    let contentElm = section.querySelector(".content-div")
    getArticlesByCategory(element.title).then(items => {
        //console.log(items)
        items.forEach(item => {
            let article = setElement(ArticleItem)
            article.dataObject = item;
            contentElm.append(article)
            section.firstChild.setAttribute("open", "")
        })
    })
    //fetchArticlesBySection(element.title, element.query, contentElm)
});

//Populate Footer
footer.append(setElement(NavFooter))