import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"

const { is, each, getData } = tools,
  { search, add, remove, styler, Div } = DOM,
  $$ = document,
  datalist = search.id("search_list"),
  list = new Set();

let src = search.id("src"), imgs = [], h = "hide",
  filter = src => imgs.forEach(x => src == "" ?
    remove(x.x, h) : (x.y.includes(src.toLowerCase()) ? remove(x.x, h) : add(x.x, h)))

getData("/src/json/gallery.json", (r, d) => {
  if (r) throw new Error(r)
  let a = d.gallery, b = a.data, с = window.location.origin + a.corePath, z = search.id("gallery"),
    aa = [], bb = [], cc = 0, dd = search.id("loadMore");
  each(b, (x, i) => {
    if (i % 5 == 0 && i !== 0) { aa.push(bb); bb = [] }
    bb.push({ c: с, s: x.src, f: a.format, t: x.tags })
  })
  if (!aa.includes(bb)) aa.push(bb)
  dd.onclick = () => {
    if (cc < aa.length) {
      each(aa[cc], x => z.appendChild(imageItem(x.c, x.s, x.f, x.t)))
      if (aa.length - 1 == cc) add(dd, "hide")
      cc++
    } else add(dd, "hide")
  }
  dd.onclick(); dd.onclick()
})

src.addEventListener("input", () => filter(src.value))

function addDataList(opt) {
  if (datalist instanceof HTMLDataListElement) {
    if (is.str(opt)) { let a = $$.createElement("option"); a.value = opt; opt = a }
    if (list.has(opt.value)) return
    list.add(opt.value)
    datalist.appendChild(opt)
  }
}

function imageItem(path, img, format, alt) {
  let x = Div(), y = new Image();
  imgs.push({ x: x, y: alt.map(x => x.toLowerCase()) })
  each(alt, al => addDataList(al))
  styler(x, { width: "100%", aspectRatio: "1/1", overflow: "hidden" })
  add(x, "flex", "to_center")
  y.src = path + img + "." + format
  if (is.array(alt)) y.setAttribute("alt", alt.join(", "))
  y.addEventListener("load", () => {
    y.style[y.width > y.height ? "height" : "width"] = "100%"
    x.appendChild(y)
  }, { once: true })
  y.addEventListener("click", () => open("https://titanium-studio.github.io/src/jpg/" + img + ".jpg", "_blank"))
  return x
}
