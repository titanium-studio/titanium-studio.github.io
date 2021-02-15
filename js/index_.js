import Main from "./main.js"
import { css, tools, Box, globalVariables } from "./tools.js"
import mouseEventAdd from "./mouse.js"
const { $, $all, $id, smooth, add, remove, toggle, contains, Styler } = css
const { box_height, box, card, btn, link, Div } = Box
const { is, isMobile } = tools
const { __body__, __nav__, __back__, __logo__, __plane__ } = globalVariables
const $$ = document.querySelector("#body")

const main = Main.init()

main.timeOut(() => {
    main.view($$)
        .event(__nav__, "click", () => {
            contains(__nav__, "active") ? main.nav_off() : main.nav_on()
        })

    if (isMobile) {
        main.changeFavicon("icons8-iphone-50.png")

        mouseEventAdd.stopAnimate()
    } else {
        main.changeFavicon("icons8-ноутбук-50.png")
            .addScroll()

        mouseEventAdd.view()
        add(mouseEventAdd.mouse, "invert")
        add(mouseEventAdd.ball, "invert")
    }

    getJSON("/src/json/index.json", (err, res) => {
        if (err) throw new Error(err)
        remove(__back__, "hide")

        let core = window.location.origin + res.index.corePath
        let imgs = res.index.img

        // DSGN
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

        // WORK
        for (let i = 0; i < res.work.data.length; i++) {
            let x = res.work.data[i]
            let c = card()
            c.addH2(x.name)
            c.addP(x.description)
            c.addMore(x.more)
            main.__sections__[1].setContent(
                box_height(
                    c.self
                )
            )
        }


        // SKILLS
        for (let i = 0; i < res.skills.data.length; i++) {
            let x = res.skills.data[i]
            let y = Div("icon")
            let z = Div("name")
            y.innerHTML = x.icon
            z.innerHTML = x.name
            main.__sections__[2].setContent(
                box_height(
                    [z, y]
                )
            )
        }

        // CALL
        for (const obj of res.social.data) {
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    main.__sections__[3].setContent(
                        box_height(
                            btn(
                                link(key, obj[key]), true
                            )
                        )
                    )
                }
            }
        }
    })

}, 1500)
export default main
