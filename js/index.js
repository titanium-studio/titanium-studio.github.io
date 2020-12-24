//#region Search Document Element[s]
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
//#endregion
//#region CSS Function[s]
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
//#endregion
//#region Scroll to "target"
/**
 * @param {HTMLElement} target
 */
function smooth(target) {
    target.scrollIntoView({ behavior: "smooth" })
}
//#endregion
//#region HTML Elements
const $$ = document
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
const BUTTONS = $all(".btn, #hero")

//#endregion
//#region For Function param[s]
const idlePeriod = 100
const animationDuration = 500
let lastAnimation = 0
const animatedClassName = "animated"
const ELEMENTS_SPAN = []
//#endregion
//#region Function[s]
const print = console.log.bind(globalThis)
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
            $("#mouse").style.width = ""
            $("#mouse").style.height = ""
        }
    }
}
//#endregion
//#region For Event Function[s]
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
    for (let i = 0; i < __sections__.length; i++) {
        const section = __sections__[i];
        if (contains(section, "active")) {
            remove(section, "active")
        }
    }
    add($id("CALL"), "active")
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
            $("#mouse").style.width = "var(--size5)"
            $("#mouse").style.height = "var(--size5)"
        }
    })
    target.addEventListener("mouseleave", () => {
        if (contains(target, "fly")) {
            $("#mouse").style.width = ""
            $("#mouse").style.height = ""
        }
    })
}
//#endregion
//#region Add Event Listener[s]
window.addEventListener("resize", () => {
    smooth($(".section.active"))
    reDraw()
})
$$.readyState == 'loading' ? $$.addEventListener("DOMContentLoaded", setup) : setTimeout(setup, 10)
$$.addEventListener("wheel", wheel_target)
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
    $$.addEventListener('mousemove', (e) => {
        xmouse = e.clientX || e.pageX;
        ymouse = e.clientY || e.pageY;
    });

    var circle = $('#mouse')
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
        $("#mouse").style.width = "var(--size5)"
        $("#mouse").style.height = "var(--size5)"

    })
    target.addEventListener("mouseleave", () => {
        $("#mouse").style.width = ""
        $("#mouse").style.height = ""
    })
});
//#endregion

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

    listCanvas[i] = $$.createElement('canvas')
    listSpan[i] = $$.createElement("span")
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

//#region Experiment[s] Zone
/**For Experiments element */
let __target = $$.createElement("div")

var isMobile, isMobileAndTablet;
const mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    
    isMobile = check
    return check;
};
const mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    isMobileAndTablet = check
    return check;
};
if (mobileCheck()) {
    $id("favicon").remove()
    $$.querySelector("head").innerHTML += '<link id="favicon" rel="shortcut icon" href="./src/png/icons8-iphone-50.png" type="image/png">'

} else {
    $id("favicon").remove()
    $$.querySelector("head").innerHTML += '<link id="favicon" rel="shortcut icon" href="./src/png/icons8-ноутбук-50.png" type="image/png">'
}
//#endregion

setTimeout(() => {
    $$.getElementById("back").classList.remove("hide")
    $$.getElementById("body").classList.remove("hide")
    $$.getElementById("mouse").classList.add("invert")
    $$.getElementById("mouse").classList.remove("loader")
    $$.getElementById("ball").classList.add("invert")
    $$.getElementById("ball").innerHTML = ""
    if (isMobile){
        $id("mouse").style.display = "none"
        $id("ball").style.display = "none"
    }
}, 2500)