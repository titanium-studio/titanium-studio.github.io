
var click1=0, click2=0;

var $ = document.querySelector.bind(document);
var $on = document.addEventListener.bind(document);
var footerElements =document.getElementById('footer');
var navBtn = document.getElementById('navBtn');
var navBox = document.getElementById('navBox');

var fC = document.getElementById('fC');
var fB = document.getElementById('fB');
var fG = document.getElementById('fG');
var bigFooter = document.getElementById('bigFooter');
var fooBack = document.getElementById('fooBack');
var letsGo = document.getElementById('letsGo');

var btn1 = document.getElementById('homeBtn');
var btn2 = document.getElementById('workBtn');
var btn3 = document.getElementById('cakeBtn');
var btn4 = document.getElementById('teamBtn');

var content = document.getElementById('content');
var first = document.getElementById('first');
var second = document.getElementById('second');

var xmouse, ymouse;
var ball = $('#ball');
var x = void 0,
y = void 0,
dx = void 0,
dy = void 0,
tx = 0,
ty = 0,
key = -1;

function btn1Func(){
  content.classList.add('cont1');
  content.classList.remove('cont2');
  content.classList.remove('cont3');
  content.classList.remove('cont4');
}
function btn2Func(){
  content.classList.add('cont2');
  content.classList.remove('cont1');
  content.classList.remove('cont3');
  content.classList.remove('cont4');
}
function btn3Func(){
  content.classList.add('cont3');
  content.classList.remove('cont1');
  content.classList.remove('cont2');
  content.classList.remove('cont4');
}
function btn4Func(){
  content.classList.add('cont4');
  content.classList.remove('cont1');
  content.classList.remove('cont2');
  content.classList.remove('cont3');
}
document.onmousedown = ()=>{
  ball.classList.add('ballClick')
}
document.onmouseup = ()=>{
  ball.classList.remove('ballClick')
}
document.onmousemove = ()=>{
  document.getElementsByTagName('body')[0].insertAdjacentHTML('beforeEnd', '</div><div id="minBall"></div>');
  var ball = document.getElementById('minBall');
  ball.style.position = 'fixed';

  document.onmousemove = (event)=>{
    minBall.style.left = event.clientX +'px';
    minBall.style.top = event.clientY +'px';
  }
}
$on('mousemove', function (e) {
  xmouse = e.clientX || e.pageX;
  ymouse = e.clientY || e.pageY;
})

var followMouse = function followMouse() {
  key = requestAnimationFrame(followMouse);

  if(!x || !y) {
    x = xmouse;
    y = ymouse;
  } else {
    dx = (xmouse - x) * 0.125;
    dy = (ymouse - y) * 0.125;
    if(Math.abs(dx) + Math.abs(dy) < 0.1) {
      x = xmouse;
      y = ymouse;
    } else {
      x += dx;
      y += dy;
    }
  }
  ball.style.left = x + 'px';
  ball.style.top = y + 'px';
};
document.getElementById('navBtn').onclick = ()=>{
  if(click2 == 0){
    navBox.classList.add('block');
    click2++;
  }else{
    navBox.classList.remove('block');
    click2--;
  }
}
fC.onclick = ()=>{
  if(click1 == 0){
    footerElements.classList.add('footerClick');
    fooBack.classList.add('onFoo');
    fB.classList.add('fB');
    fG.classList.add('fB');
    click1++;
  }else{
    footerElements.classList.remove('footerClick');
    fooBack.classList.remove('onFoo');
    fB.classList.remove('fB');
    fG.classList.remove('fB');
    click1--;
  }
}
fB.onclick = ()=>{
  if(content.classList.contains('cont1')==true){
    btn2Func()
  }else if(content.classList.contains('cont2')==true){
    btn3Func()
  }else if(content.classList.contains('cont3')==true){
    btn4Func()
  }else{
    btn1Func()
  }
}
fB.onmouseover = ()=>{
  fB.classList.add('fbOn');
}
fB.onmouseout = ()=>{
  fB.classList.remove('fbOn');
}
fG.onclick = ()=>{
  console.log('read');
}
letsGo.onclick = ()=>{
  let style = "top:-100vh";
  btn2Func();
}
btn1.onclick = ()=>{
  btn1Func();
}
btn2.onclick = ()=>{
  btn2Func();
}
btn3.onclick = ()=>{
  btn3Func();
}
btn4.onclick = ()=>{
  btn4Func();
}
window.onscroll = function(e) {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  console.log(e);
}
function openFunc() {
  open.classList.remove('openOn');
}
var timerId = setTimeout(openFunc, 5000)
