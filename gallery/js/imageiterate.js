let src = $id("src"), imgs = [], z = "hide", filter = src => imgs.forEach(x => src == "" ? remove(x.x, z) : (x.y.includes(src) ? remove(x.x, z) : add(x.x, z)))

getData("/src/json/gallery.json", (r, d) => {
  if (r) throw new Error(r)
  let a = d.gallery, b = a.data, с = window.location.origin + a.corePath, z = $id("gallery");
  forEach(b, x => z.appendChild(imageItem(с, x.src + "." + a.format, x.tags)))
})

src.addEventListener("input", () => filter(src.value))

function imageItem(path, img, alt) {
  let x = $$.createElement("div"), y = new Image();
  imgs.push({ x: x, y: alt })
  x.setAttributeNode($$.createAttribute("item"))
  add(x, ["flex", "to_center"])
  y.src = path + img
  y.setAttribute("width", "100%")
  if (is.array(alt)) y.setAttribute("alt", alt.join(", "))
  y.addEventListener("load", () => (x.appendChild(y)), { once: true })
  return x
}