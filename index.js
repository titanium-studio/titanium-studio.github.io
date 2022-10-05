import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, css, scrollTo } from "https://x-titan.github.io/web-utils/index.js"

const g = globalThis
const d = document
const body = d.body

const header = search.id("header")
const content = search.id("body")
const dialog = search.id("dialog")

const pageLenght = 4

let index = 0
const sections = [
  search.id("dsgn"),
  search.id("work"),
  search.id("skills"),
  search.id("contacts")
]

each(search.all(".name"),(name,i)=>{
  name.onclick = ()=>{
    openSection(i)
    css.remove(body,"header_nav_active")
  }

})

let lastScrollTime = 0
const scrollAnimationDuration = 700
content.addEventListener("wheel", (e) => {
  e.preventDefault()
  const currentTime = Date.now()
  if (lastScrollTime + scrollAnimationDuration < currentTime) {
    lastScrollTime = currentTime
    onWheel(index + Math.sign(e.deltaY))
  }
})

function onWheel(newIndex) {
  if (newIndex >= sections.length) {
    newIndex = 0
  }else if (newIndex < 0) {
    newIndex = sections.length - 1
  }
  openSection(newIndex)
}

g.headerOnClick = () => {
  css.toggle(body, "header_nav_active")
}

g.onresize =(e)=>{
  openSection(index)
}

function openSection(targetIndex) {
  if (0 <= targetIndex && targetIndex <= sections.length) {
    scrollTo(sections[index = targetIndex])
  }
}