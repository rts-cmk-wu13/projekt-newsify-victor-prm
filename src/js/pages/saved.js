import '../../style/main.sass'
import { categoryList, debounce, popularList, redirectIfLoggedOut } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { NavFooter } from '../../components/nav-footer.js';
import { getAllArticles, getAllFavoriteCategories, getFavoritesByCategory } from '../data/db.js';
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
    main.innerHTML = "";
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

//Search Mode
function populateSearchResults(query) {
    main.innerHTML = "";

    const allCategories = [...categoryList(), ...popularList()];

    // Fetch all cached articles
    getAllArticles().then(allArticles => {
        // Filter articles by query (case-insensitive search in title or abstract)
        const filtered = allArticles.filter(article =>
            article.title.toLowerCase().includes(query.toLowerCase()) ||
            article.abstract.toLowerCase().includes(query.toLowerCase())
        );

        // Group filtered articles by category
        const grouped = filtered.reduce((acc, article) => {
            const category = article.category || "Other";
            if (!acc[category]) acc[category] = [];
            acc[category].push(article);
            return acc;
        }, {});

        // Render each category section with correct icons
        Object.keys(grouped).forEach(categoryTitle => {
            // Find category object by title
            let categoryObj = allCategories.find(c => c.title === categoryTitle);

            // Fallback if category not found
            if (!categoryObj) {
                categoryObj = { title: categoryTitle, icon: "fas fa-newspaper" };
            }

            // Create section and append to main
            let section = setElement(NewsSection);
            section.dataObject = categoryObj;
            main.append(section);

            let contentElm = section.querySelector(".content-div");

            // Populate articles within this section
            grouped[categoryTitle].forEach(article => {
                let articleElm = setElement(ArticleItem);
                articleElm.dataObject = article;
                contentElm.append(articleElm);
            });

            // Optionally open the section by default
            section.firstChild.setAttribute("open", "");
        });

        // Optional: show a "No results" message if nothing found
        if (filtered.length === 0) {
            main.innerHTML = "<p>No articles found for your search.</p>";
        }
    });
}

let searchBar = document.querySelector(".article-search")

const debouncedSearch = debounce(() => {
    const query = searchBar.value.trim();

    if (query.length > 0) {
        populateSearchResults(query);
    } else {
        populateSaved();
    }
}, 300);

// Bind it to `input` event (not `oninput`, better cross-browser handling)
searchBar.addEventListener("input", debouncedSearch);

//Populate Footer
footer.append(setElement(NavFooter))