import Main from "./main.js"
import { css, tools, Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { add, remove, contains } = css,
  { box_height, box, card, btn, link, Div } = Box,
  { isMobile, forEach, forIn } = tools,
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
    if (err) return _body_.innerHTML = "<h1 class='center_float half'>Unfortunately this page doesn't work</h1>"
    remove(_back_, "hide")

    let core = window.location.origin + res.index.corePath, imgs = res.index.img,
      set = (i, ...value) => { return main.__sections__[i].setContent(...value) },
      b_h = box_height;

    // DSGN
    forEach(imgs, (x, i) => set(0, b_h(box(true, core + x.url, x.p), { gridArea: "x" + i })).reverse(true))

    // WORK
    forEach(res.work.data, x => set(1, b_h(card().addH2(x.name).addP(x.description).addMore(x.more).self)))

    // SKILLS
    forEach(res.skills.data, x => {
      let y = Div("icon"), z = Div("name");
      y.innerHTML = x.icon
      z.innerHTML = x.name
      set(2, b_h([z, y]))
    })

    // CALL
    for (let x of res.social.data) forIn(x, y => set(3, b_h(btn(link(y, x[y]), true))))
  })
}, 1500)
export default main
