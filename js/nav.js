var nav_body = document.getElementById('nav_body')
var nav_in = document.querySelectorAll('.nav_btn')
var btn = document.getElementById('nav')
var current = undefined
var nav_index = undefined

function nav_function(params) {
    if((typeof params)=='string'){
        if(nav_body.classList.contains('active')){
            nav_body.classList.remove('active')
        } else {
            nav_body.classList.add('active')
        }
        nav_in.forEach((item, i)=>{
            if (!(item.classList.contains('hide'))) {
                if (!(item.classList.contains('current'))) {
                    item.classList.add('hide')
                } else {
                    nav_index = i
                }
            } else {
                item.classList.remove('hide')
            }
        })
    }
    if((typeof params)=='number'){
        nav_in.forEach((item, i)=>{
            if(i != params){
                if (!(item.classList.contains('hide'))) {
                    item.classList.add('hide')
                }
                if (item.classList.contains('current')) {
                    nav_index = i
                    item.classList.remove('current')
                }
            } else {
                item.classList.add('current')
                nav_body.classList.remove('active')
            }
        })
    }
}

btn.onclick = () => {
    nav_function('btn')
}
nav_in.forEach((elem, i)=>{
    elem.addEventListener('click',()=>{
        nav_function(i)
    })
})