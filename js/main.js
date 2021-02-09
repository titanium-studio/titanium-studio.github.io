import { tools, css, Box, globalVariables } from "./tools.js"
import mouseEventAdd from "./mouse.js"
const { $, $all, $id, smooth, contains, add, remove } = css
const { is } = tools
const { section, box_height } = Box
const { __body__, __nav__, __back__, __plane__, __logo__, __front__ } = globalVariables

class Main {
    constructor() {
        this.__sections__ = []
        this.buttons_with_slide = []
        this.HeaderElements = {
            __hero__: [],
            __nav__: [],
            __plane__: [],
        }
        this.Background = []


        this.WorkSection_buttons = []
        this.values = {}
        this.percentCircles = []
        Main.Self = this
        return Main.Self
    }

    //#region Static
    static init() {
        let main = new Main()
        let titles = ["DSGN", "WORK", "SKILLS", "CALL"]
        for (let i = 0; i < 4; i++) {
            let _x_ = section(titles[i])
            _x_.setEventTitle(() => {
                main.forEach(main.__sections__, (_s_) => {
                    remove(_s_.self, "active")
                })
                add(_x_.self, "active")
                smooth(_x_.self)
                main.nav_off()
            })
            _x_.title.addEventListener("mouseenter", () => {
                if (contains(_x_.self, "fly")) {
                    mouseEventAdd.mouse.style.width = "var(--size5)"
                    mouseEventAdd.mouse.style.height = "var(--size5)"
                }
            })
            _x_.title.addEventListener("mouseleave", () => {
                mouseEventAdd.mouse.style.width = mouseEventAdd.mouse.style.height = ""
            })
            main.__sections__.push(_x_)
        }
        main.event(window, "resize", main.reSize)
        main.event(__logo__, "click", main.firstPage)
        main.event(__plane__, "click", () => {
            main.scrollTo(4)
        })

            ;[__logo__, __nav__, __plane__].forEach((_x_) => {
                main.btn_hover(_x_)
            })
        main.firstPage()
        return main
    }
    static is = is
    /** @type { Main } */
    static #self
    static set Self(value) {
        if (Main.is.empty(Main.#self) && value instanceof Main) {
            Main.#self = value
        }
    }
    static get Self() {
        return Main.#self
    }
    //#endregion

    //#region Public Functions
    view(_x_) {
        remove(__front__, "hide")
        _x_.innerHTML = ""
        this.forEach(this.__sections__, (s) => {
            _x_.appendChild(s.self)
        })
        return this
    }
    reSize() {
        smooth($(".section.active"))
        return Main.Self
    }
    scrollTo(num) {
        this.forEach(this.__sections__, (_x_, i) => {
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
        el.addEventListener("mouseenter", () => {
            mouseEventAdd.mouse.style.width = "var(--size5)"
            mouseEventAdd.mouse.style.height = "var(--size5)"
        })
        el.addEventListener("mouseleave", () => {
            mouseEventAdd.mouse.style.width = mouseEventAdd.mouse.style.height = ""
        })
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
        _s_.forEach((_x_) => {
            remove(_x_.self, "active")
        })
        add(_s_[0].self, "active")
        smooth(_s_[0].self)
        return this
    }
    addScroll() {
        const idlePeriod = 100
        const animationDuration = 500
        let lastAnimation = 0

        this.event(document, "keypress", (ev) => {
            if (ev.code.slice(0, 5) == "Digit") {
                let i = (+ev.code.slice(5))
                if (i <= 4) {
                    this.scrollTo(i)
                }
            }
        })
        this.event(window, "wheel", (ev) => {
            ev.preventDefault()
            let delta = ev.wheelDelta
            let timeNow = new Date().getTime()
            if (timeNow - lastAnimation < idlePeriod + animationDuration) {
                return
            }

            delta < 0 ? this.nextPage() : this.prevPage()

            lastAnimation = timeNow
        }, { passive: false })

        return this
    }
    changeFavicon(url) {
        let faviconPathCore = "./src/png/"
        $id("favicon").attributes.getNamedItem("href").value = faviconPathCore + url
        return this

    }
    nextPage() {
        let _s_ = this.__sections__
        this.forEach(_s_, (_x_, i) => {
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
        this.forEach(_s_, (_x_, i) => {
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
        if (!contains(__nav__, "active")) {
            add(__nav__, "active")
            add(__back__, "active")
            this.forEach(_s_, (_x_) => {
                add(_x_.self, ["fly", "none", "small"])
            })
        }
        return this
    }
    nav_off() {
        let _s_ = this.__sections__
        if (contains(__nav__, "active")) {
            remove(__nav__, "active")
            remove(__back__, "active")
            this.forEach(_s_, (_x_) => {
                remove(_x_.self, ["fly", "none", "small"])
            })
        }
        return this
    }
    /**
     * @param {any[]} arr
     * @param {( value: any, index: number ) => void } callback
     */
    forEach(arr, callback) {
        for (let i = 0; i < arr.length; i++) {
            let done = callback(arr[i], i)
            if (done == true) {
                return
            }
        }
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
        let self = Main.Self
        setTimeout(callback, time, self)
        return this
    }
    /**
     * @param {( main: Main ) => void } callback -
     */
    endLoading(callback, recursion = 0) {
        let self = Main.Self
        if ($$.readyState !== "loading" && recursion > 0) {
            callback(self)
        } else {
            self.timeOut(() => {
                self.endLoading(callback, ++recursion)
            }, 10)
        }
        return this
    }
    //#endregion
}

export default Main