import '../../style/main.sass'
import { categoryList, popularList, redirectIfLoggedOut } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { NavFooter } from '../../components/nav-footer.js';
import { getAllFavoriteCategories, getFavoritesByCategory } from '../data/db.js';
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
export async function populateSaved() {
    let favorites = categoryList().concat(popularList())
    let favoritesToShow = await getAllFavoriteCategories()
    favorites = favorites.filter(item => favoritesToShow.includes(item.title))

    if (favorites.length === 0) {
        let msg = setElement("p").inner("You haven't saved any articles yet!")
        main.append(msg)
    }
    const sectionMap = new Map();

    favorites.forEach(element => {
        const originalCategory = element.title;
        let displayCategory = originalCategory;

        // Rename display category if needed
        if (originalCategory === "Today" || originalCategory === "This Week" || originalCategory === "This Month") {
            displayCategory = "Popular";
            element.title = "Popular";
            element.icon = "far fa-star";
        }

        // Check if a section for this displayCategory already exists — create if not
        if (!sectionMap.has(displayCategory)) {
            const section = setElement(NewsSection);
            section.dataObject = element;
            main.append(section);
            sectionMap.set(displayCategory, section);
        }

        // Get the section element
        const section = sectionMap.get(displayCategory);
        const contentElm = section.querySelector(".content-div");

        // Fetch favorites using the original category value, not the display one
        getFavoritesByCategory(originalCategory).then(items => {
            items.forEach(item => {
                const article = setElement(ArticleItem);
                article.dataObject = item;
                contentElm.append(article);
                section.firstChild.setAttribute("open", "");
            });
        });
    });
}
populateSaved();

//Populate Footer
footer.append(setElement(NavFooter))