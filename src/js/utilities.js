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

export function sectionTitle(sectionTitle, iconSource) {
    let titleGroup = setElement("hgroup", {
        class: `section-title`
    })
    let categoryIcon = setElement("i", {
        class: iconSource
    })

    let title = setElement("h2").inner(sectionTitle)
    titleGroup.append(categoryIcon, title)

    return titleGroup;
}

export function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
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

export function getSettings(list) {
    return getLS("settingsArray") || new Array(list.length)
}

export function updateCategories(callback) {
    window.addEventListener("storageChanged", () => {
        callback();
    })
}

export function scale(number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

export function getLS(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function setLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function hasSeenSplashScreen() {
    if (getLS("splashScreenShown")) {
        return true
    } else {
        return false
    }
}

export function redirectIfLoggedOut() {
    if (autoLogout(2)) {
        setLS("loggedIn", false)
        window.location.href = "/login"
    }
    if (!getLS("loggedIn") && !getLS("onboardingCompleted")) {
        window.location.href = "/login"
    }
    else if (!getLS("onboardingCompleted")) {
        window.location.href = "/onboarding"
    }
    return;
}

export function redirectIfLoggedIn() {
    if (getLS("loggedIn")) {
        window.location.href = "/"
    }
    return;
}

export function autoLogout(hours) {
    let timeThreshold = 1000 * 60 * 60 * hours;
    let timeSinceLastLogin = Date.now() - getLS("lastLogin")
    if (timeSinceLastLogin > timeThreshold) {
        return true;
    } else {
        return false;
    }
}

let scrollY = 0;

export function lockScroll() {
    scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollY);
}
