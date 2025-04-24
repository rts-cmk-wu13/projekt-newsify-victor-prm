function openDB() {
    return new Promise((resolve, reject) => {
        //The first argument is the database name, and the second argument is the database version.
        const request = indexedDB.open("articlesNYT", 1);

        //Define object stores, The request.onupgradeneeded event is triggered when the version number changes.
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("articles")) {
                const store = db.createObjectStore("articles", { keyPath: "id" });
                store.createIndex("published_date", "published_date", { unique: false });
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

export async function saveArticles(topic, articleArray) {
    const db = await openDB();
    const transaction = db.transaction(topic, "readwrite");
    const store = transaction.objectStore(topic);

    articleArray.forEach(article => {
        store.put(article);  // put() will update if exists, add if new
    });

    return transaction.complete;
}

export async function getAllArticles(topic) {
    const db = await openDB();
    const transaction = db.transaction(topic, "readonly");
    const store = transaction.objectStore(topic);

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