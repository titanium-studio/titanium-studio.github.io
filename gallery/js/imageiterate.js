import { tools, DOM } from "https://titanium-studio.github.io/Tools/index.js"

const { is, each, getData } = tools,
  { search, add, remove, styler } = DOM,
  $$ = document;

let src = search.id("src"), imgs = [], h = "hide",
  filter = src => imgs.forEach(x => src == "" ?
    remove(x.x, h) : (x.y.includes(src) ? remove(x.x, h) : add(x.x, h)))

getData("/src/json/gallery.json", (r, d) => {
  if (r) throw new Error(r)
  let a = d.gallery, b = a.data, с = window.location.origin + a.corePath, z = search.id("gallery");
  if (imgs.length % 5 == 0)
    each(b, x => { z.appendChild(imageItem(с, x.src, a.format, x.tags)) })
})

src.addEventListener("input", () => filter(src.value))

function imageItem(path, img, format, alt) {
  let x = $$.createElement("div"), y = new Image();
  imgs.push({ x: x, y: alt })
  styler(x, { width: "100%", aspectRatio: "1/1", overflow: "hidden" })
  add(x, "flex", "to_center")
  y.src = path + img + "." + format
  if (is.array(alt)) y.setAttribute("alt", alt.join(", "))
  y.addEventListener("load", () => {
    y.style[y.width > y.height ? "height" : "width"] = "100%"
    x.appendChild(y)
  }, { once: true })
  y.addEventListener("click", () => open("https://titanium-studio.github.io/src/jpg/" + img + ".jpg","_blank"))
  return x
}
