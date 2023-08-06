import { is, each, mixin } from "https://x-titan.github.io/utils/index.js"
import { search, styler, css, attr, isHTML, validHTML } from "https://x-titan.github.io/web-utils/index.js"

const g = globalThis
const d = document
const body = d.body

const defcfg = {
  addImageOnClickMoreButton: 10,
  openImageOnclickImage: true,
}
/**
 * @param {{addImageOnClickMoreButton:number, moreButton:HTMLElement,gallery:HTMLElement,openImageOnclickImage:boolean}} cfg
 */
export function initGallery(cfg) {
  cfg = mixin(defcfg, cfg)

  if (!isHTML(cfg.moreButton)) {
    cfg.moreButton = search.new("button")
  }

  if (!isHTML(cfg.gallery)) {
    cfg.gallery = search.new("div")
  }

  const moreButton = validHTML(cfg.moreButton)
  const gallery = validHTML(cfg.gallery)

  function imageItem({ path, format, obj }) {
    const {
      name = "",
      file = "",
      tags = []
    } = obj

    const div = search.new("div")
    const img = search.new("img")
    const title = search.new("div")

    attr.set(div, "box", "")
    css.add(div, "imageBox")
    attr.add(div, "box")
    attr.set(title, "card", "")
    css.add(title, "imageTitle")

    title.innerHTML = name.replace(",", "<br>")

    styler(img, {
      objectPosition: obj["object-position"] || ""
    })

    img.onload = () => {
      div.appendChild(img)
      div.appendChild(title)
      div.appendChild(itags)
    }

    cfg.openImageOnclickImage
      && (img.onclick = () => {
        open(
          location.origin
          + "/src/jpg/"
          + file
          + ".jpg",
          "_blank"
        )
      })

    if (name !== "") (img.alt = name + "; ")

    img.alt += tags.join(", ")
    img.src = path + file + "." + format

    return div
  }

  return fetch("/src/json/gallery.json")
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
        if (i % cfg.addImageOnClickMoreButton === 0 && i !== 0) {
          stack.push(temp)
          temp = []
        }
        temp.push({ path, format, obj })
      })

      if (!stack.includes(temp)) (stack.push(temp))

      moreButton.onclick = () => {
        if (clicked < stack.length) {
          each(stack[clicked], (obj) => {
            gallery.appendChild(imageItem(obj))
            if (stack.length - 1 === clicked) (css.add(moreButton, "hide"))
          })
          clicked++
        } else (css.add(moreButton, "hide"))

      }
      moreButton.onclick()
    })
}