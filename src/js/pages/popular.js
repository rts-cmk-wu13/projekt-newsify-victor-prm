import '../../style/main.sass'
import { categoryList, popularList } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { fetchArticlesByPopularity } from '../data/data.js';
import { NavFooter } from '../../components/nav-footer.js';


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
    main.innerHTML = ""
    
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

                article.addEventListener("update", () => {
                    main.classList.remove("loaded")
                    setTimeout(populatePopular, 300)
                })
            })
        })
        main.classList.add("loaded")
    });
}
populatePopular();

//Populate Footer
footer.append(setElement(NavFooter))