import { saveArticles, getArticlesByCategory } from "./db";

const CACHE_EXPIRY_MINUTES = 1;
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

export async function loadArticles(category) {
    if (isCacheExpired()) {
        console.log("Fetching fresh articles from API...");

        const response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&api-key=${API_KEY}&page=1`);
        const data = await response.json();

        const articles = data.response.docs.map(article => ({
            id: article.uri,  // or article.url or some unique identifier
            title: article.headline.print_headline || article.headline.main,
            abstract: article.abstract,
            thumbnail: article.multimedia.thumbnail.url,
            byline: article.byline.original,
            category: category,
            pub_date: article.pub_date,
            url: article.web_url,
    
        }));

        console.log(articles)

        await saveArticles(articles); // your IndexedDB save function
        updateCacheTimestamp();

        return articles;
    } else {
        console.log("Loading articles from cache...");
        const cachedArticles = await getArticlesByCategory(category); // your IndexedDB read function
        return cachedArticles;
    }
}