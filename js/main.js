import { tools, css, Box, globalVariables } from "./tools.js"
import mouseEventAdd from "./mouse.js"
const { $, $all, $id, smooth, contains, add, remove } = css
const { is } = tools
const { section, box_height } = Box
const { __body__, __nav__, __back__, __plane__, __logo__ } = globalVariables

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
            main.__sections__.push(_x_)
        }
        __logo__.addEventListener("click", () => {
            main.firstPage()
        });

        [__logo__, __nav__, __plane__].forEach((_x_) => {
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
    addEventListener(el, eventName, callback, options = {}) {
        el.addEventListener(eventName, callback, options)
    }
    firstPage() {
        let _s_ = Main.Self.__sections__
        _s_.forEach((_x_) => {
            remove(_x_.self, "active")
        })
        add(_s_[0].self, "active")
        smooth(_s_[0].self)
    }
    reAddButtonHover() {
        this.buttons_with_slide = []
        let ELEMENTS = this.buttons_with_slide
        let ELEMENTS_SPAN = []

        ELEMENTS.forEach((target, index) => {
            if (!ELEMENTS_SPAN[index])
                ELEMENTS_SPAN[index] = target.querySelector("span")

            target.addEventListener("mouseover", function (e) {
                ELEMENTS_SPAN[index].style.left = e.pageX - target.offsetLeft + "px"
                ELEMENTS_SPAN[index].style.top = e.pageY - target.offsetTop + "px"

                add(target, animatedClassName)
            })

            target.addEventListener("mouseout", function (e) {
                ELEMENTS_SPAN[index].style.left = e.pageX - target.offsetLeft + "px"
                ELEMENTS_SPAN[index].style.top = e.pageY - target.offsetTop + "px"
            })
        });
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
                add(_x_.self, "fly")
                add(_x_.self, "none")
                add(_x_.self, "small")
                // _s_.style.top = `${(i * 12) + 30}vh`
                // _s_.style.fontSize = "10vh"
            })
        }
    }
    nav_off() {
        let _s_ = this.__sections__
        if (contains(__nav__, "active")) {
            remove(__nav__, "active")
            remove(__back__, "active")
            this.forEach(_s_, (_x_) => {
                remove(_x_.self, "fly")
                remove(_x_.self, "none")
                remove(_x_.self, "small")
                // _s_.style.top = `${(i * 12) + 30}vh`
                // _s_.style.fontSize = "10vh"
            })
        }
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
    }
    //#endregion

}

export default Main