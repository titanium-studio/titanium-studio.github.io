var nav_body = document.getElementById('nav_body')
var nav_in = document.querySelectorAll('.nav_btn')
var btn = document.getElementById('nav')
var back_span = document.querySelector('.back')
var section = document.querySelectorAll('.name_title');
var visible = document.querySelectorAll('.content')
setTimeout(()=>{
    section.forEach((elem, i)=>{
        elem.onclick = ()=>{
            nav_btn(i)
        }
    })
},500)

function nav_btn(params) {
    if((typeof params)=='string'){
        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
        } else {
            btn.classList.add('active')
        }
        visible.forEach((k) => {
            if(k.classList.contains('none')){
                k.classList.remove('none')
            } else {
                k.classList.add('none')
            } 
        })
        if (nav_body.classList.contains('active') && back_span.classList.contains('active')) {
            nav_body.classList.remove('active')
            back_span.classList.remove('active')
        } else {
            nav_body.classList.add('active')
            back_span.classList.add('active')
        }
        section.forEach((page, i) => {
            if (page.classList.contains('fly')) {
                page.style.top = 25 + 'vh'
                page.classList.remove('fly')
            } else {
                page.classList.add('fly')
                page.style.top = (i * 12) + 30 + 'vh'
            }
        })
    }
    if ((typeof params) == 'number'){
index = params

        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
        }
        if (nav_body.classList.contains('active') && back_span.classList.contains('active')) {
            nav_body.classList.remove('active')
            back_span.classList.remove('active')
        }
        visible.forEach((k) => {
            if (k.classList.contains('none')) {
                k.classList.remove('none')
            }
        })
        section.forEach((page, i) =>{
            if(i == params){
                page.parentElement.scrollIntoView({ behavior: "smooth" });
            }
            if (page.classList.contains('fly')) {
                page.classList.remove('fly')
                page.style.top = 35 + 'vh'
            }
        })
    }
}

btn.onclick = ()=>{
    nav_btn('btn')
}


