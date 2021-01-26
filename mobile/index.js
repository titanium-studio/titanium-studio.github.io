getimages("src/json/billboard.json", (err, res) => {
    if (err) throw new Error(err)

    let corePath = res.billboard.corePath
    let listImgs = res.billboard.img[0].aktau
    console.log(listImgs)
    for(let i=0;i<listImgs.length;i++){
        document.querySelector("section").appendChild(card(window.location.origin + corePath + listImgs[i]))
    }
    
})


function card(src) {
    let div = document.createElement("div")
    div.classList.add("card")
    div.innerHTML = "<div style='background:url(" + src + ") no-repeat;background-position: center;'></div>"
    return div
}