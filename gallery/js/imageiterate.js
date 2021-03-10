let _gallery_ = $id("gallery")
let IMG_LIST = []

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
        y = new Image(),
        z = ["fullscreen", "half"];
    x.setAttributeNode($$.createAttribute("item"))
    add(x, ["flex", "to_center"])
    y.src = img
    y.setAttribute("width", "100%")
    y.setAttribute("alt", alt.join(", "))
    y.addEventListener("load", () => (x.appendChild(y)), { once: true })
    // y.addEventListener("click", () => {
    //     let b = contains(y, z[0])
    //     IMG_LIST.forEach((a) => remove(a, z))
    //     if (!b) add(y, z)
    // })
    IMG_LIST.push(y)
    return x
}