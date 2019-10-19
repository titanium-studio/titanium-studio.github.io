//start

var foo = $id('angle')
var fyy = $id('float')
var card_in = $id("card_in")
var card_move = $id("card_move")

foo.addEventListener("mouseover",enter)
foo.addEventListener("mouseleave",out)

function enter() {
  fyy.classList.add('floatIn')
}

function out() {
  fyy.classList.remove('floatIn')
}

foo.onclick=()=>{
  console.log(window);
  let a = window.innerHeight
  window.scrollBy(0,a)
}
card_in.onclick=()=>{
  card_move.classList.add('card_move')
  card_move.classList.remove('delete')
  card_in.classList.remove('in')
  card_in.classList.remove('color_2')
}
