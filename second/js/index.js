import { tools, DOM } from "https://noname-titan.github.io/Tools/index.js"

const { is, each } = tools,
  { search, styler, smooth } = DOM

//#region HTML Element[s]
const _body_ = search.id("body"),
  _nav_ = search.id("nav"),
  _nav_list_ = search.id("nav_list");
//#endregion

/**
 * @param {string} name
 * @param {string} [value]
 */
let attr = (name, value) => {
  let x = document.createAttribute(name)
  is.empty(value) ? void 0 : x.value = value
  return x
}
/**
 * @param {HTMLDivElement} targe
 * @param {Object} param1
 * @param {Object} param1.pos
 * @param {number} param1.pos.x
 * @param {number} param1.pos.y
 * @param {Object} param1.size
 * @param {number} param1.size.x
 * @param {number} param1.size.y
 */
function Block(target, { pos, size }) {
  if (!(target instanceof Element))
    return console.error("TypeError: target is not a HTMLElement")
  if (!target.hasAttribute("block")) target.setAttributeNode(attr("block"))
  styler.pro(target, { "--position": `${pos.y}/${pos.x}/${size.y + pos.y}/${size.x + pos.x}` })
  return target
}


each(_nav_list_.children, a => a.addEventListener("click", () => smooth(search.id(a.innerText.toLowerCase()))))