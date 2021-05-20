import { tools, DOM } from "https://titanuim-studio.github.io/Tools/index.js"
import { Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { each, EXTEND } = tools,
  { search, add, remove, contains, smooth } = DOM,
  { section, $event } = Box,
  { _nav_, _back_, _plane_, _logo_, _front_ } = gVars;

class Main {
  constructor() {
    this.__sections__ = []
    EXTEND.binder(this, proto)
  }

  //#region Static
  static init() {
    let main = new Main()
    each(["DSGN", "WORK", "SKILLS", "CALL"], t => {
      let x = section(t)
      x.setEventTitle(() => {
        each(main.__sections__, s => remove(s.self, "active"))
        add(x.self, "active")
        smooth(x.self)
        main.nav_off()
      })
      $event(x.title, "mouseenter", () => { if (contains(x.self, "fly")) mouse.mouse.style.width = mouse.mouse.style.height = "var(--size5)" })
      $event(x.title, "mouseleave", () => mouse.mouse.style.width = mouse.mouse.style.height = "")
      main.__sections__.push(x)
    })
    $event(window, "resize", main.reSize)
    $event(_logo_, "click", main.firstPage)

    each([_logo_, _nav_, _plane_], x => main.btn_hover(x))
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
    each(this.__sections__, s => x.appendChild(s.self))
    return this
  },
  reSize() {
    smooth(search("section.active"))
    return this
  },
  btn_hover(x) {
    let d = "mouse", m = mouse[d], a = "style", b = "width", c = "height";
    $event(x, d + "enter", () => m[a][b] = m[a][c] = "var(--size5)")
    $event(x, d + "leave", () => m[a][b] = m[a][c] = "")
  },
  firstPage() {
    let s = this.__sections__
    each(s, x => remove(x.self, "active"))
    add(s[0].self, "active")
    smooth(s[0].self)
    return this
  },
  addScroll() {
    let t = 100, aT = 500, lT = 0;

    $event(window, "wheel", e => {
      e.preventDefault()
      let tn = new Date().getTime();
      if (tn - lT < t + aT) return
      e.wheelDelta < 0 ? this.nextPage() : this.prevPage()
      lT = tn
    }, { passive: false })
    return this
  },
  favicon(url) {
    search.id("favicon").attributes.getNamedItem("href").value = "./src/png/" + url + ".png"
    return this
  },
  _(n) { let a = this.__sections__[n].self; add(a, "active"); smooth(a) },
  nextPage() {
    let _ = this._, s = this.__sections__
    each(s, (x, i) => {
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
    each(this.__sections__, (x, i) => {
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
    each(this.__sections__, x => add(x.self, "fly", "none", "small"))
    return this
  },
  nav_off() {
    remove(_nav_, "active")
    remove(_back_, "active")
    each(this.__sections__, x => remove(x.self, "fly", "none", "small"))
    return this
  }
}
//#endregion

export default Main
