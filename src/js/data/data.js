import { saveArticles, getArticlesByCategory } from "./db";
const k = import.meta.env.VITE_NYT_API_KEY

const CACHE_EXPIRY_MINUTES = 2;
const CACHE_KEY = "nytArticlesCacheTimestamp";

function isCacheExpired() {
    const lastFetchTime = localStorage.getItem(CACHE_KEY);

    if (!lastFetchTime) {
        return true; // No cache, needs fetching
    }

    const now = Date.now();
    const diff = (now - Number(lastFetchTime)) / (1000 * 60); // diff in minutes

    return diff > CACHE_EXPIRY_MINUTES;
}

function updateCacheTimestamp() {
    localStorage.setItem(CACHE_KEY, Date.now());
}

function getShortestText(text1, text2) {
    let main_text = text1
    let print_text = text2
    if (print_text != "" && print_text.length < main_text.length) {
        main_text = print_text
    }
    return main_text;
}

export async function loadArticles(category) {
    if (isCacheExpired()) {
        console.log("Fetching fresh articles from API...");

        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&api-key=${k}&sort=newest&page=2`);
        const data = await response.json();

        //console.log(data)

        const articles = data.response.docs.map(article => ({
            id: article.uri,  // or article.url or some unique identifier
            title: getShortestText(article.headline.main, article.headline.print_headline),
            abstract: article.abstract,
            thumbnail: article.multimedia.thumbnail.url,
            byline: article.byline.original,
            category: category,
            pub_date: article.pub_date,
            url: article.web_url,
        })
        );

        //console.log(articles)

        await saveArticles(articles); // your IndexedDB save function
        updateCacheTimestamp();

        return articles;
    } else {
        console.log("Loading articles from cache...");
        const cachedArticles = await getArticlesByCategory(category); // your IndexedDB read function
        //Sort articles, newest first
        cachedArticles.sort(function (b, a) {
            return new Date(a.pub_date) - new Date(b.pub_date);
        })
        return cachedArticles;
    }
}