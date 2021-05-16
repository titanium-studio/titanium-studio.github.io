import Main from "./main.js"
import { html, tools, Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { $id, add, remove, contains,Styler } = html,
  { box_height, box, card, btn, link, Div } = Box,
  { isMobile, forEach, forIn, is } = tools,
  { _nav_, _back_, _body_ } = gVars,
  data = localStorage,
  $$ = $id("body"),
  main = Main.init();
let error = false

//#region LoadData
getJSON("/src/json/index.json", (r, z) => {
  if (error = r) return _body_.innerHTML = "<h1 class='center_float half'>Unfortunately this page doesn't work</h1>"

  let core = window.location.origin + z.index.corePath, imgs = z.index.img,
    set = (i, ...v) => { return main.__sections__[i].setContent(...v) },
    b_h = box_height;

  // DSGN
  forEach(imgs, (x, i) => set(0, b_h(box(true, core + x.url, x.p), { gridArea: "x" + i })).reverse(true))

  // WORK
  forEach(z.work.data, x => set(1, b_h(card().addH2(x.name).addP(x.description).addMore(x.more).self)))

  // SKILLS
  forEach(z.skills.data, x => set(2, b_h([Div.x("name").setHTML(x.name).self, Div.x("icon").setHTML(x.icon).self])))

  // CALL
  forEach(z.social.data, x => forIn(x, y => set(3, b_h(btn(link(y, x[y]), true)))))
})
//#endregion

//#region LazyLoad
main.timeOut(() => {
  if (error) return
  main.view($$).event(_nav_, "click", () => contains(_nav_, "active") ? main.nav_off() : main.nav_on())
  remove(_back_, "active")

  if (!isMobile) {
    main.favicon("laptop").addScroll()
    mouse.start()
    mouse.view()
    add(mouse.mouse, "invert")
    add(mouse.ball, "invert")
  } else main.favicon("phone")
}, 1500)
//#endregion

export default main