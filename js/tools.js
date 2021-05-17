const { is, each } = tools,
  { search, add, remove, styler } = DOM,
  s = search,
  $$ = document

//#region Event Element[s]
/**
 * @param { Element | HTMLDivElement } x
 * @param { string } ev
 * @param { EventListenerOrEventListenerObject } fn
 * @param { AddEventListenerOptions } opt
 */
const $event = (x, ev, fn, opt) => x.addEventListener(ev, fn, opt);
//#endregion

//#region Doc Create
/**
 * @param { string | string[] } cssClass
 */
function Div(...cssClass) {
  let x = $$.createElement("div")
  if (is.str(cssClass[0])) add(x, ...cssClass)
  return x
}
Div.x = function (css) {
  if (is.notClass(this)) return new Div.x(css)
  let x = Div(css)
  /** @param { string } z */
  this.setClass = z => { add(x, z); return this }
  /** @param { string } z */
  this.setHTML = z => { x.innerHTML = z; return this }
  this.self = x
  return this
}

function section(title = "", content) {
  if (!(this instanceof section)) return new section(title, content)
  let d = $$.createElement("section"),
    c = Div("content", "grid"),
    t = $$.createElement("a");

  add(c, "section")
  add(t, "title", "notranslate")

  d.id = title
  t.setAttribute("translate", "no")
  t.innerHTML = "<span>" + title.slice(0, title.length - 1) + "</span>" + title[title.length - 1];

  if (Array.isArray(content)) each(content, a => c.appendChild(a))
  else if (!is.empty(content)) c.appendChild(content)

  d.appendChild(t)
  d.appendChild(c)
  this.setContent = value => { c.appendChild(value); return this }
  this.setEventTitle = fn => $event(t, "click", fn);
  this.reverse = bool => { bool ? add(c, "reverse") : remove(c, "reverse"); return this }
  this.self = d
  this.title = t
}
function btn(innerHTML, withSlide = false, cssClass = []) {
  let div = Div("btn")
  div.setAttribute("focusable", "true")
  cssClass[0] ? add(div, ...cssClass) : void 0;
  withSlide ? addSlide(div) : void 0;
  innerHTML ? div.appendChild(innerHTML) : void 0;
  return div
}
function link(innerHTML, href) {
  let a = $$.createElement("a")
  is.str(href) ? a.setAttribute("href", href) : void 0;
  is.str(innerHTML) ? a.innerHTML = innerHTML : void 0;
  return a
}
function box_height(child, style) {
  let div = Div()
  add(div, "box_height")
  if (!is.empty(style)) styler(div, style)
  if (is.array(child)) each(child, c => div.appendChild(c))
  else if (!is.empty(child)) div.appendChild(child)
  return div
}
/**
 * @param { boolean } slide
 */
function box(slide, imgsrc, innerText = "") {
  let z = Div("box")

  if (is.str(imgsrc)) {
    let x = new Image()
    x.src = imgsrc

    $event(x, "load", () => x.style.setProperty(x.naturalHeight < x.naturalWidth ? "height" : "width", "100%"))

    styler.pro(x, {
      "top": "50%", "left": "50%",
      "transform": "translate(-50%,-50%)",
      "position": "absolute"
    })
    z.appendChild(x)
  }
  if (slide) addSlide(z)
  if (innerText !== "") {
    let a = $$.createElement("a")
    a.innerText = innerText
    z.appendChild(a)
  }
  return z
}
function card__() {
  if (!(this instanceof card__)) return new card__()
  let div = Div("card"),
    b = Div("boxz"),
    m = btn(null, true, ["more"]);

  div.appendChild(b)
  div.appendChild(m)

  this.addH2 = iHTML => { b.innerHTML += "<h3 translate='no' class='notranslate'>" + iHTML + "</h3>"; return this }
  this.addP = iHTML => { b.innerHTML += "<p>" + iHTML + "</p>"; return this }
  this.addMore = href => { m.appendChild(link("More", href)); return this }
  this.self = div
}
/**
 * @param {Element} div 
 */
function addSlide(div) {
  let s = $$.createElement("span")

  add(div, "slide")
  div.appendChild(s)

  $event(div, "mouseover", e => {
    s.style.left = e.pageX - div.offsetLeft + "px"
    s.style.top = e.pageY - div.offsetTop + "px"
  })
  $event(div, "mouseout", e => {
    s.style.left = e.pageX - div.offsetLeft + "px"
    s.style.top = e.pageY - div.offsetTop + "px"
  })
}
//#endregion

const Box = {
  card: card__,
  Div,
  box_height,
  box,
  btn,
  section,
  link,
  $event
}
const gVars = {
  _nav_: s.id("nav"),
  _body_: s.id("body"),
  _back_: s.id("back"),
  _plane_: s.id("plane"),
  _logo_: s.id("hero"),
  _front_: s.id("front")
}

export { Box, gVars }