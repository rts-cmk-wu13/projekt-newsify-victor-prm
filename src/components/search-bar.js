import { setElement } from '../js/utilities';
let tagName = 'search-bar'
class SearchBarComp extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.setClass();
        this.render();
    }

    render() {
        let searchBar = setElement("input",{
            class: "article-search",
            placeholder: "Search news"
        })

        let searchIcon = setElement("i",{
            class: "fas fa-search search-icon"
        })
        this.append(searchBar)
        this.append(searchIcon)
    }

    setClass() {
        this.className = this.getAttribute('class') || tagName
        this._classModifier = this.getAttribute('class-mod')
        if (this._classModifier) {
            this.classList.add(`${this.className}--${this._classModifier}`)
        }
    }
}

customElements.define(tagName, SearchBarComp)
export const SearchBar = tagName;