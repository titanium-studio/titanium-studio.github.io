// Canvas "close" Function
(function () {
    var canvasBody = document.getElementById("canvas"),
        canvas = canvasBody.getContext("2d"),

        w = canvasBody.width = window.innerWidth, //Full width
        h = canvasBody.height = window.innerHeight, //Full height

        tick = 0, //Tick in time

        //YOU CAN CHANGE OPTIONS HERE. DO NOT REALLY MESS WITH STUFF BELOW THAT
        opts = { //Options, you can change those
            backgroundColor: "#011627",
            particleColor: "#fcfcfc",
            particleAmount: 40,
            defaultSpeed: 0.2,
            addedSpeed: 0.2,

            defaultRadius: 2,
            addedRadius: 2,

            communicationRadius: 150, //The radius for the line
        },
        particles = [],

        Particle = function (Xpos, Ypos) {
            this.x = Xpos ? Xpos : Math.random() * w; //If there is not position stated, it takes a random position
            this.y = Ypos ? Ypos : Math.random() * h; //Same here
            this.speed = opts.defaultSpeed + Math.random() * opts.addedSpeed; //Speed + a bit of random one
            this.directionAngle = Math.floor(Math.random() * 360); //The angle of this particle its moving. !!!! TRUE ONLY ON INIT
            this.color = opts.particleColor;
            this.radius = opts.defaultRadius + Math.random() * opts.addedRadius; //Radius + a bit of random radius
            this.d = { //Object, stores directions. Computes directions according to the random this.directionAngle
                x: Math.cos(this.directionAngle) * this.speed,
                y: Math.sin(this.directionAngle) * this.speed
            };
            this.update = function () { //The update function. The function that calculates next coordinates
                this.border(); //Checks if this particles touches the border and THEN computes the next coordinates
                this.x += this.d.x; //Just adding the direction to the X
                this.y += this.d.y; //Same but with Y
            };
            this.border = function () { //The border function. Checks if this thing touches the border
                if (this.x >= w || this.x <= 0) { //X walls
                    this.d.x *= -1;
                }
                if (this.y >= h || this.y <= 0) { //Floor and ceiling
                    this.d.y *= -1;
                }
                this.x > w ? this.x = w : this.x; //This is really important.
                this.y > h ? this.y = h : this.y; //Same
                this.x < 0 ? this.x = 0 : this.x; //Same
                this.y < 0 ? this.y = 0 : this.y; //Same
                /* line ~49 explanation
                    Because sometimes the speed of the particle can be faster, so it doesn't touch the border - it goes through. And when it goes back it doesn't go all the way inside - it stucks there. So, you have to set the X to the point when it touches. Same with Y
                */

            }
            this.draw = function () { //Just draws the points. Pretty easy. Takes the coords, color, radius - draws.
                canvas.beginPath()
                canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                canvas.closePath()
                canvas.fillStyle = this.color
                canvas.fill()
            }
        },
        checkDistance = function (x1, y1, x2, y2) { //You got it. The point on the graph distance formula.
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        },
        //Here goes the function that makes lines!
        // @param point1 -	The point that check for neighboors
        // @param father - 	The array the point suppose to take thing from
        communicatePoints = function (point1, father) {
            for (var i = 0; i < father.length; i++) {
                var distance = checkDistance(point1.x, point1.y, father[i].x, father[i].y);
                var opacity = 1 - distance / opts.communicationRadius;
                if (opacity > 0) { //Draws the line
                    canvas.lineWidth = opacity;
                    canvas.strokeStyle = "rgba(255,255,255,0.5)"
                    canvas.beginPath()
                    canvas.moveTo(point1.x, point1.y)
                    canvas.lineTo(father[i].x, father[i].y)
                    canvas.closePath()
                    canvas.stroke()
                }
            }
        }

    function setup() { //Function called once to set everything up
        for (var i = 0; i < opts.particleAmount; i++) {
            particles.push(new Particle())
        }
        window.requestAnimationFrame(loop)
    }

    function loop() { //Function of loop that will be called for a frame of the animation
        window.requestAnimationFrame(loop)
        tick++;

        //Drawing the background. Basically clearing the frame that was before
        canvas.fillStyle = opts.backgroundColor
        canvas.fillRect(0, 0, w, h)

        //Executing particle functions
        for (var i = 0; i < particles.length; i++) {
            particles[i].update()
            particles[i].draw()
        }
        //Executing lines
        for (var a = 0; a < particles.length; a++) {
            communicatePoints(particles[a], particles)
        }
    }

    //Executing the animation
    setup()

    //Some event listeners for backup to look professional
    window.addEventListener("resize", function () {
        if (w < window.innerWidth || h < window.innerHeight) {
            // particles.push(new Particle())
        } else {
            // particles.shift()
        }
        w = canvasBody.width = window.innerWidth;
        h = canvasBody.height = window.innerHeight;
    })
})()

// Document Element(s)
const nav = document.getElementById("nav")
const block = document.getElementById("block")
const nav_links = block.children[0].children
const _body_ = document.getElementById("body")
const _footer_ = document.getElementById("footer")

// Need Function(s)
const $toogle = function $toogle(el, cls) {
    if (el.classList.contains(cls)) {
        el.classList.remove(cls)
        // return true
    } else {
        el.classList.add(cls)
        // return false
    }
};
(()=>{
    for (let i = 0; i < nav_links.length-1; i++) {
        const link = nav_links[i];
        link.addEventListener("click",navigation_view)
    }
    nav_links[nav_links.length - 1].addEventListener("click",(ev)=>{
        nav_links[nav_links.length - 1].scrollBy()
        navigation_view(ev)
        console.log("dd")
    })
})()

// Document Event Function(s) need Params
var h = 0 // for [wheel__]
var x = 0 // for [to_up, to_down]
// Document Event Function(s)
function wheel__(ev) {
    // if (ev.deltaY > 0) {
    //     to_down()

    // } else {
    //     to_up()
    // }

    if (h > 1000) {
        h = 0
    }
    DOC.setSpeed(ev.deltaY / 10)
    var g = h + 1
    h++
    setTimeout(() => {
        if (g !== h) {
            return
        } else {
            DOC.setSpeed(0)
        }
    }, 200)
}
function navigation_view(ev) {
    $toogle(block, "view")
    $toogle(_body_, "move")
    $toogle(document.getElementById("top"), "move")
    $toogle(document.getElementById("canvas"), "move")
    $toogle(nav, "close")
}
function to_up(params) {
    if (x == 12 || x > 12) {
        x = 0
        return
    }
    if (_body_.scrollTop == 0) {
        x = 0
        return
    }
    x++
    _body_.scrollTop--
    _body_.scrollTop--
    _body_.scrollTop--
    _body_.scrollTop--
    _body_.scrollTop--
    _body_.scrollTop--
    _body_.scrollTop--
    _body_.scrollTop--

    requestAnimationFrame(to_up)
}
function to_down(params) {
    if (x == 12 || x > 12) {
        x = 0
        return
    }
    x++
    _body_.scrollTop = _body_.scrollTop + (8)
    console.log(x)
    setTimeout(to_down,1000/60)
}

// PageScroll need Params
var speed = 0
var target = _body_
var fps = 60
var targetInterval = setInterval(() => { }, 1000)

// PageScroll
function PageScroll(params) {
    if (this === globalThis) {
        return new PageScroll(params)
    }
}
// PageScroll prototype Function(s)
PageScroll.prototype.setSpeed = function (num = 0) {
    if (num == 0) {
        speed = 0
        return
    }
    speed = num
}
PageScroll.prototype.draw = function draw() {
    if (speed !== 0) {
        if (target.scrollTop < 0) {
            speed = 0
            target.scrollTop = 0
        } else {
            target.scrollTop += speed
        }
    }
    // requestAnimationFrame(draw)
    setTimeout(draw,1000/fps)
}
PageScroll.prototype.stop = function () {
    clearInterval(targetInterval)
}
PageScroll.prototype.start = function () {
    this.draw()
}

// Create new Object(s)
var DOC = new PageScroll()
DOC.start()

// Document Add Event Listener
document.addEventListener("wheel", wheel__)
nav.addEventListener("click", navigation_view)