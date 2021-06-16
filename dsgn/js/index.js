import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"
import Main from "./main.js"
import { Box, gVars } from "./tools.js"
import mouse from "./mouse.js"

const { each } = tools, { add, remove, contains, device } = DOM, { box_height, box, card, btn, link, Div, $event } = Box, { _nav_, _back_, _body_ } = gVars, email = "telmanov2002.at@gmail.com", main = Main.init();

//#region LoadData
fetch("/src/json/index.json")
  .then(x => x.json())
  .then(z => {
    let inx = z.index, core = window.location.origin + inx.corePath, imgs = inx.img, frm = inx.format, set = (i, ...v) => main.__sections__[i].setContent(...v), b_h = box_height;
    // DSGN
    each(imgs, (x, i) => set(0, b_h(box(true, { src: core, name: x.url, format: frm }, { text: x.p, href: x.href }), { gridArea: "x" + i })).reverse(true))
    // WORK
    each(z.work.data, x => set(1, b_h(card().addH2(x.name).addP(x.description).addMore(x.more).self)))
    // SKILLS
    each(z.skills.data, x => set(2, b_h([Div.x("name").setHTML(x.name).self, Div.x("icon").setHTML(x.icon).self])))
    // CALL
    let ls = [Div.x().setHTML("— Socials:").self], ss = [Div.x().setHTML("— Sites:").self]
    each(z.social.data, x => each.obj(x, (y, z) => ls.unshift(link(z, y, "_blank"))))
    each(z.social.site, x => each.obj(x, (y, z) => ss.unshift(link(z, y, "_blank"))))
    set(3, b_h(ls))
    set(3, b_h(ss))
    set(3, b_h(Div.x("email").setHTML("<p>Let's work together. Say Hello.</p><a href=mailto:'" + email + "'>" + email + "</a>").self))
    set(3, b_h())
  })
  .then(() => {
    main.view(_body_); remove(_back_, "active"); $event(_nav_, "click", () => contains(_nav_, "active") ? main.nav_off() : main.nav_on())
    if (!device.isMobile) { main.addScroll(); mouse.start(); mouse.view(); add(mouse.mouse, "invert"); add(mouse.ball, "invert") }
  })
  .catch(err => main.error(console.error(err)))
//#endregion
