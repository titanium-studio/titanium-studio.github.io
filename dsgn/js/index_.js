import { is, each } from "https://x-titan.github.io/utils/index.js"
import { css, search, styler } from "https://x-titan.github.io/web-utils/index.js"
const { add, remove, contains, toggle } = css
const byId = "getElementById";
const newEl = "createElement";
const use = "appendChild";
const on = "addEventListener";
const div = "div";
const jsonSource = (pname => {
  if (pname == "" || pname == "/" || pname == "/index" || pname == "/index.html")
    return "dsgn"
  return pname.padStart(1).split(".")[0]
})(location.pathname.toLowerCase())

const g = globalThis;
const d = document;
const b = d.body;

const initNav = () => {
  const nav = d[newEl](div)
  const fill = d[newEl](div)
  const btn = d[newEl]("button")
  const hero = d[newEl](div)
  const act = "navActive"
  const navZone = d[newEl](div)


  nav.id = "nav"
  btn.innerHTML = "<span></span><span></span><span></span>"

  nav[use](fill).className = "full relative"
  nav[use](navZone).id = "navZone"
  fill[use](hero).id = "navHero"
  fill[use](btn).id = "navBtn"
  btn.onclick = () => {
    toggle(b, act)
  }
  return nav
}


const initResize = (app) => {
  const name = "aspectResize", fn = () => {
    const { width, height } = b.getBoundingClientRect()
    if (width < height && !contains(b, name)) add(b, name)
    else if (width > height) remove(b, name)
  }
  fn()
  return fn
}


const initZone = (...content) => {
  const zone = d[newEl](div)
  const full = d[newEl](div)
  const name = d[newEl]("h1")
  const desc = d[newEl]("p")
  const view = d[newEl](div)

  zone.id = "zone"
  name.innerText = jsonSource.toLocaleUpperCase()
  name.className = "notranslate"
  name.translate = false

  zone[use](full).className = "full relative "
  full[use](name).id = "zoneName"
  full[use](desc).id = "zoneDesc"
  full[use](view).id = "view"

  if (content.length > 0) {
    for (const c of content) {
      if (c instanceof HTMLElement)
        view[use](c)
      else if (typeof c == "string")
        view.innerHTML += c
    }
  }

  return zone
}

const newCard = ({ tag = "div", value = "", image = "" }) => {
  const card = d[newEl](tag)
  add(card, "card")
  card.innerHTML = value
  if (image != "") {
    styler(card, {
      backgroundImage: "url(" + image + ")",
      border: "none",
      color: "white"
    })
  }
  return card
}

(() => {
  const app = d[newEl]("div")
  const viewCards = []
  b[use](app).id = "app"

  fetch("/src/json/" + jsonSource + ".json")
    .then(x => x.json())
    .then((x) => {
      if (is.array(x.data)) {
        each(x.data, y => viewCards.push(newCard(y)), false)
      }
    })
    .catch(console.error)
    .finally(() => {
      for (let i = 3 - viewCards.length; i > 0; i--)
        viewCards.unshift("<span></span>")

      app[use](initNav())
      app[use](initZone(...viewCards))
      g[on]("resize", initResize())
    })
})()

