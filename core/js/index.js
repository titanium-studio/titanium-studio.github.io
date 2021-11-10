import { is, each, extend, List } from "https://x-titan.github.io/utils/index.js"
import { css, search, styler, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const $ = search
const $d = document
const { body } = $d
const zone = $.id("zone")
const scrollStatus = $.id("scrollStatus")
const openButton = $.id("openButton")
const openZone = $d.getElementById("openZone")

const zoneList = []
const scrollStatusList = []
const loadingImages = []
const allImages = []
const openImages = []

let openedZone = false

const defaultImage = ""
const scrollStatusActive = "active"
const newEl = "newElement"
const div = "div"
const child = "appendChild"
const navOpen = "navOpen"
const loading = "loading"

const loadingTime = 500
const duration = 700
let index = 0
let currT = 0
let lastT = 0
const timeNow = Date.now()


function newCard({ name, img, value }, img_source_path) {
  const x = $[newEl](div)
  const n = $[newEl](div)
  const i = new Image()

  x.className = "card"
  n.className = "name"

  if (is.str(img)) {
    let z = loadingImages.push(false) - 1
    i.onload = () => { loadingImages[z] = true }
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


function doOpenImage() {
  fetch("/src/json/open.json")
    .then(x => x.json())
    .then(x => {

    })
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

    globalThis.addEventListener("resize", () => doScrollIndex(index))

    function removeLoad() {
      if (document.readyState === "complete" && timeNow + loadingTime < Date.now() && loadingImages.every(image => image)) {
        css.remove(body, loading)
        if (body.hasAttribute(loading)) body.removeAttribute(loading)
      } else setTimeout(removeLoad, 50)
    }
    document.addEventListener("DOMContentLoaded", removeLoad)
    document.onreadystatechange = removeLoad
    removeLoad()
  })

function doScroll(deltaY) { doScrollIndex(index + Math.sign(deltaY)) }

openButton.onclick = () => css.toggle(body, navOpen)

zone.onwheel = e => {
  e.preventDefault()
  if (lastT + duration < (currT = Date.now())) {
    lastT = currT
    doScroll(e.deltaY)
  }
}

const boxList = $.all(".box", openZone)
openZone.addEventListener("wheel", (e) => {
  // console.log(e)
  // e.preventDefault()
  const { deltaX, deltaY } = e
})