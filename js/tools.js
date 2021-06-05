import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"
import m from "./mouse.js"

const { is, each } = tools, { search, add, remove, styler } = DOM, id = search.id, $$ = document;

//#region Event Element[s]
/**
 * @param {Element | HTMLDivElement} x
 * @param {string} ev
 * @param {EventListenerOrEventListenerObject} fn
 * @param {AddEventListenerOptions} opt
 */
const $event = (x, ev, fn, opt) => x.addEventListener(ev, fn, opt);
//#endregion

//#region Doc Create
/** @param {string | string[]} cssClass */
function Div(...cssClass) { let x = $$.createElement("div"); if (is.str(cssClass[0])) add(x, ...cssClass); return x }
Div.x = function (css) { if (is.notClass(this)) return new Div.x(css); let x = this.self = Div(css); this.setClass = z => { add(x, z); return this }; this.setHTML = z => { x.innerHTML = z; return this }; return this }

function section(title = "", content) {
  if (!(this instanceof section)) return new section(title, content)
  let d = this.self = $$.createElement("section"), c = Div("content", "grid"), t = this.title = $$.createElement("h1");
  add(c, "section"); add(t, "title", "notranslate"); d.id = title; t.setAttribute("translate", "no"); t.innerHTML = "<span>" + title.slice(0, title.length - 1) + "</span>" + title[title.length - 1];
  if (Array.isArray(content)) each(content, a => c.appendChild(a)); else if (!is.empty(content)) c.appendChild(content)
  d.appendChild(t); d.appendChild(c); this.setContent = value => { c.appendChild(value); return this }
  this.setEventTitle = fn => $event(t, "click", fn); this.reverse = bool => { bool ? add(c, "reverse") : remove(c, "reverse"); return this }
}
function btn(iHTML, slide = false, css = []) { let x = Div("btn"); x.setAttribute("focusable", "true"); if (css[0]) add(x, ...css); if (slide) addSlide(x); if (iHTML) x.appendChild(iHTML); m.animate(x); return x }
function link(iHTML, href, target) { let a = $$.createElement("a"); if (is.str(href)) a.setAttribute("href", href); if (is.str(iHTML)) a.innerHTML = iHTML; if (is.str(target)) a.setAttribute("target", target); return a }
function box_height(child, style) { let div = Div(); add(div, "box_height"); if (!is.empty(style)) styler(div, style); if (is.array(child)) each(child, c => div.appendChild(c)); else if (!is.empty(child)) div.appendChild(child); return div }
/**
 * @param {boolean} slide
 * @param {Object} a
 * @param {string} a.src
 * @param {string} a.name
 * @param {string} a.format
 * @param {string} iText
 */
function box(slide, { src, name, format }, iText = "") {
  let z = Div("box")
  if (is.str(src)) {
    let x = new Image(); x.src = src + name + "." + format; x.alt = name
    $event(x, "load", () => x.style.setProperty(x.naturalHeight < x.naturalWidth ? "height" : "width", "100%"))
    styler.pro(x, { "top": "50%", "left": "50%", "transform": "translate(-50%,-50%)", "position": "absolute" }); z.appendChild(x)
  }
  if (slide) addSlide(z); if (iText !== "") { let p = $$.createElement("p"); p.innerText = iText; z.appendChild(p) }; return z
}
function card__() {
  if (!(this instanceof card__)) return new card__()
  let div = this.self = Div("card"), b = Div("boxz"), m = btn(null, true, ["more"]); div.appendChild(b); div.appendChild(m)
  this.addH2 = iHTML => { b.innerHTML += "<h2 translate='no' class='notranslate'>" + iHTML + "</h2>"; return this }
  this.addP = iHTML => { b.innerHTML += "<p>" + iHTML + "</p>"; return this }
  this.addMore = href => { m.appendChild(link("More", href)); return this }
}
let m_ = (s, d) => e => { s.style.left = e.pageX - d.offsetLeft + "px"; s.style.top = e.pageY - d.offsetTop + "px" }
/** @param {Element} div */
function addSlide(div) { let s = $$.createElement("span"), m = m_(s, div); add(div, "slide"); div.appendChild(s); $event(div, "mouseover", m); $event(div, "mouseout", m) }
//#endregion

const Box = { card: card__, Div, box_height, box, btn, section, link, $event }, gVars = { _nav_: id("nav"), _body_: id("body"), _back_: id("back"), _plane_: id("plane"), _logo_: id("hero"), _front_: id("front") }

export { Box, gVars }
