export function setElement(tag, attributesObj) {
    function setAttributes(el, attrs) {
        Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
    }

    if (typeof tag !== "string") throw new Error("setElement: 'tag' must be a valid string.");
    let newElm = document.createElement(tag);
    if (attributesObj && typeof attributesObj === "object") setAttributes(newElm, attributesObj);

    // Attach a method to set content directly on the created element
    newElm.inner = function (html) {
        if (typeof html !== "undefined") {
            this.innerHTML = String(html); // Convert to string to avoid errors
        }
        return this; // Enables method chaining
    };


    return newElm; // Return the actual element
}

import logoSVG from '../assets/newsify_logo.svg';
export function companyLogo() {
    let logo = setElement("img", {
        class: "company-logo",
        src: logoSVG
    })
    return logo;
}

export function newsList() {
    let newsList = [
        {
            title: "Europe",
            icon: "fas fa-euro",
            url: "http://example.com"
        },
        {
            title: "Health",
            icon: "fas fa-doctor",
            url: "http://example.com"
        },
        {
            title: "Sports",
            icon: "fas fa-ball",
            url: "http://example.com"
        },
        {
            title: "Business",
            icon: "fas fa-chart",
            url: "http://example.com"
        },
        {
            title: "Travel",
            icon: "far fa-map",
            url: "http://example.com"
        }
    ]

    return newsList;
}