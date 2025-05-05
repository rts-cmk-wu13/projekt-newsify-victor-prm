import getK from "../getk";
import { saveArticles, getArticlesByCategory } from "./db";
//const k = import.meta.env.VITE_NYT_API_KEY
const k = getK();

const CACHE_EXPIRY_MINUTES = 2;

function isCacheExpired(cacheKey) {
    const lastFetchTime = localStorage.getItem(cacheKey);

    if (!lastFetchTime) {
        return true; // No cache, needs fetching
    }

    const now = Date.now();
    const diff = (now - Number(lastFetchTime)) / (1000 * 60); // diff in minutes

    return diff > CACHE_EXPIRY_MINUTES;
}

function updateCacheTimestamp(cacheKey) {
    localStorage.setItem(cacheKey, Date.now());
}

function getShortestText(text1, text2) {
    let main_text = text1
    let print_text = text2
    if (print_text != "" && print_text.length < main_text.length) {
        main_text = print_text
    }
    return main_text;
}

export async function fetchArticlesByCategory(category) {
    if (isCacheExpired("articlesCategoryTimestamp")) {
        console.log("Fetching fresh articles from API...");

        //Pages can be added with "&page=XYZ", but it seems to affect the results in "&page=1" is kept in there
        let url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${category}&begin_date=${dateStartLimit()}&api-key=${k}&sort=newest`
        const response = await fetch(url);
        //console.log(url)
        const data = await response.json();

        console.log(data)
        //console.log(data.response.docs.map(doc => doc.multimedia));

        const articles = data.response.docs
            .filter(article => article.multimedia.default.url !== undefined && article.multimedia.default.url !== '')
            .map(article => {
                return {
                    id: article.uri,
                    title: getShortestText(article.headline.main, article.headline.print_headline),
                    abstract: article.abstract,
                    thumbnail: article.multimedia.default.url,
                    byline: article.byline.original,
                    category: category,
                    pub_date: article.pub_date,
                    url: article.web_url,
                };
            });
        //console.log(articles)

        await saveArticles(articles); // your IndexedDB save function
        updateCacheTimestamp("articlesCategoryTimestamp");

        return articles;
    } else {
        console.log("Loading articles from cache...");
        const cachedArticles = await getArticlesByCategory(category); // your IndexedDB read function
        //console.log(cachedArticles)
        
        //Sort articles, newest first
        cachedArticles.sort(function (b, a) {
            return new Date(a.pub_date) - new Date(b.pub_date);
        })
        return cachedArticles;
    }
}

function dateStartLimit() {
    const today = new Date();
    const aWeekAgo = new Date();
    aWeekAgo.setDate(today.getDate() - 7);

    const formatDate = (date) =>
        date.toISOString().slice(0, 10).replace(/-/g, '');

    const beginDate = formatDate(aWeekAgo);

    return beginDate;
}



export async function fetchArticlesByPopularity(period) {
    if (isCacheExpired("articlesPopularTimestamp")) {
        console.log("Fetching fresh articles from API...");

        //Pages can be added with "&page=XYZ", but it seems to affect the results in "&page=1" is kept in there

        let formattedPeriod = period.toLowerCase().replaceAll(" ", "-");

        switch (formattedPeriod) {
            case "today":
                formattedPeriod = 1;
                break;
            case "this-week":
                formattedPeriod = 7;
                break;
            case "this-month":
                formattedPeriod = 30;
                break;
        }

        //console.log("formattedPeriod", formattedPeriod)

        let url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${formattedPeriod}.json?api-key=${k}`
        const response = await fetch(url);
        //console.log(url)
        const data = await response.json();
        console.log(data)
        const articles = data.results
            .filter(article => article.media && article.media.length > 0)
            .map(article => ({
                id: article.uri,  // or article.url or some unique identifier
                title: article.title,
                abstract: article.abstract,
                thumbnail: article.media[0]["media-metadata"][1].url || 0,
                byline: article.byline.original,
                category: period,
                pub_date: article.published_date,
                url: article.url,
            }))
            .sort(function (b, a) {
                return new Date(a.pub_date) - new Date(b.pub_date);
            });

        //console.log(articles)

        await saveArticles(articles); // your IndexedDB save function
        updateCacheTimestamp("articlesPopularTimestamp");

        return articles;
    } else {
        console.log("Loading articles from cache...");
        const cachedArticles = await getArticlesByCategory(period); // your IndexedDB read function
        //Sort articles, newest first
        cachedArticles.sort(function (b, a) {
            return new Date(a.pub_date) - new Date(b.pub_date);
        })
        return cachedArticles;
    }
}