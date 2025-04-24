import '../style/main.sass'
import { newsList } from './utilities';
import { setElement } from './utilities';
import { PageHeader } from '../components/page-header.js'
import { NewsSection } from '../components/news-section.js';
import { ArticleItem } from '../components/article-item.js';
import { loadArticles } from './data/data.js';

let contentDiv = document.querySelector('#app');

let header = setElement(PageHeader)
let main = setElement("main")

contentDiv.append(header, main)


let news = newsList();

news.forEach(element => {
    let section = setElement(NewsSection)

    section.dataObject = element;
    main.append(section);


    let contentElm = section.querySelector(".content-div")
    loadArticles(element.title).then(items => {
        items.forEach(item => {
            let article = setElement(ArticleItem)
            article.dataObject = item;
            contentElm.append(article)
            section.firstChild.setAttribute("open","")
        })
    })
    //fetchArticlesBySection(element.title, element.query, contentElm)
});