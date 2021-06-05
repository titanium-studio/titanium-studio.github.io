import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"
import { Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { is, each, EXTEND } = tools, { search, add, remove, contains, smooth } = DOM, { section, $event } = Box, { _body_, _nav_, _back_, _plane_, _logo_, _front_ } = gVars, act = "active";

class Main {
  constructor() { this.__sections__ = []; EXTEND.binder(this, proto) }

  //#region Static
  static init() {
    let main = new Main(); each(["DSGN", "WORK", "SKILLS", "CALL"], t => {
      let x = section(t); x.setEventTitle(() => { each(main.__sections__, s => remove(s.self, act)); add(x.self, act); smooth(x.self); main.nav_off() })
      $event(x.title, "mouseenter", () => { if (contains(x.self, "fly")) mouse.mouse.style.width = mouse.mouse.style.height = "var(--size5)" })
      $event(x.title, "mouseleave", () => mouse.mouse.style.width = mouse.mouse.style.height = ""); main.__sections__.push(x)
    })
    $event(window, "resize", main.reSize); $event(_logo_, "click", main.firstPage); each([_logo_, _nav_, _plane_], x => mouse.animate(x)); main.firstPage(); return main
  }
  //#endregion

}

//#region Public Functions
const proto = {
  view(x) { remove(_front_, "hide"); x.innerHTML = ""; each(this.__sections__, s => x.appendChild(s.self)); return this },
  reSize() { smooth(search("section.active")); return this },
  firstPage() { let s = this.__sections__; each(s, x => remove(x.self, act)); add(s[0].self, act); smooth(s[0].self); return this },
  addScroll() {
    let t = 100, aT = 500, lT = 0;
    $event(window, "wheel", e => { e.preventDefault(); let tn = new Date().getTime(); if (tn - lT < t + aT) return; e.wheelDelta < 0 ? this.nextPage() : this.prevPage(); lT = tn }, { passive: false })
    return this
  },
  favicon(url) { search.id("favicon").attributes.getNamedItem("href").value = "./src/png/" + url + ".png"; return this },
  _(n) { let a = this.__sections__[n].self; add(a, act); smooth(a) },
  nextPage() {
    let _ = this._, s = this.__sections__
    each(s, (x, i) => {
      if (contains(x.self, act)) { remove(x.self, act); if (i == s.length - 1) _(0); else _(i + 1); return true }
    })
  },
  prevPage() {
    let _ = this._, s = this.__sections__
    each(this.__sections__, (x, i) => {
      if (contains(x.self, act)) { remove(x.self, act); if (i == 0) _(s.length - 1); else _(i - 1); return true }
    })
  },
  nav_on() {
    add(_nav_, act); add(_back_, act); each(this.__sections__, x => add(x.self, "fly", "none", "small")); return this
  },
  nav_off() {
    remove(_nav_, act); remove(_back_, act); each(this.__sections__, x => remove(x.self, "fly", "none", "small")); return this
  },
  error(msg) { if (!is.str(msg)) msg = "<h1 class='center_float half'>😓Unfortunately this page doesn't work</h1>"; _body_.innerHTML = msg }
}
//#endregion

export default Main
