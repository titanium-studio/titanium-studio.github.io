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
const print = console.log.bind(globalThis)
//#endregion

//#region $ Query
const $$ = document
const $ = $$.querySelector.bind($$)
const $all = $$.querySelectorAll.bind($$)
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
Scrollbar.use(OverscrollPlugin)

let s = Scrollbar.init(_body_, option);

setTimeout(() => {
    $all(".scrollbar-track, .scrollbar-thumb").forEach((el) => {
        remove(el,["scrollbar-track", "scrollbar-thumb"])
    })
}, 100)