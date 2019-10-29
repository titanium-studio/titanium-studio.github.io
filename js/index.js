//start

function $id(id) {
  let result = document.getElementById(id)
  return result
}

var open = $id("open")
var divBody = $id("divBody")
var footer = $id("footer")
var nav_btn = $id("nav_btn")
var nav_parent = $id("nav_parent")
var navBlock = $id("navBlock")
var body_origin = $id("body_origin")
var next = $id("next")
var clicker_nav=false

function get() {
  console.log(window);
}


nav_btn.onclick=()=>{
  clicker_nav_function()
}
var a1 = $id("a1").onclick=()=>{clicker_nav_function()}
var a2 = $id("a2").onclick=()=>{clicker_nav_function()}
var a3 = $id("a3").onclick=()=>{clicker_nav_function()}
var a4 = $id("a4").onclick=()=>{clicker_nav_function()}

function clicker_nav_function() {
  if(clicker_nav){
    navBlock.classList.remove('nav_go')
    clicker_nav=false
    nav_parent.classList.remove("white_nav")
  } else {
    navBlock.classList.add('nav_go')
    clicker_nav=true
    nav_parent.classList.add("white_nav")
  }
}

function openFunc() {
  let list = document.getElementsByClassName('content')
  ready()
  nav_load()
  open.classList.add('open_off')
  divBody.classList.remove("open_off")
  list[1].classList.add("current")
}

var timerId = setTimeout(openFunc, 0000)

document.addEventListener("DOMContentLoaded", ready)
function ready(){
  window.scrollTo(0,0)
  nav_load()
}

document.onmousewheel=(e)=>{
  e.preventDefault
  nav_load()
  let a = window.innerHeight
  let b = window.innerWidth / 3
  if(window.innerWidth>=1100){
    for(let i=0; i<e.path.length; i++){
      if(e.path[i]==next){
        if(e.deltaY>=0){
          next.scrollBy(b, 0)
        } else {
          next.scrollBy(-b, 0)
        }
        return null;
      }
    }
  }
  let list = document.getElementsByClassName('content')
  if(e.deltaY>=0){
    window.scrollBy(0, a)
  } else {
    window.scrollBy(0, -a)
  }
}

function nav_load(){
  requestAnimationFrame(nav_load)
  if(window.scrollY>=window.innerHeight-100){
    nav_parent.classList.add("nav_scroll")
  } else {
    nav_parent.classList.remove("nav_scroll")
  }
  if(window.scrollY>=window.innerHeight*2-100){
    nav_parent.classList.remove("nav_scroll")
  }
}


































// end code
