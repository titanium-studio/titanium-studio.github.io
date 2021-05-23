import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"
import Main from "./main.js"
import { Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { each } = tools,
  { add, remove, contains, device } = DOM,
  { box_height, box, card, btn, link, Div, $event } = Box,
  { _nav_, _back_, _body_ } = gVars,
  main = Main.init();

//#region LoadData
fetch("/src/json/index.json")
  .then(x => x.json())
  .then(z => {
    let core = window.location.origin + z.index.corePath, imgs = z.index.img,
      set = (i, ...v) => main.__sections__[i].setContent(...v),
      b_h = box_height;

    // DSGN
    each(imgs, (x, i) => set(0, b_h(box(true, core + x.url, x.p), { gridArea: "x" + i })).reverse(true))

    // WORK
    each(z.work.data, x => set(1, b_h(card().addH2(x.name).addP(x.description).addMore(x.more).self)))

    // SKILLS
    each(z.skills.data, x => set(2, b_h([Div.x("name").setHTML(x.name).self, Div.x("icon").setHTML(x.icon).self])))

    // CALL
    each(z.social.data, x => each.obj(x, (y, z) => set(3, b_h(btn(link(z, y, "_blank"), true)))))
  })
  .then(() => {
    main.view(_body_); remove(_back_, "active")
    $event(_nav_, "click", () => contains(_nav_, "active") ? main.nav_off() : main.nav_on())
    if (!device.isMobile) {
      main.addScroll(); mouse.start(); mouse.view()
      add(mouse.mouse, "invert"); add(mouse.ball, "invert")
    }
  })
  .catch(err => main.error(console.error(err)))
//#endregion

export default main
