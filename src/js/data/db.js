function openDB() {
    return new Promise((resolve, reject) => {
        //The first argument is the database name, and the second argument is the database version.
        const request = indexedDB.open("articlesNYT", 2);

        //Define object stores, The request.onupgradeneeded event is triggered when the version number changes.
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            // Add article store
            if (!db.objectStoreNames.contains("articles")) {
                const articleStore = db.createObjectStore("articles", { keyPath: "id" });
                articleStore.createIndex("published_date", "published_date", { unique: false });
                articleStore.createIndex("category", "category", { unique: false });
            }

            // Now add favorites store
            if (!db.objectStoreNames.contains("favorites")) {
                db.createObjectStore("favorites", { keyPath: "id" });
            }
        };

        // On success
        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        // On error
        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

export async function saveArticles(articleArray) {
    const db = await openDB();
    const transaction = db.transaction("articles", "readwrite");
    const store = transaction.objectStore("articles");

    articleArray.forEach(article => {
        store.put(article);  // put() will update if exists, add if new
    });

    return transaction.complete;
}

export async function getArticlesByCategory(category) {
    const db = await openDB();
    const transaction = db.transaction("articles", "readwrite");
    const store = transaction.objectStore("articles");
    const index = store.index("category");

    return new Promise((resolve, reject) => {
        let monthInMillis = 31 * 24 * 60 * 60 * 1000;
        let indexThreshold = 20

        const request = index.getAll(category);
        request.onsuccess = () => {
            let articleArray = (request.result)

            //Check if articles are older than a week
            articleArray.forEach((article, index) => {
                let articleDateInMillis = Math.floor(new Date(article.pub_date).getTime())
                if ((Date.now() - articleDateInMillis > monthInMillis) || index >= indexThreshold) {
                    console.log("Article is old and will be deleted")
                    store.delete(article.id);
                }

            });
            resolve(articleArray);
        }
        request.onerror = () => reject(request.error);
    });
}

export async function getAllArticles() {
    const db = await openDB();
    const transaction = db.transaction("articles", "readonly");
    const store = transaction.objectStore("articles");

    return new Promise((resolve, reject) => {
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = () => {
            reject(request.error);
        };
    });
}

export async function favoriteArticle(id) {
    const db = await openDB();
    const transaction = db.transaction(["favorites"], "readwrite");
    const store = transaction.objectStore("favorites");
    store.put({ id, favoritedAt: new Date().toISOString() });
    return transaction.complete;
}

export async function unfavoriteArticle(id) {
    const db = await openDB();
    const transaction = db.transaction(["favorites"], "readwrite");
    const store = transaction.objectStore("favorites");
    store.delete(id);
    return transaction.complete;
}

export async function isArticleFavorited(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(["favorites"], "readonly");
        const store = transaction.objectStore("favorites");
        const request = store.get(id);

        request.onsuccess = () => resolve(!!request.result);
        request.onerror = () => reject(request.error);
    });
}


