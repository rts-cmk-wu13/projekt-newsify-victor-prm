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

export function imgWrapper(className) {
    let imgWrap = setElement("figure", {
        class: `${className}__img-wrap`
    })

    return imgWrap;
}

export function sectionTitle(sectionTitle,iconSource) {
    let titleGroup = setElement("hgroup",{
         class: `section-title`
    })
    let categoryIcon = setElement("i", {
        class: iconSource
    })

    let title = setElement("h2").inner(sectionTitle)
    titleGroup.append(categoryIcon, title)

    return titleGroup;
}

export function categoryList() {
    let categoryList = [
        {
            title: "Europe",
            icon: "fas fa-euro",
        },
        {
            title: "Health",
            icon: "fas fa-doctor",
        },
        {
            title: "Sports",
            icon: "fas fa-ball",
        },
        {
            title: "Business",
            icon: "fas fa-chart",
        },
        {
            title: "Travel",
            icon: "far fa-map",
        }
    ]

    return categoryList;
}

export function popularList() {
    let popularList = [
        {
            title: "Today",
            icon: "fas fa-calendar-day",
        },
        {
            title: "This Week",
            icon: "fas fa-calendar-week",
        },
        {
            title: "This Month",
            icon: "fas fa-calendar",
        },
    ]

    return popularList;
}
