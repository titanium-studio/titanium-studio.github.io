import { tools, DOM } from "https://noname-titan.github.io/Tools/index.js"
import Main from "./main.js"
import { Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { each, getData } = tools,
  { search, add, remove, contains, styler, device } = DOM,
  { box_height, box, card, btn, link, Div, $event } = Box,
  { _nav_, _back_, _body_ } = gVars,
  $$ = search.id("body"),
  main = Main.init();

let error = false

//#region LoadData
getData("/src/json/index.json", (r, z) => {
  if (error = r) return _body_.innerHTML = "<h1 class='center_float half'>Unfortunately this page doesn't work</h1>"

  let core = window.location.origin + z.index.corePath, imgs = z.index.img,
    set = (i, ...v) => { return main.__sections__[i].setContent(...v) },
    b_h = box_height;

  // DSGN
  each(imgs, (x, i) => set(0, b_h(box(true, core + x.url, x.p), { gridArea: "x" + i })).reverse(true))

  // WORK
  each(z.work.data, x => set(1, b_h(card().addH2(x.name).addP(x.description).addMore(x.more).self)))

  // SKILLS
  each(z.skills.data, x => set(2, b_h([Div.x("name").setHTML(x.name).self, Div.x("icon").setHTML(x.icon).self])))

  // CALL
  each(z.social.data, x => each.obj(x, (y, z) => set(3, b_h(btn(link(z, y,"_blank"), true)))))
})
//#endregion

//#region LazyLoad
setTimeout(() => {
  if (error) return
  main.view($$)
  $event(_nav_, "click", () => contains(_nav_, "active") ? main.nav_off() : main.nav_on())
  remove(_back_, "active")

  if (!device.isMobile) {
    main.favicon("laptop").addScroll()
    mouse.start()
    mouse.view()
    add(mouse.mouse, "invert")
    add(mouse.ball, "invert")
  } else main.favicon("phone")
}, 1000)
//#endregion

export default main