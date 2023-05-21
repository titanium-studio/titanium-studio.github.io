import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, scrollTo, styler, css, attr } from "https://x-titan.github.io/web-utils/index.js"
import { initGallery } from "./gallery/gallery.js"

const g = globalThis
const d = document
const body = d.body
const dockButton = search.id("dockButton") || search.new("button")
const moreButton = search.id("moreButton") || search.new("button")
const searchInput = search.id("searchInput") || search.new("input")
const searchList = search.id("searchList") || search.new("datalist")
const gallery = search.id("gallery") || search.new("div")
const gallerychildren = gallery.children
const tagsSet = new Set(["Aktau", "Almaty", "White", "Red", "Blue"])

initGallery({
  moreButton,
  gallery,
  openImageOnclickImage: false,
  addImageOnClickMoreButton: 4
}).then(() => {

  const animationT = 750
  let galleryIndex = 0
  let lastAnimateT = Date.now()
  console.log(g.CONFIG)

  g.onresize = (e) => (scrollTo(gallerychildren[galleryIndex]))

  dockButton.onclick = (e) => {
    toggle(body, "section_open")
  }

  dockButton.onclick = (e) => {
    toggle(body, "section_open")
  }

  gallery.onwheel = (e) => {
    e.preventDefault()
    const nowT = Date.now()

    if (nowT > lastAnimateT + animationT) {
      lastAnimateT = nowT
    } else {
      return
    }

    if (e.deltaY < 0) {
      if (galleryIndex > 0 && gallerychildren[--galleryIndex]) {
        scrollTo(gallerychildren[galleryIndex])
      } else { galleryIndex = 0 }
    } else if (e.deltaY > 0) {
      if (galleryIndex < gallerychildren.length && gallerychildren[++galleryIndex]) {
        scrollTo(gallerychildren[galleryIndex])
      } else {
        galleryIndex = gallerychildren.length - 1
      }
    }
  }

  function newOption(name) {
    return "<option value='" + name + "'></option>"
  }

  searchInput.oninput = (e) => {

    const value = searchInput.value
    let opts = ""
    tagsSet.forEach((tag) => {
      if (tag.toLowerCase().includes(value.toLowerCase())) {
        console.log(tag)
        opts += newOption(tag)
      }
    })
    searchList.innerHTML = opts
  }
})