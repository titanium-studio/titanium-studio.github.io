// Search Document Element[s]
function $(query) {
    return document.querySelector(query)
}
/**
 * @param {string} id
 */
function $id(id) {
    return document.getElementById(id)
}
/**
 * @param {string} query
 */
function $all(query) {
    return document.querySelectorAll(query)
}
// CSS Function[s]
/**
 * @param { HTMLElement } target
 * @param { string } css
 */
function contains(target, css) {
    return target.classList.contains(css)
}
/**
 * @param { HTMLElement } target
 * @param { string } css
 */
function add(target, css) {
    target.classList.add(css)
}
/**
 * @param { HTMLElement } target
 * @param { string } css
 */
function remove(target, css) {
    target.classList.remove(css)
}
/**
 * @param { HTMLElement } element
 * @param { string } css
 */
function toggle(target, css) {
    var params = [target, css]
    contains(...params) ? remove(...params) : add(...params)
}
// Scroll to "target"
/**
 * @param {HTMLElement} target
 */
function smooth(target) {
    target.scrollIntoView({ behavior: "smooth" })
}

// HTML Element[s]
const __hero__ = $id("hero")
const __body__ = $id("body")
const __front__ = $id("front")
const __back__ = $id("back")
const __nav__ = $id("nav") // Nav Button
const __plane__ = $id("plane")
const __sections__ = $all("section")
const __content__ = $all(".content")
const __titles__ = $all(".title")
const ELEMENTS = $all(".slide")
const BUTTONS = $all(".btn")

// For Function param[s]
const idlePeriod = 100
const animationDuration = 500
let lastAnimation = 0
const animatedClassName = "animated"
const ELEMENTS_SPAN = []

// Function[s]
function prev() {
    for (let i = 0; i < __sections__.length; i++) {
        const section = __sections__[i];
        if (contains(section, "active")) {
            remove(section, "active")
            if (i == 0) {
                add(__sections__[__sections__.length - 1], "active")
                smooth(__sections__[__sections__.length - 1])
            } else {
                add(__sections__[i - 1], "active")
                smooth(__sections__[i - 1])
            }
            return
        }
    }
}
function next() {
    for (let i = 0; i < __sections__.length; i++) {
        const section = __sections__[i];
        if (contains(section, "active")) {
            remove(section, "active")
            if (i == __sections__.length - 1) {
                add(__sections__[0], "active")
                smooth(__sections__[0])
            } else {
                add(__sections__[i + 1], "active")
                smooth(__sections__[i + 1])
            }
            return
        }
    }
}
function nav_on() {
    if (!contains(__nav__, "active")) {
        add(__nav__, "active")
        add(__back__, "active")
        for (let i = 0; i < __titles__.length; i++) {
            const title = __titles__[i]
            add(title, "fly")
            add(__sections__[i], "none")
            title.style.top = `${(i * 12) + 30}vh`
            title.style.fontSize = "10vh"
        }
    }
}
function nav_off() {
    if (contains(__nav__, "active")) {
        remove(__nav__, "active")
        remove(__back__, "active")
        for (let i = 0; i < __titles__.length; i++) {
            const title = __titles__[i]
            remove(title, "fly")
            remove(__sections__[i], "none")
            title.style.top = ``
            title.style.fontSize = ""
            $("#circle").style.width = ""
            $("#circle").style.height = ""
        }
    }
}

//For Event Function[s]
function setup(ev) {
    smooth(__sections__[0])
}
function wheel_target(event) {
    var delta = event.wheelDelta
    var timeNow = new Date().getTime()
    if (timeNow - lastAnimation < idlePeriod + animationDuration) {
        return;
    }

    delta < 0 ? next() : prev()

    lastAnimation = timeNow
}
function nav_view() {
    contains(__nav__, "active") ? nav_off() : nav_on()
}
function plane_function(ev) {
    smooth($id("CALL"))
}
function title_function(target) {
    target.addEventListener("click", function () {
        let link = $id(this.getAttribute("link"))
        nav_off()
        __sections__.forEach((section) => {
            remove(section, "active")
        })
        add(link, "active")
        smooth(link)
    })
    target.addEventListener("mouseenter", () => {
        if (contains(target, "fly")) {
            $("#circle").style.width = "var(--size5)"
            $("#circle").style.height = "var(--size5)"
        }
    })
    target.addEventListener("mouseleave", () => {
        if (contains(target, "fly")) {
            $("#circle").style.width = ""
            $("#circle").style.height = ""
        }
    })
}

// Add Event Listener[s]
window.addEventListener("resize", () => {
    smooth($(".section.active"))
    reDraw()
})
document.readyState == 'loading' ? document.addEventListener("DOMContentLoaded", setup) : setTimeout(setup, 10)
document.addEventListener("wheel", wheel_target)
__hero__.addEventListener("click", () => { smooth($id("DSGN")) })
__nav__.addEventListener("click", nav_view)
__plane__.addEventListener("click", plane_function)
__titles__.forEach(title_function)
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
(() => {
    var xmouse, ymouse;
    document.addEventListener('mousemove', (e) => {
        xmouse = e.clientX || e.pageX;
        ymouse = e.clientY || e.pageY;
    });

    var circle = $('#circle')
    var zx = void 0,
        zy = void 0,
        zdx = void 0,
        zdy = void 0;

    var ball = $('#ball')
    var x = void 0,
        y = void 0,
        dx = void 0,
        dy = void 0;

    var followMouse = function followMouse() {
        requestAnimationFrame(followMouse)

        if (!zx || !zy) {
            zx = xmouse
            zy = ymouse
        } else {
            zdx = (xmouse - zx) * 0.5
            zdy = (ymouse - zy) * 0.5
            if (Math.abs(zdx) + Math.abs(zdy) < 0.1) {
                zx = xmouse
                zy = ymouse
            } else {
                zx += zdx
                zy += zdy
            }
        }

        if (!x || !y) {
            x = xmouse;
            y = ymouse;
        } else {
            dx = (xmouse - x) * 0.125;
            dy = (ymouse - y) * 0.125;
            if (Math.abs(dx) + Math.abs(dy) < 0.1) {
                x = xmouse
                y = ymouse
            } else {
                x += dx
                y += dy
            }
        }
        ball.style.left = x + 'px'
        ball.style.top = y + 'px'

        circle.style.left = zx + 'px'
        circle.style.top = zy + 'px'

    };
    followMouse()
})();
BUTTONS.forEach((target) => {
    target.addEventListener("mouseenter", () => {
        $("#circle").style.width = "var(--size5)"
        $("#circle").style.height = "var(--size5)"
    })
    target.addEventListener("mouseleave", () => {
        $("#circle").style.width = ""
        $("#circle").style.height = ""
    })
});


let circles = $all(".circle")
let opts = {
    size: window.innerWidth / 6,
    radius: window.innerWidth / 18,
    lineWidth: window.innerWidth / 18 / 6,
    /**@type {HTMLCanvasElement[]} */
    listCanvas: [],
    listSpan: []
}
/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {String} color
 * @param {Number} percent_
 */
var drawCircle = function (ctx, color, percent_) {

    percent = Math.min(Math.max(0, percent_ || 1), 1)
    ctx.beginPath()
    ctx.arc(0, 0, opts.radius, 0, Math.PI * 2 * (percent_ / 100), false)
    ctx.strokeStyle = color
    ctx.lineCap = 'round'
    ctx.lineWidth = opts.lineWidth
    ctx.stroke()
    ctx.closePath()
}

circles.forEach((circle, i) => {
    let { listCanvas, listSpan } = opts
    let percent = circle.getAttribute("data-percent") || 0

    listCanvas[i] = document.createElement('canvas')
    listSpan[i] = document.createElement("span")
    listSpan[i].textContent = percent + "%"

    circle.appendChild(listCanvas[i])
    circle.appendChild(listSpan[i])
})
reDraw = () => {
    opts.radius = window.innerWidth / 6 / 3
    opts.size = window.innerWidth / 6
    opts.lineWidth = Math.max(window.innerWidth / 6 / 3 / 6, 5)
    circles.forEach((circle, i) => {
        let { listCanvas, listSpan } = opts
        let percent = circle.getAttribute("data-percent") || 0

        listCanvas[i].width = listCanvas[i].height = opts.size
        let ctx = listCanvas[i].getContext("2d")
        ctx.translate(opts.size / 2, opts.size / 2)
        ctx.rotate(Math.PI * (- 0.5))

        ctx.clearRect(0, 0, opts.size, opts.size)
        drawCircle(ctx, "#efefef", 100)
        drawCircle(ctx, "#555555", percent)
    })
}
reDraw()

/** For Experiment[s] */
let __target = document.createElement("div")




