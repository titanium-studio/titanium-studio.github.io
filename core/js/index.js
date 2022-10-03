import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, css, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const g = globalThis
const d = document
const body = d.body

const headerHTML = `
<div flex="row" header-container>
  <button header-button>
    <div header-icon></div>
  </button>
  <a href="/" button header-button header-hero>
    <div header-icon>
      <img src="https://titanium-studio.github.io/src/svg/hero1.svg" alt="hero">
    </div>
  </a>
  <button onclick="headerOnClick()" header-button header-burger>
    <div header-icon>
      <span></span>
      <span></span>
    </div>
  </button>
</div>`

const navHTML = `
<div>
  <div></div>
</div>`

/** @type {HTMLDivElement} */
const view = search.id("view")
/** @type {HTMLDivElement} */
const dockStatus = search.id("status")
const list = []

function newCard({ name, value, img, href }, img_source_path, index) {
  const card = search.new("a")
  const photo = new Image()
  const button = search.new("button")


  if (is.str(img)) {
    photo.src = img_source_path + img
  }

  if (is.str(href)) {
    card.href = href
  }

  card.classList.add("card","item")
  button.onclick = () => { doScrollIndex(index) }
  card.appendChild(photo)

  return {
    name,
    value,
    index,
    card,
    href,
    button
  }
}


function doScrollIndex() { }


fetch("/src/json/index.json")
  .then((response) => (response.json()))
  .then((json) => {
    if (is.array(json.data) && is.str(json.img_source_path)) {
      const { data, img_source_path } = json

      each(data, (item, index) => {
        const card = newCard(item, img_source_path)
        view.appendChild(card.card)
        dockStatus.appendChild(card.button)
      })
    }
  })


function onload() {
  if (onload.once) { return }

  onload.once++

  // const content = search("#body")
  const header = search.new("header")
  const nav = search.new("div")

  header.id = "header"
  nav.id = "navbox"

  header.innerHTML = headerHTML
  nav.innerHTML = navHTML

  g.headerOnClick = function () {
    css.toggle(body, "header_nav_active")
  }

  body.prepend(header)
  body.append(nav)
}
onload.once = 0

g.addEventListener("DOMContentLoaded", onload)
g.addEventListener("load", onload)