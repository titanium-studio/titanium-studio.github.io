const content = document.querySelectorAll('section');
const idlePeriod = 100;
const animationDuration = 500;

let lastAnimation = 0;
let index = 0;


const toggleText = (index, state) => {
    // if (state === 'show') {
    //     content[index].querySelector('.text').classList.add('show');
    // } else {
    //     content[index].querySelector('.text').classList.remove('show');
    // }
}

// toggleText(0, 'show');

function setup(params) {
    content[0].scrollIntoView({ behavior: "smooth" });
    index = 0
}
if (document.readyState == 'loading') {
    // ещё загружается, ждём события
    document.addEventListener('DOMContentLoaded', setup);
} else {
    // DOM готов!
    setup();
}
setTimeout(setup,10)
function prev(){
    if (index < 1) return;
    // toggleText(index, 'hide');
    index--;

    content.forEach((section, i) => {
        if (i === index) {
            // toggleText(i, 'show');
            section.scrollIntoView({ behavior: "smooth" });
        }
    });
}

function next() {
    if (index > content.length) return;
    toggleText(index, 'hide');
    index++;
    content.forEach((section, i) => {
        if (i === index) {
            // toggleText(i, 'show');
            section.scrollIntoView({ behavior: "smooth" });
        }
    })
}

document.addEventListener('wheel', event => {
    var delta = event.wheelDelta;
    var timeNow = new Date().getTime();
    // Cancel scroll if currently animating or within quiet period
    if (timeNow - lastAnimation < idlePeriod + animationDuration) {
        // event.preventDefault();
        return;
    }

    if (delta < 0) {
        next();
    } else {
        prev();
    }

    lastAnimation = timeNow;
}) 