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
            add(__content__[i], "none")
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
            remove(__content__[i], "none")
            title.style.top = ``
            title.style.fontSize = ""
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
    // Cancel scroll if currently animating or within quiet period
    if (timeNow - lastAnimation < idlePeriod + animationDuration) {
        // event.preventDefault()
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
        __sections__.forEach((section, i) => {
            remove(section, "active")
            add(link, "active")
        })
        smooth(link)
    })
}

// Add Event Listener[s]
window.addEventListener("resize", () => { smooth($(".section.active")) })
document.readyState == 'loading' ? document.addEventListener("DOMContentLoaded", setup) : setTimeout(setup, 10)
document.addEventListener("wheel", wheel_target)
__hero__.addEventListener("click", ()=>{ smooth($id("DSGN"))})
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
})

/** For Experiment[s] */
let __target = document.createElement("div")