import '../style/main.sass'
import { newsList } from './utilities';
import { setElement } from './utilities';
import { PageHeader } from '../components/page-header.js'
import { NewsSection } from '../components/news-section.js';
import { ArticleItem } from '../components/article-item.js';

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
    //fetchArticlesBySection(element.query, contentElm)

});



function fetchArticlesBySection(query, contentElm) {
    const apiKey = API_KEY
    const baseUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    const url = `${baseUrl}?q=${query}&api-key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let items = data.response.docs
            console.log(items); // articles array

            items.forEach(item => {
                let article = setElement(ArticleItem)
                article.dataObject = item;
                contentElm.append(article)
            })

        })
        .catch(error => {
            console.error("Error fetching articles:", error);
        });
}