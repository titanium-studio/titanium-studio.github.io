import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, css, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const g = globalThis
const d = document
const body = d.body
const list = search.id("list")
const open = search.id("open")

new Promise((res, rej) => {
  const minLoadT = 200
  const updT = 100
  const maxLoadT = 7000
  const startTime = Date.now()
  const update = () => {
    const currT = Date.now()
    if (
      d.readyState === "complete"
      && (startTime + minLoadT) < currT
    ) {
      return res()
    }

    if ((startTime + maxLoadT) < currT) {
      rej()
    }

    setTimeout(update, updT)
  }
  update()
})
  .then(() => (loadImages()))

open.onclick = (e) => {
  e.preventDefault()
  css.toggle(body,"open-active")
}

function ImageCard(path, format, obj, view_card) {
  const div = search.new("div")
  const img = search.new("img")

  css.add(img, "rounded")
  div.setAttribute("card", "")
  img.setAttribute("box", "")

  if (view_card) {
    img.setAttribute("view-card", "")
  }
  img.onload = () => {
    div.appendChild(img)
  }

  img.onclick = () => {
    open(location.origin + "/src/jpg/" + obj.name + ".jpg", "_blank")
  }

  img.src = path + obj.name + "." + format

  return div
}

function loadImages() {
  fetch("/src/json/gallery.json", { method: "get" })
    .then((file) => (file.json()))
    .then((json) => {
      const core = json.gallery
      const path = location.origin + core.corePath
      const format = core.format
      const data = core.data

      each(data, (obj, i) => {
        list.appendChild(ImageCard(path, format, obj, i % 5 === 0))

        if (i % 8 === 0 && i !== 0) {
          return false
        }
      }, { stoppable: true })
    })
}