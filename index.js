const g = globalThis
const d = document
const body = d.body
const moreButton = document.getElementById("more") || document.createElement("button")
const slide = document.getElementById("slide")

function item({ path, format, obj }) {
  const {
    name = "",
    file = "",
    tags = []
  } = obj
  console.log(tags)
  const div = document.createElement("div")
  const img = document.createElement("img")
  const h2 = document.createElement("h2")

  div.setAttribute("box", "")
  div.setAttribute("flex", "")
  h2.setAttribute("card", "")
  h2.innerHTML = name.replace(",", "<br>")
  img.style.objectPosition = obj["object-position"] || ""
  img.onload = () => {
    div.appendChild(h2)
    div.appendChild(img)
  }

  // img.onclick = () => {
  //   open(location.origin + "/src/jpg/" + file + ".jpg", "_blank")
  // }

  if (name !== "") (img.alt = name + "; ")

  img.alt += tags.join(", ")
  img.src = path + file + "." + format

  return div
}

fetch("/src/json/gallery.json")
  .then((responce) => (responce.json()))
  .then((json) => {
    const core = json.gallery
    const path = location.origin + core.corePath
    const format = core.format
    const data = core.data
    const stack = []
    let clicked = 0
    let temp = []
    data.forEach((obj, i) => {
      if (i % 4 === 0 && i !== 0) {
        stack.push(temp)
        temp = []
      }
      temp.push({ path, format, obj })
    })

    if (!stack.includes(temp)) stack.push(temp)

    function scrollIntoView(target) {
      target.scrollIntoView({ behavior: 'smooth' })
      return target
    }

    const dock_open = document.getElementById("dock_open")
    const slidechildren = slide.children
    const inputs = document.querySelector("input")

    const animationT = 750
    let slideIndex = 0
    let lastAnimateT = Date.now()

    globalThis.onresize = (e) => {
      scrollIntoView(slidechildren[slideIndex])
    }

    dock_open.onclick = (e) => {
      document.body.classList.toggle("section_open")
    }

    slide.onwheel = (e) => {
      e.preventDefault()
      const nowT = Date.now()

      if (nowT > lastAnimateT + animationT) {
        lastAnimateT = nowT
      } else {
        return
      }

      if (e.deltaY < 0) {
        if (slideIndex > 0 && slidechildren[--slideIndex]) {
          scrollIntoView(slidechildren[slideIndex])
        } else { slideIndex = 0 }
      } else if (e.deltaY > 0) {
        if (slideIndex < slidechildren.length && slidechildren[++slideIndex]) {
          scrollIntoView(slidechildren[slideIndex])
        } else {
          slideIndex = slidechildren.length - 1
        }
      }
    }

    moreButton.onclick = () => {
      if (clicked < stack.length) {

        stack[clicked].forEach((obj) => {
          slide.appendChild(item(obj))
          if (stack.length - 1 === clicked) moreButton.classList.add("hide")
        })

        clicked++
      } else moreButton.classList.add("hide")

    }
    moreButton.onclick()
  })

