let _gallery_ = $id("gallery"),
  IMG_LIST = [];

getData("/src/json/gallery.json", (r, d) => {
  if (r) throw new Error(r)
  let b = d.gallery.data,
    с = window.location.origin + b;
  forEach(b, a => _gallery_.appendChild(imageItem(с + a.src, a.tags)))
})

function imageItem(img, alt) {
  if (is.empty(alt)) alt = []
  let x = $$.createElement("div"),
    y = new Image();
  x.setAttributeNode($$.createAttribute("item"))
  add(x, ["flex", "to_center"])
  y.src = img
  y.setAttribute("width", "100%")
  y.setAttribute("alt", alt.join(", "))
  y.addEventListener("load", () => (x.appendChild(y)), { once: true })
  return x
}