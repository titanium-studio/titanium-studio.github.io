//#region Search Document Element[s]
const $$ = document
/**
 * @param { string | "div" } query
 */
const $ = query => $$.querySelector(query),
  $id = id => $$.getElementById(id),
  $all = query => $$.querySelectorAll(query);
/**
 * @param { Element | HTMLDivElement } x
 * @param { string } ev
 * @param { EventListenerOrEventListenerObject } fn
 * @param { AddEventListenerOptions } opt
 */
const $event = (x, ev, fn, opt) => x.addEventListener(ev, fn, opt);
//#endregion

//#region CSS Function[s]
/**
 * @param { HTMLElement } target
 * @param { string | string[] } css
 */
const add = (target, css) => {
  if (is.array(css)) target.classList.add(...css)
  else target.classList.add(css)
},
  remove = (target, css) => {
    if (is.array(css)) target.classList.remove(...css)
    else target.classList.remove(css)
  };

/**
 * @param { HTMLElement } target
 * @param { string } css
 */
const contains = (target, css) => target.classList.contains(css),
  toggle = (target, css) => {
    let p = [target, css]
    contains(...p) ? remove(...p) : add(...p)
  };
//#endregion

//#region Scroll to "target"
/**
 * @param { HTMLElement } target
 */
const smooth = target => target.scrollIntoView({ behavior: "smooth" });
//#endregion

//#region Tools Function[s]
/**
 * @param  { any[] } arr
 * @param  { (item: any, index: number) => void } fn
 */
const forEach = (arr, fn) => { for (let i = 0; i < arr.length; i++) if (fn(arr[i], i) == true) return }
/**
 * @param {{ }} obj
 * @param { (x, y) => void } fn
 */
const forIn = (obj, fn) => { for (let x in obj) if (Object.hasOwnProperty.call(obj, x)) fn(x) }
const is = {
  empty: value => (value == undefined || value == null),
  mobileCheck: () => {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  },
  mobileAndTabletCheck: () => {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  },
  array: value => Array.isArray(value),
  func: value => "function" == typeof value,
  notClass: value => (value == globalThis || value == document || is.empty(value))
}
function getBase64Image(img) {
  let x = $$.createElement("canvas");
  x.width = img.width;
  x.height = img.height;
  x.getContext("2d").drawImage(img, 0, 0)
  return x.toDataURL("image/png")
}
getBase64Image.pro = img => getBase64Image(img).replace(/^data:image\/(png|jpg);base64,/, "")

/**
 * @param {{ }} target
 * @param {{ }} proto
 */
const EXTEND = (target, proto) => forIn(proto, x => {
  let y = proto[x]
  if (is.empty(target[x])) target[x] = (is.func(y) ? y.bind(target) : y)
})

//#endregion

//#region Doc Create
/**
 * @param { string | string[] } cssClass
 */
function Div(cssClass) {
  let x = $$.createElement("div")
  add(x, cssClass)
  return x
}
Div.x = function (css) {
  if (is.notClass(this)) return new Div.x(css)
  let x = Div(css)
  /** @param { string } z */
  this.setClass = z => { toggle(x, z); return this }
  /** @param { string } z */
  this.setHTML = z => { x.innerHTML = z; return this }
  this.self = x
  return this
}

function section(title = "", content) {
  if (!(this instanceof section)) return new section(title, content)
  let d = $$.createElement("section"),
    c = Div(["content", "grid"]),
    t = $$.createElement("a");

  add(c, "section")
  add(t, ["title", "notranslate"])

  d.id = title
  t.setAttribute("translate", "no")
  t.innerHTML = "<span>" + title.slice(0, title.length - 1) + "</span>" + title[title.length - 1];

  if (Array.isArray(content)) forEach(content, a => c.appendChild(a))
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
  cssClass[0] ? add(div, cssClass) : void 0;
  withSlide ? addSlide(div) : void 0;
  innerHTML ? div.appendChild(innerHTML) : void 0;
  return div
}
function link(innerHTML, href) {
  let a = $$.createElement("a")
  href ? a.setAttribute("href", href) : void 0;
  a.innerHTML = innerHTML
  return a
}
function box_height(child, style) {
  let div = Div()
  add(div, "box_height")
  if (!is.empty(style)) Styler(div, style)
  if (is.array(child)) forEach(child, c => div.appendChild(c))
  else if (!is.empty(child)) div.appendChild(child)
  return div
}
/**
 * @param { HTMLDivElement } div
 * @param {{ }} style
 */
const Styler = (div, style) => forIn(style, x => div.style[x] = style[x])
/**
 * @param { HTMLDivElement } div
 * @param {{ }} style
 */
Styler.set = (div, style) => forIn(style, x => div.style.setProperty(x, style[x]))
/**
 * @param { boolean } slide
 */
function box(slide, imgsrc, innerText = "") {
  let z = Div("box")

  if ("string" == typeof imgsrc) {
    let x = new Image(), b = localStorage.getItem(imgsrc.slice(imgsrc.lastIndexOf("/")));

    ; is.empty(b) ? x.src = imgsrc : x.src = b;

    $event(x, "load", () => {
      x.style.setProperty(x.naturalHeight < x.naturalWidth ? "height" : "width", "100%")
      if(is.empty(b))localStorage.setItem(imgsrc.slice(imgsrc.lastIndexOf("/")), getBase64Image(x))
    })

    Styler.set(x, {
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

//#region Device type
const isMobile = is.mobileCheck()
const isMobileAndTablet = is.mobileAndTabletCheck()
//#endregion

const html = {
  $,
  $id,
  $all,
  $event,
  $$,
  add,
  remove,
  toggle,
  contains,
  smooth,
  Styler
}
const tools = {
  print,
  is,
  isMobile,
  isMobileAndTablet,
  forEach,
  forIn,
  EXTEND
}
const Box = {
  card: card__,
  Div,
  box_height,
  box,
  btn,
  section,
  link
}
const gVars = {
  _nav_: $id("nav"),
  _body_: $id("body"),
  _back_: $id("back"),
  _plane_: $id("plane"),
  _logo_: $id("hero"),
  _front_: $id("front")
}

export { html, Box, tools, gVars }