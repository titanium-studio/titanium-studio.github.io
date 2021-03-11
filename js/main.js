import { tools, css, Box, gVars } from "./tools.js"
import mouse from "./mouse.js"
const { $, $id, smooth, contains, add, remove } = css
const { is, forEach } = tools
const { section } = Box
const { _nav_, _back_, _plane_, _logo_, _front_ } = gVars

class Main {
  constructor() {
    this.__sections__ = []
    this.HeaderElements = {
      __hero__: [],
      _nav_: [],
      _plane_: [],
    }
    this.Background = []
    this.WorkSection_buttons = []
    this.values = {}
    this.percentCircles = []
    Main.Self = this
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
      x.title.addEventListener("mouseenter", () => { if (contains(x.self, "fly")) mouse.mouse.style.width = mouse.mouse.style.height = "var(--size5)" })
      x.title.addEventListener("mouseleave", () => mouse.mouse.style.width = mouse.mouse.style.height = "")
      main.__sections__.push(x)
    })
    main.event(window, "resize", main.reSize)
    main.event(_logo_, "click", main.firstPage)

      ;[_logo_, _nav_, _plane_].forEach(x => main.btn_hover(x))
    main.firstPage()
    return main
  }
  static is = is
  /** @type { Main } */
  static #self
  static set Self(value) { if (Main.is.empty(Main.#self) && value instanceof Main) Main.#self = value }
  static get Self() { return Main.#self }
  //#endregion

  //#region Public Functions
  view(x) {
    remove(_front_, "hide")
    x.innerHTML = ""
    forEach(this.__sections__, s => x.appendChild(s.self))
    return this
  }
  reSize() {
    smooth($("section.active"))
    return Main.Self
  }
  /**
   * @param {HTMLElement} el
   */
  btn_hover(x) {
    let d = "mouse", m = mouse[d], a = "style", b = "width", c = "height";
    x.addEventListener(d + "enter", () => m[a][b] = m[a][c] = "var(--size5)")
    x.addEventListener(d + "leave", () => m[a][b] = m[a][c] = "")
  }
  /**
   * @param { string } eventName
   * @param { () => void } callback
   */
  event(x, eventName, callback, options = {}) {
    x.addEventListener(eventName, callback, options)
    return this
  }
  firstPage() {
    let s = Main.Self.__sections__
    s.forEach(x => remove(x.self, "active"))
    add(s[0].self, "active")
    smooth(s[0].self)
    return this
  }
  addScroll() {
    let idlePeriod = 100,
      animationDuration = 500,
      lastAnimation = 0;

    this.event(window, "wheel", e => {
      e.preventDefault()
      let delta = e.wheelDelta, timeNow = new Date().getTime();
      if (timeNow - lastAnimation < idlePeriod + animationDuration) return
      delta < 0 ? this.nextPage() : this.prevPage()
      lastAnimation = timeNow
    }, { passive: false })
    return this
  }
  changeFavicon(url) {
    $id("favicon").attributes.getNamedItem("href").value = "./src/png/" + url
    return this
  }
  #x(n) { let a = Main.Self.__sections__[n].self; add(a, "active"); smooth(a) }
  nextPage() {
    let a = this.#x, s = this.__sections__
    forEach(s, (x, i) => {
      if (contains(x.self, "active")) {
        remove(x.self, "active")
        if (i == s.length - 1) a(0)
        else a(i + 1)
        return true
      }
    })
  }
  prevPage() {
    let a = this.#x, s = this.__sections__
    forEach(this.__sections__, (x, i) => {
      if (contains(x.self, "active")) {
        remove(x.self, "active")
        if (i == 0) a(s.length - 1)
        else a(i - 1)
        return true
      }
    })
  }
  nav_on() {
    add(_nav_, "active")
    add(_back_, "active")
    forEach(this.__sections__, x => add(x.self, ["fly", "none", "small"]))
    return this
  }
  nav_off() {
    remove(_nav_, "active")
    remove(_back_, "active")
    forEach(this.__sections__, x => remove(x.self, ["fly", "none", "small"]))
    return this
  }
  /**
   * @param {( main: Main ) => void } callback
   * @param { number } time
   */
  timeOut(callback, time) {
    let s = Main.Self
    setTimeout(callback, time, s)
    return this
  }
  /**
   * @param {( main: Main ) => void } callback -
   */
  endLoading(callback, recursion = 0) {
    let s = Main.Self
    if ($$.readyState !== "loading" && recursion > 0) callback(s)
    else s.timeOut(() => s.endLoading(callback, ++recursion), 10)
    return this
  }
  //#endregion
}

export default Main