import { is, each } from "https://x-titan.github.io/utils/index.js"
import { search, add, remove, styler } from "https://x-titan.github.io/web-utils/index.js"

const $$ = document, dt = search.id("search_list"), tt = new Set(), src = search.id("src"), imgs = [], h = "hide", filter = src => imgs.forEach(x => src == "" ? remove(x.x, h) : (x.y.includes(src.toLowerCase()) ? remove(x.x, h) : add(x.x, h)));

globalThis.imageList = imgs
fetch("/src/json/gallery.json")
  .then(x => x.json())
  .then(d => {
    let a = d.gallery, b = a.data, с = window.location.origin + a.corePath, z = search.id("gallery"), aa = [], bb = [], cc = 0, dd = search.id("loadMore");
    each(b, (x, i) => { if (i % 5 == 0 && i !== 0) { aa.push(bb); bb = [] }; bb.push({ c: с, s: x.src, f: a.format, t: x.tags }) })
    if (!aa.includes(bb)) aa.push(bb)
    dd.onclick = () => {
      src.value = ""; filter("")
      if (cc < aa.length) {
        each(aa[cc], x => z.appendChild(imageItem(x.c, x.s, x.f, x.t)))
        if (aa.length - 1 == cc) add(dd, h)
        cc++
      } else add(dd, h)
    }
    dd.onclick(); dd.onclick()
  })

src.addEventListener("input", () => filter(src.value))

function addDataList(opt) {
  if (dt instanceof HTMLDataListElement) {
    if (is.str(opt)) { let a = $$.createElement("option"); a.value = opt; opt = a }
    if (tt.has(opt.value)) return
    tt.add(opt.value); dt.appendChild(opt)
  }
}

function imageItem(path, img, format, alt = []) {
  let x = $$.createElement("div"), y = new Image(); imgs.push({ x: x, y: alt.map(x => x.toLowerCase()), img })
  each(alt, a => addDataList(a)); styler(x, { width: "100%", aspectRatio: "1/1", overflow: "hidden" })
  add(x, "flex", "to_center"); y.src = path + img + "." + format; y.setAttribute("alt", alt.join(", "))
  y.addEventListener("load", () => { y.style[y.width > y.height ? "height" : "width"] = "100%"; y.style.alignSelf = "center"; x.appendChild(y) }, { once: true })
  y.addEventListener("click", () => open(location.origin + "/src/jpg/" + img + ".jpg", "_blank"))
  return x
}
