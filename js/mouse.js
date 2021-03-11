//#region Mouse Event
const mouseEventAdd = (() => {
  let xmouse, ymouse
  let stopWhile = false

  document.addEventListener('mousemove', (e) => {
    xmouse = e.clientX || e.pageX;
    ymouse = e.clientY || e.pageY;
  });

  let circle = document.createElement("div")
  let zx = void 0,
    zy = void 0,
    zdx = void 0,
    zdy = void 0

  let ball = document.createElement("div")
  let x = void 0,
    y = void 0,
    dx = void 0,
    dy = void 0

  let followMouse = function followMouse() {
    if (stopWhile) {
      return
    }
    requestAnimationFrame(followMouse)

    if (!zx || !zy) {
      zx = xmouse
      zy = ymouse
    } else {
      zdx = (xmouse - zx) * 0.5
      zdy = (ymouse - zy) * 0.5
      if (Math.abs(zdx) + Math.abs(zdy) < 0.1) {
        zx = xmouse
        zy = ymouse
      } else {
        zx += zdx
        zy += zdy
      }
    }

    if (!x || !y) {
      x = xmouse;
      y = ymouse;
    } else {
      dx = (xmouse - x) * 0.125;
      dy = (ymouse - y) * 0.125;
      if (Math.abs(dx) + Math.abs(dy) < 0.1) {
        x = xmouse
        y = ymouse
      } else {
        x += dx
        y += dy
      }
    }
    ball.style.left = x + 'px'
    ball.style.top = y + 'px'

    circle.style.left = zx + 'px'
    circle.style.top = zy + 'px'

  }
  let body = document.querySelector("body")
  circle.id = "mouse"
  ball.id = "ball"
  followMouse()

  return {
    followMouse: followMouse,
    mouse: circle,
    ball: ball,
    stopAnimate: () => {
      stopWhile = true
    },
    view: () => {
      body.appendChild(circle)
      body.appendChild(ball)
    },
    remove: () => {
      body.removeChild(circle)
      body.removeChild(ball)
    }
  }
})();
export default mouseEventAdd