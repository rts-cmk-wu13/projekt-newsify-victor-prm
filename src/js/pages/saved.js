import '../../style/main.sass'
import { categoryList, popularList } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { fetchArticlesByCategory } from '../data/data.js';
import { NavFooter } from '../../components/nav-footer.js';
import { getAllFavoriteCategories, getArticlesByCategory, getFavoritesByCategory } from '../data/db.js';

//Setup
let contentDiv = document.querySelector('#app');
let header = setElement("header")
let main = setElement("main")
let footer = setElement("footer")
contentDiv.append(header, main, footer)

//Populate Header
header.append(setElement(PageHeader))

//Populate Main
let favorites = categoryList().concat(popularList())
let favoritesToShow = await getAllFavoriteCategories()
favorites = favorites.filter(item => favoritesToShow.includes(item.title))

favorites.forEach(element => {
    let category = element.title
    if (element.title === "Today" || element.title === "Week" || element.title === "Month") {
        element.title = "Popular"
        element.icon = "far fa-star"
    }

    let section = setElement(NewsSection)

    section.dataObject = element;
    main.append(section);

    let contentElm = section.querySelector(".content-div")
    getFavoritesByCategory(category).then(items => {
        console.log(items)
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