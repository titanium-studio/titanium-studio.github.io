let imgs = [{ x: new Image, y: [""] }]

getData("/src/json/gallery.json", (r, d) => {
  if (r) throw new Error(r)
  let a = d.gallery, b = a.data, с = window.location.origin + a.corePath, z = $id("gallery");
  forEach(b, x => z.appendChild(imageItem(с, x.src, x.tags)))
})

function filter(query) {
  let r = []
  imgs.forEach(x => x.y.includes(query) ? r.push(x.x) : void 0)
  return r
}

function imageItem(path, img, alt) {
  let x = $$.createElement("div"), y = new Image();
  imgs.push({
    x: x,
    y: alt
  })
  x.setAttributeNode($$.createAttribute("item"))
  add(x, ["flex", "to_center"])
  y.src = path + img
  y.setAttribute("width", "100%")
  if (is.array(alt)) y.setAttribute("alt", alt.join(", "))
  y.addEventListener("load", () => (x.appendChild(y)), { once: true })
  return x
}