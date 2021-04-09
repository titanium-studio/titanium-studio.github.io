import { html, tools, Box, gVars } from "./tools.js"
import mouse from "./mouse.js"
const { $, $id, $event, smooth, contains, add, remove } = html,
  { forEach, EXTEND } = tools,
  { section } = Box,
  { _nav_, _back_, _plane_, _logo_, _front_ } = gVars;

class Main {
  constructor() {
    this.__sections__ = []
    EXTEND(this, proto)
  }

  //#region Static
  static init() {
    let main = new Main()
    forEach(["DSGN", "WORK", "SKILLS", "CALL"], t => {
      let x = section(t)
      x.setEventTitle(() => {
        forEach(main.__sections__, s => remove(s.self, "active"))
        add(x.self, "active")
        smooth(x.self)
        main.nav_off()
      })
      $event(x.title, "mouseenter", () => { if (contains(x.self, "fly")) mouse.mouse.style.width = mouse.mouse.style.height = "var(--size5)" })
      $event(x.title, "mouseleave", () => mouse.mouse.style.width = mouse.mouse.style.height = "")
      main.__sections__.push(x)
    })
    main.event(window, "resize", main.reSize)
    main.event(_logo_, "click", main.firstPage)

      ;[_logo_, _nav_, _plane_].forEach(x => main.btn_hover(x))
    main.firstPage()
    return main
  }
  //#endregion

}

//#region Public Functions
const proto = {
  view(x) {
    remove(_front_, "hide")
    x.innerHTML = ""
    forEach(this.__sections__, s => x.appendChild(s.self))
    return this
  },
  reSize() {
    smooth($("section.active"))
    return this
  },
  /**
   * @param {HTMLElement} el
   */
  btn_hover(x) {
    let d = "mouse", m = mouse[d], a = "style", b = "width", c = "height";
    $event(x, d + "enter", () => m[a][b] = m[a][c] = "var(--size5)")
    $event(x, d + "leave", () => m[a][b] = m[a][c] = "")
  },
  /**
   * @param { string } eventName
   * @param { () => void } callback
   */
  event(x, eventName, callback, options = {}) {
    $event(x, eventName, callback, options)
    return this
  },
  firstPage() {
    let s = this.__sections__
    s.forEach(x => remove(x.self, "active"))
    add(s[0].self, "active")
    smooth(s[0].self)
    return this
  },
  addScroll() {
    let t = 100, aT = 500, lT = 0;

    this.event(window, "wheel", e => {
      e.preventDefault()
      let tn = new Date().getTime();
      if (tn - lT < t + aT) return
      e.wheelDelta < 0 ? this.nextPage() : this.prevPage()
      lT = tn
    }, { passive: false })
    return this
  },
  changeFavicon(url) {
    $id("favicon").attributes.getNamedItem("href").value = "./src/png/" + url
    return this
  },
  _(n) { let a = this.__sections__[n].self; add(a, "active"); smooth(a) },
  nextPage() {
    let _ = this._, s = this.__sections__
    forEach(s, (x, i) => {
      if (contains(x.self, "active")) {
        remove(x.self, "active")
        if (i == s.length - 1) _(0)
        else _(i + 1)
        return true
      }
    })
  },
  prevPage() {
    let _ = this._, s = this.__sections__
    forEach(this.__sections__, (x, i) => {
      if (contains(x.self, "active")) {
        remove(x.self, "active")
        if (i == 0) _(s.length - 1)
        else _(i - 1)
        return true
      }
    })
  },
  nav_on() {
    add(_nav_, "active")
    add(_back_, "active")
    forEach(this.__sections__, x => add(x.self, ["fly", "none", "small"]))
    return this
  },
  nav_off() {
    remove(_nav_, "active")
    remove(_back_, "active")
    forEach(this.__sections__, x => remove(x.self, ["fly", "none", "small"]))
    return this
  },
  /**
   * @param {( main: Main ) => void } fn
   * @param { number } time
   */
  timeOut(fn, time) {
    setTimeout(fn, time, this)
    return this
  },
  /**
   * @param {( main: Main ) => void } fn
   */
  endLoading(fn, recursion = 0) {
    if ($$.readyState !== "loading" && recursion > 0) fn(this)
    else this.timeOut(() => this.endLoading(fn, ++recursion), 100)
    return this
  }
}
//#endregion

export default Main