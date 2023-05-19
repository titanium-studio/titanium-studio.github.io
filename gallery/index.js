import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, styler, css } from "https://x-titan.github.io/web-utils/index.js"

const g = globalThis
const d = document
const body = d.body
const moreButton = search.id("more")
const view = search.id("view")

function item({ path, file, format, alt = [] }) {
  const div = search.new("div")
  const img = search.new("img")

  img.onload = () => {
    div.appendChild(img)
  }

  img.onclick = () => {
    open(location.origin + "/src/jpg/" + file + ".jpg", "_blank")
  }

  img.src = path + file + "." + format

  return div
}

fetch("/src/json/gallery.json")
  .then((responce) => (responce.json()))
  .then((json) => {
    const core = json.gallery
    const path = location.origin + core.corePath
    const format = core.format
    const data = core.data
    const stack = []
    let clicked = 0
    let temp = []

    each(data, (obj, i) => {
      if (i % 6 === 0 && i !== 0) {
        stack.push(temp)
        temp = []
      }

      temp.push({
        path,
        file: obj.file,
        format: core.format,
        alt: obj.tags
      })
    })

    if (!stack.includes(temp)) stack.push(temp)

    moreButton.onclick = () => {
      if (clicked < stack.length) {
        each(stack[clicked], (obj) => {
          view.appendChild(item(obj))
          if (stack.length - 1 === clicked) css.add(moreButton, "hide")

        })
        clicked++
      } else css.add(moreButton, "hide")

    }
    moreButton.onclick()
    moreButton.onclick()
  })