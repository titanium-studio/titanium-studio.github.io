import { is, each, extend, List } from "https://x-titan.github.io/utils/index.js"
import { css, search, styler, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const $ = search
const $d = document
const { body } = $d
const zone = $.id("zone")
const scrollStatus = $.id("scrollStatus")
const openButton = $.id("openButton")

const zoneList = []
const scrollStatusList = []

const defaultImage = ""
const scrollStatusActive = "active"
const newEl = "newElement"
const div = "div"
const child = "appendChild"
const navOpen = "navOpen"

const duration = 300
let index = 0
let currT = 0
let lastT = 0


openButton.onclick = () => css.toggle(body, navOpen)


function newCard({ name, img, value }, img_source_path) {
  const x = $[newEl](div)
  const n = $[newEl](div)
  const i = new Image()

  x.className = "card"
  n.className = "name"

  if (is.str(img)) {
    i.src = img_source_path + img
  } else i.src = defaultImage
  x[child](n).innerHTML = name || ""
  x[child](i)
  return x
}

function doScrollIndex(i) {
  if (i >= zoneList.length) i = 0
  else if (i < 0) i = zoneList.length - 1

  scrollTo(zoneList[index = i])
  each(scrollStatusList, x => x.className = "")
  scrollStatusList[index].className = scrollStatusActive
}


fetch("/src/json/index.json")
  .then(x => x.json())
  .then(x => {
    if (is.array(x.data) && is.str(x.img_source_path))
      each(x.data, item => zoneList.push(newCard(item, x.img_source_path)))
  })
  .then(() => {
    if (zoneList.length < 1) {
      zoneList.push(newCard({ name: "<h1>Sorry|<code>500</code></h1>" }))
    }
    each(zoneList, (item, i) => {
      zone[child](item)
      const z = $[newEl](div)
      z.onclick = () => doScrollIndex(i)
      scrollStatusList.push(scrollStatus[child](z))
    })
    doScrollIndex(0)
  })

function doScroll(deltaY) { doScrollIndex(index + Math.sign(deltaY)) }

zone.addEventListener("wheel", e => {
  e.preventDefault()
  if (lastT + duration < (currT = Date.now())) {
    lastT = currT
    doScroll(e.deltaY)
  }
})

globalThis.addEventListener("resize", () => doScrollIndex(index))