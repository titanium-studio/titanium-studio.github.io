import { is, each, extend } from "https://x-titan.github.io/utils/index.js"
import { search, styler, scrollTo, device } from "https://x-titan.github.io/web-utils/index.js"

extend(globalThis, { is, each, extend, search, styler, scrollTo, device })

const _nav_list_ = search.id("nav_list"), $$ = document

/**
 * @param {string} name
 * @param {string} [value]
 */
export function attr(name, value) {
  let x = $$.createAttribute(name)
  is.empty(value) ? void 0 : x.value = value
  return x
}
/**
 * @typedef {{x: number, y: number}} vec_
 * 
 * @param {HTMLDivElement} targe
 * @param {Object} param1
 * @param {vec_} param1.pos
 * @param {vec_} param1.size
 */
export function Block(target, { pos, size }) {
  if (!(target instanceof Element))
    return console.error("TypeError: target is not a HTMLElement")
  if (!target.hasAttribute("block")) target.setAttributeNode(attr("block"))
  styler.pro(target, {
    "--position": `${pos.y}/${pos.x}/${size.y + pos.y}/${size.x + pos.x}`
  })
  return target
}

each(_nav_list_.children,
  a => a.addEventListener("click",
    () => scrollTo(search.id(a.innerText.toLowerCase()))))