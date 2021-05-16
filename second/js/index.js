//#region Tools
const is = {
  empty: value => (value == undefined || value == null),
  array: Array.isArray,
  obj: value => "object" == typeof value
},
  EXTEND = (target = {}, proto = {}) => {
    if (is.obj(target) && is.obj(proto)) {
      for (let key in proto) if (Object.hasOwnProperty.call(proto, key)) target.prototype[key] = proto[key]
      return true
    } else return false
  };
/**
 * @param { any[] } arr
 * @param { (item: any, index: n) => (void | true) } fn
 */
function forEach(arr, fn) { for (let i = 0; i < arr.length; i++) if (fn(arr[i], i) == true) return }
const smooth = target => target.scrollIntoView({ behavior: "smooth" });
//#endregion

//#region $ Query
const $$ = document
/** @type { () => HTMLDivElement | HTMLElement | Element } */
const $ = $$.querySelector.bind($$)
/** @type { () => HTMLDivElement[] | HTMLElement[] | Element[] } */
const $all = $$.querySelectorAll.bind($$)
/** @type { () => HTMLDivElement | HTMLElement | Element } */
const $id = $$.getElementById.bind($$)
//#endregion

//#region Style
const add = (target, style) => is.array(style) ? target.classList.add(...style) : target.classList.add(style),
  remove = (target, style) => is.array(style) ? target.classList.remove(...style) : target.classList.remove(style),
  /** @returns { boolean } */
  contains = (target, style) => target.classList.contains(style),
  __toggle = (a, b) => contains(a, b) ? remove(a, b) : add(a, b),
  toggle = (target, style) => is.array(style) ? forEach(style, s => __toggle(target, s)) : __toggle(target, style);
//#endregion

//#region UI support
// const UI = function () {
//   if (globalThis == this || is.empty(this)) return new UI(...arguments)
//   this.self = this
// }
// EXTEND(UI, {})
//#endregion

//#region HTML Element[s]
const _body_ = $id("body"),
  _nav_ = $id("nav"),
  _nav_list_ = $id("nav_list");
//#endregion

//#region ScrollBar
// let sb = window.Scrollbar,
//   st = "scrollbar-t",
//   s_t = [st + "rack", st + "humb"];
// sb.use(OverscrollPlugin)
// let s = sb.init(_body_, {
//   damping: 0.10,
//   thumbMinSize: 5,
//   renderByPixel: true,
//   alwaysShowTracks: false,
//   continuousScrolling: true,
//   plugins: {
//     overscroll: {
//       effect: 'bounce',
//       damping: 0.15,
//       maxOverscroll: 80
//     }
//   }
// }),
//   ScrollTo = query => s.scrollIntoView($(query))

// forEach(_nav_list_.children, a => a.addEventListener("click", () => ScrollTo("#" + a.innerText.toLowerCase())))
// setTimeout(() => $all(s_t.join(", ").replaceAll("s", ".s")).forEach(h => remove(h, s_t)), 100)
//#endregion

// #TODO: USE
/**
 * @param {docElement} target 
 * @param {CSSStyleDeclaration} css
 */
let styler = (target, css) => each.obj(css, (x, y) => target.style[y] = x)
/**
 * @param {docElement} target 
 * @param {CSSStyleDeclaration} css
 */
styler.pro = (target, css) => each.obj(css,
  (x, y) => target.style.setProperty(y, x));

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


forEach(_nav_list_.children, a => a.addEventListener("click", () => smooth($id(a.innerText.toLowerCase()))))