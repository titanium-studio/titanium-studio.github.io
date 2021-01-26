import Main from "./main.js"
import { css, tools, Box, globalVariables } from "./tools.js"
import mouseEventAdd from "./mouse.js"
const { $, $all, $id, smooth, add, remove, toggle, contains, Styler } = css
const { box_height, box } = Box
const { is, isMobile } = tools
const { __body__, __nav__, __back__, __logo__, __plane__ } = globalVariables
const $$ = document.querySelector("#body")

const main = Main.init()
const idlePeriod = 100
const animationDuration = 500
let lastAnimation = 0
const animatedClassName = "animated"
const ELEMENTS_SPAN = []

function wheel_target(ev) {
    ev.preventDefault()
    var delta = ev.wheelDelta
    var timeNow = new Date().getTime()
    if (timeNow - lastAnimation < idlePeriod + animationDuration) {
        return;
    }

    delta < 0 ? main.nextPage() : main.prevPage()

    lastAnimation = timeNow
}
function nav_btn(ev) {
    contains(__nav__, "active") ? main.nav_off() : main.nav_on()
}

main.timeOut(() => {

    $$.innerHTML = ""
    main.forEach(main.__sections__, (section, i) => {
        $$.appendChild(section.self)
    })
    main.addEventListener(window, "wheel", wheel_target, { passive: false })
    main.addEventListener(__nav__, "click", nav_btn)

    add(mouseEventAdd.mouse, "invert")
    add(mouseEventAdd.ball, "invert")


    getimages("/src/json/index.json", (err, res) => {
        if (err) throw new Error(err)
        let core = window.location.origin + res.index.corePath
        for (let i = 0; i < res.index.img.length; i++) {
            main.__sections__[0]
                .setContent(
                    box_height(
                        box(true,
                            { background: "url(" + core + res.index.img[i] + ")" }
                        ), { gridArea: "x" + i }
                    )
                )
                .reverse(true)
        }
    })

}, 1200)
