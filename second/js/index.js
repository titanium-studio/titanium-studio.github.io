//#region Tools
const EXTEND = (target = {}, proto = {}) => {
    if ("object" == typeof target && "object" == typeof proto) {
        for (let key in proto) {
            if (Object.hasOwnProperty.call(proto, key)) {
                target.prototype[key] = proto[key]
            }
        }
        return true
    } else return false
}
const forEach = (arr, callback) => {
    for (let i = 0; i < arr.length; i++) if (callback(arr[i], i) == true) return
}
/**  @type {( ...args ) => void } */
const print = console.log.bind(globalThis)
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
const add = (target, style) => {
    if (Array.isArray(style)) {
        target.classList.add(...style)
    } else target.classList.add(style)
}
const remove = (target, style) => {
    if (Array.isArray(style)) {
        target.classList.remove(...style)
    } else target.classList.remove(style)
}
/** @returns { boolean } */
const contains = (target, style) => {
    return target.classList.contains(style)
}
const __toggle = (a, b) => {
    contains(a, b) ? remove(a, b) : add(a, b)
}
const toggle = (target, style) => {
    if (Array.isArray(style)) {
        forEach(style, (s) => {
            __toggle(target, s)
        })
    } else __toggle(target, style)
}
//#endregion

//#region UI support
const UI = function () {
    if (globalThis == this || this == undefined || this == null) return new UI(...arguments)
    this.self = this
}
// EXTEND(UI, {})
//#endregion

const _body_ = $id("body")
const _nav_ = $id("nav")
const _nav_li_ = $id("nav_li")
// const _dialog_ = $id("dialog")
// const _img_viewver_ = $$.createElement("img")
let data_img = $all("[data-img]")
let Scrollbar = window.Scrollbar;
let option = {
    damping: 0.10,
    thumbMinSize: 5,
    renderByPixel: true,
    alwaysShowTracks: false,
    continuousScrolling: true,
    plugins: {
        overscroll: {
            effect: 'bounce',
            damping: 0.15,
            maxOverscroll: 80
        }
    }
}
// _img_viewver_.style.height = "70vmin"
// _img_viewver_.addEventListener("click",()=>{
//     _dialog_.open = false
// })
// forEach(data_img,(img)=>{
//     img.addEventListener("click",()=>{
//         _img_viewver_.src = img.getAttribute("data-img")
//         _dialog_.open = true
//         _dialog_.innerHTML = ""
//         _dialog_.appendChild(_img_viewver_)
//     })
// })
Scrollbar.use(OverscrollPlugin)
let s = Scrollbar.init(_body_, option);

forEach(_nav_li_.children, (a) => {
    a.addEventListener("click", () => s.scrollTop = $id(a.innerText.toLowerCase()).offsetTop)
})

setTimeout(() => {
    $all(".scrollbar-track, .scrollbar-thumb").forEach((el) => {
        remove(el, ["scrollbar-track", "scrollbar-thumb"])
    })
}, 100)