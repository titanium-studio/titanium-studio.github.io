let _gallery_ = $id("gallery")

getData("/src/json/gallery.json", (err, data) => {
    if (err) throw new Error(err)
    let corePath = window.location.origin + data.gallery.corePath
    forEach(data.gallery.data, (img) => {
        _gallery_.appendChild(imageItem(corePath + img.src, img.tags))
    })
})

function imageItem(img, alt) {
    if (alt == undefined || alt == null) alt = []
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