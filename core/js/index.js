import { is, each, extend, List } from "https://x-titan.github.io/utils/index.js"
import { css, search, styler, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const $g = globalThis
const $ = search
const $d = document
const { body } = $d
const zone = $.id("zone")
const scrollStatus = $.id("scrollStatus")
const openButton = $.id("openButton")
const mouse = $.id("mouse")


const sorry500 = { name: "<h1>Sorry|<code>500</code></h1>" }

const zoneList = []
const scrollStatusList = []
const loadingImages = []

const defaultImage = ""
const scrollStatusActive = "active"
const addEv = "addEventListener"
const newEl = "newElement"
const div = "div"
const child = "appendChild"
const navOpen = "navOpen"
const loading = "loading"

const loadingTime = 2500
const duration = 700
let index = 0
let lastT = 0
const timeNow = Date.now()


function newCard({ name, img, value }, img_source_path) {
  const x = $[newEl](div)
  const n = $[newEl](div)
  const i = new Image()
  const p = $[newEl]("p")

  x.className = "card"
  n.className = "name"

  if (is.str(img)) {
    let z = loadingImages.push(false) - 1
    i.onload = () => loadingImages[z] = true
    i.src = img_source_path + img
  } else i.src = defaultImage

  if (is.str(name) && name !== "")
    x[child](n).innerHTML = name
  if (is.str(value) && value !== "")
    x[child](p).innerHTML = value

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

function removeLoad() {
  if ($d.readyState === "complete" && timeNow + loadingTime < Date.now() && loadingImages.every(image => image)) {
    css.remove(body, loading)
    if (body.hasAttribute(loading)) body.removeAttribute(loading)
  } else setTimeout(removeLoad, 50)
}

fetch("/src/json/index.json")
  .then(x => x.json())
  .then(x => {
    if (is.array(x.data) && is.str(x.img_source_path))
      each(x.data, item => zoneList.push(newCard(item, x.img_source_path)))
  })
  .then(() => {
    if (zoneList.length < 1) zoneList.push(newCard(sorry500))

    each(zoneList, (item, i) => {
      const z = $[newEl](div)
      zone[child](item)
      z.onclick = () => doScrollIndex(i)
      scrollStatusList.push(scrollStatus[child](z))
    })

    $g[addEv]("resize", () => doScrollIndex(index))
    $d[addEv]("DOMContentLoaded", $d.onreadystatechange = removeLoad)

    removeLoad()
    doScrollIndex(0)
  })

function doScroll(deltaY) { doScrollIndex(index + Math.sign(deltaY)) }

openButton.onclick = () => css.toggle(body, navOpen)

zone.onwheel = e => {
  e.preventDefault()
  const currT = Date.now()
  if (lastT + duration < currT) {
    lastT = currT
    doScroll(e.deltaY)
  }
}

// const mstyle = mouse.style
// $g[addEv]("mousemove", e => {
//   mstyle.top = e.clientY + "px"
//   mstyle.left = e.clientX + "px"
// })