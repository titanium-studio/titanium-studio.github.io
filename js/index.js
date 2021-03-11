import Main from "./main.js"
import { css, tools, Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { add, remove, contains } = css,
  { box_height, box, card, btn, link, Div } = Box,
  { isMobile, forEach } = tools,
  { _nav_, _back_, _body_ } = gVars,
  $$ = document.querySelector("#body"),
  main = Main.init();

main.timeOut(() => {
  main.view($$).event(_nav_, "click", () => contains(_nav_, "active") ? main.nav_off() : main.nav_on())

  if (isMobile) main.changeFavicon("icons8-iphone-50.png")
  else {
    main.changeFavicon("icons8-ноутбук-50.png").addScroll()
    mouse.followMouse()
    mouse.view()
    add(mouse.mouse, "invert")
    add(mouse.ball, "invert")
  }

  getJSON("/src/json/index.json", (err, res) => {
    if (err) _body_.innerHTML = "<h1 class='center_float half'>Unfortunately this page doesn't work</h1>"
    remove(_back_, "hide")

    let core = window.location.origin + res.index.corePath,
      imgs = res.index.img;

    // DSGN
    forEach(imgs, (x, i) => {
      main.__sections__[0]
        .setContent(
          box_height(
            box(true, { background: "url(" + core + x.url + ")" }, x.p), { gridArea: "x" + i }
          )
        )
        .reverse(true)
    })

    // WORK
    forEach(res.work.data, x => {
      let c = card()
      c.addH2(x.name)
      c.addP(x.description)
      c.addMore(x.more)
      main.__sections__[1].setContent(box_height(c.self))
    })

    // SKILLS
    forEach(res.skills.data, x => {
      let y = Div("icon"),
        z = Div("name");
      y.innerHTML = x.icon
      z.innerHTML = x.name
      main.__sections__[2].setContent(box_height([z, y]))
    })

    // CALL
    for (const obj of res.social.data) {
      for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) main.__sections__[3].setContent(box_height(btn(link(key, obj[key]), true)))
      }
    }
  })

}, 1500)
export default main
