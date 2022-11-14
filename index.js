import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, css, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const g = globalThis
const d = document
const body = d.body

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
  .then(() => {
    body.removeAttribute("loading")
  })
  .then(() => {
    const pages = new Set([
      "studio",
      "gellery",
      "about",
      "projects",
      "contacts"
    ])

    const hash = location.hash || ""

    if (pages.has(hash.replace("#", "").toLowerCase())) {
      scrollTo(search(hash))
    } else {
      location.hash = "#studio"
    }
  })