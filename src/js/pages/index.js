import '../../style/main.sass'
import { categoryList, debounce, getSettings, hasSeenSplashScreen, popularList, redirectIfLoggedOut, setLS, updateCategories } from '../utilities.js';
import { setElement } from '../utilities.js';
import { PageHeader } from '../../components/page-header.js'
import { NewsSection } from '../../components/news-section.js';
import { ArticleItem } from '../../components/article-item.js';
import { fetchArticlesByCategory } from '../data/data.js';
import { getAllArticles } from '../data/db.js';
import { NavFooter } from '../../components/nav-footer.js';
import { SplashScreen } from '../../components/splash-screen.js';
import '@oddbird/css-anchor-positioning';

redirectIfLoggedOut();

getAllArticles

//Setup
let splashScreen = setElement(SplashScreen)


let contentDiv = document.querySelector('#app');
let header = setElement("header")
let main = setElement("main")
let footer = setElement("footer")

if (!hasSeenSplashScreen()) {
    contentDiv.append(splashScreen);
    setLS("splashScreenShown", true)
}
contentDiv.append(header, main, footer)

//Populate Header
header.append(setElement(PageHeader))

//Populate Main
export async function populateHome() {
    main.innerHTML = ""
    let news = categoryList();
    let categoriesToShow = getSettings(news)

    //Filter out categories set to false in the menu
    news = news.filter((item, index) => categoriesToShow[index] !== false)

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
        populateHome();
    }
}, 300);

// Bind it to `input` event (not `oninput`, better cross-browser handling)
searchBar.addEventListener("input", debouncedSearch);

//Re-render main when user changes category preferences 
updateCategories(populateHome)

//Populate Footer
footer.append(setElement(NavFooter))