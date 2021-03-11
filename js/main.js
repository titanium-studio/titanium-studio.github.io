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
      let _x_ = section(t)
      _x_.setEventTitle(() => {
        main.forEach(main.__sections__, _s_ => remove(_s_.self, "active"))
        add(_x_.self, "active")
        smooth(_x_.self)
        main.nav_off()
      })
      _x_.title.addEventListener("mouseenter", () => {
        if (contains(_x_.self, "fly")) mouse.mouse.style.width = mouse.mouse.style.height = "var(--size5)"
      })
      _x_.title.addEventListener("mouseleave", () => mouse.mouse.style.width = mouse.mouse.style.height = "")
      main.__sections__.push(_x_)
    })
    main.event(window, "resize", main.reSize)
    main.event(_logo_, "click", main.firstPage)

      ;[_logo_, _nav_, _plane_].forEach(_x_ => main.btn_hover(_x_))
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
  view(_x_) {
    remove(_front_, "hide")
    _x_.innerHTML = ""
    this.forEach(this.__sections__, s => _x_.appendChild(s.self))
    return this
  }
  reSize() {
    smooth($(".section.active"))
    return Main.Self
  }
  scrollTo(num) {
    forEach(this.__sections__, (_x_, i) => {
      remove(_x_.self, "active")
      if (num == i + 1) {
        add(_x_.self, "active")
        smooth(_x_.self)
      }
    })
    return this
  }
  /**
   * @param {HTMLElement} el
   */
  btn_hover(el) {
    el.addEventListener("mouseenter", () => mouse.mouse.style.width = mouse.mouse.style.height = "var(--size5)")
    el.addEventListener("mouseleave", () => mouse.mouse.style.width = mouse.mouse.style.height = "")
  }
  /**
   * @param { string } eventName
   * @param { () => void } callback
   */
  event(el, eventName, callback, options = {}) {
    el.addEventListener(eventName, callback, options)
    return this
  }
  firstPage() {
    let _s_ = Main.Self.__sections__
    _s_.forEach(_x_ => remove(_x_.self, "active"))
    add(_s_[0].self, "active")
    smooth(_s_[0].self)
    return this
  }
  addScroll() {
    let idlePeriod = 100,
      animationDuration = 500,
      lastAnimation = 0;

    this.event(document, "keypress", e => {
      if (e.code.slice(0, 5) == "Digit") {
        let i = (+e.code.slice(5))
        if (i <= 4) this.scrollTo(i)
      }
    })
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
  nextPage() {
    let _s_ = this.__sections__
    forEach(_s_, (_x_, i) => {
      if (contains(_x_.self, "active")) {
        remove(_x_.self, "active")
        if (i == _s_.length - 1) {
          add(_s_[0].self, "active")
          smooth(_s_[0].self)
        } else {
          add(_s_[i + 1].self, "active")
          smooth(_s_[i + 1].self)
        }
        return true
      }
    })
    return false
  }
  prevPage() {
    let _s_ = this.__sections__
    forEach(_s_, (_x_, i) => {
      if (contains(_x_.self, "active")) {
        remove(_x_.self, "active")
        if (i == 0) {
          add(_s_[_s_.length - 1].self, "active")
          smooth(_s_[_s_.length - 1].self)
        } else {
          add(_s_[i - 1].self, "active")
          smooth(_s_[i - 1].self)
        }
        return true
      }
    })
    return false
  }
  nav_on() {
    let _s_ = this.__sections__
    add(_nav_, "active")
    add(_back_, "active")
    forEach(_s_, _x_ => add(_x_.self, ["fly", "none", "small"]))
    return this
  }
  nav_off() {
    let _s_ = this.__sections__
    remove(_nav_, "active")
    remove(_back_, "active")
    forEach(_s_, _x_ => remove(_x_.self, ["fly", "none", "small"]))
    return this
  }
  reDrawAllPercentCircle() {

  }
  drawPecrentCircle(ctx, color, percent_) {
    percent = Math.min(Math.max(0, percent_ || 1), 1)
    ctx.beginPath()
    ctx.arc(0, 0, opts.radius, 0, Math.PI * 2 * (percent_ / 100), false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineWidth = opts.lineWidth
    ctx.stroke()
    ctx.closePath()
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