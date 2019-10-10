//start
var open = $id("open")
var divBody = $id("divBody")
var footer = $id("footer")
var nav_btn = $id("nav_btn")
var nav_parent = $id("nav_parent")
var navBlock = $id("navBlock")

function openFunc() {
  ready()
  open.classList.add('open_off')
  divBody.classList.remove("open_off")
  footer.classList.add('footer-back')
}
var timerId = setTimeout(openFunc, 0000)

document.addEventListener("DOMContentLoaded", ready)
function ready(){
  window.scrollTo(0,0)
  nav_load()
}

var clicker_nav=false

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
document.onmousewheel=(e)=>{
  e.preventDefault
  nav_load()
  let a = window.innerHeight
  if(e.deltaY>=0){
    window.scrollBy(0, a)
  } else {
    window.scrollBy(0, -a)
  }
}
var foo = $id('angle')
var fyy = $id('float')
foo.addEventListener("mouseover",enter)
foo.addEventListener("mouseleave",out)
function enter() {
  fyy.classList.add('floatIn')
}
function out() {
  fyy.classList.remove('floatIn')
}
foo.onclick=()=>{
  let a = window.innerHeight
  window.scrollBy(0,a)
}

function nav_load(){
  requestAnimationFrame(nav_load)
  if(window.scrollY>=window.innerHeight-200){
    nav_parent.classList.add("nav_scroll")
  } else {
    nav_parent.classList.remove("nav_scroll")
  }
  if(window.scrollY>=window.innerHeight*3-200){
    nav_parent.classList.remove("nav_scroll")
  }
}
function get() {
  console.log(window);
}
