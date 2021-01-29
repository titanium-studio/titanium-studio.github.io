import Main from "./main.js"
import { css, tools, Box, globalVariables } from "./tools.js"
import mouseEventAdd from "./mouse.js"
const { $, $all, $id, smooth, add, remove, toggle, contains, Styler } = css
const { box_height, box, card, btn, link } = Box
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
    let delta = ev.wheelDelta
    let timeNow = new Date().getTime()
    if (timeNow - lastAnimation < idlePeriod + animationDuration) {
        return;
    }

    delta < 0 ? main.nextPage() : main.prevPage()

    lastAnimation = timeNow
}
function nav_btn() {
    contains(__nav__, "active") ? main.nav_off() : main.nav_on()
}

main.timeOut(() => {

    $$.innerHTML = ""
    main.forEach(main.__sections__, (section, i) => {
        $$.appendChild(section.self)
    })
    main.addEventListener(window, "wheel", wheel_target, { passive: false })
    main.addEventListener(__nav__, "click", nav_btn)

    let faviconPathCore = "./src/png/"
    if (isMobile) {
        $id("favicon").attributes.getNamedItem("href").value = faviconPathCore + "icons8-iphone-50.png"
    } else {
        $id("favicon").attributes.getNamedItem("href").value = faviconPathCore + "icons8-ноутбук-50.png"
    }

    add(mouseEventAdd.mouse, "invert")
    add(mouseEventAdd.ball, "invert")


    getimages("/src/json/index.json", (err, res) => {
        remove(__back__, "hide")

        if (err) throw new Error(err)
        let core = window.location.origin + res.index.corePath
        let imgs = res.index.img

        for (let i = 0; i < imgs.length; i++) {
            main.__sections__[0]
                .setContent(
                    box_height(
                        box(true,
                            { background: "url(" + core + imgs[i].url + ")" },
                            imgs[i].p
                        ), { gridArea: "x" + i }
                    )
                )
                .reverse(true)
        }

        for (let i = 0; i < res.work.data.length; i++) {
            let c = card()
            c.addH2(res.work.data[i].name)
            c.addP(res.work.data[i].description)
            c.addMore(res.work.data[i].more)
            main.__sections__[1].setContent(
                box_height(
                    c.self
                )
            )
        }

        if (res?.social?.data !== undefined) {
            let data = res.social.data
            for (const obj of data) {
                for (const key in obj) {
                    if (Object.hasOwnProperty.call(obj, key)) {
                        main.__sections__[3].setContent(box_height(btn(link(key, obj[key]), true)))
                    }
                }
            }

        }
    })

}, 1200)
export default main
