//#region Search Document Element[s]
/**
 * @param { string | "div" } query
 * @returns { Element | HTMLDivElement }
 */
function $(query) {
    return document.querySelector(query)
}
/**
 * @param {string} id
 */
function $id(id) {
    return document.getElementById(id)
}
/**
 * @param {string} query
 */
function $all(query) {
    return document.querySelectorAll(query)
}
//#endregion

//#region CSS Function[s]
/**
 * @param { HTMLElement } target
 * @param { string } css
 */
function contains(target, css) {
    return target.classList.contains(css)
}
/**
 * @param { HTMLElement } target
 * @param { string } css
 */
function add(target, css) {
    target.classList.add(css)
}
/**
 * @param { HTMLElement } target
 * @param { string } css
 */
function remove(target, css) {
    target.classList.remove(css)
}
/**
 * @param { HTMLElement } element
 * @param { string } css
 */
function toggle(target, css) {
    let params = [target, css]
    contains(...params) ? remove(...params) : add(...params)
}
//#endregion

//#region Scroll to "target"
/**
 * @param {HTMLElement} target
 */
function smooth(target) {
    target.scrollIntoView({ behavior: "smooth" })
}
//#endregion

//#region Tools Function[s]
/**
 * @param  {...string } args
 */
const print = function (...args) {
    console.log(...args)
}
const is = {
    empty: (value) => {
        return (value == undefined || value == null)
    },
    mobileCheck: () => {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    },
    mobileAndTabletCheck: () => {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }
}
//#endregion

//#region Doc Create
function Div(cssClass) {
    let x = document.createElement("div")
    if (typeof cssClass == "string") {
        add(x, cssClass)
    } else if (Array.isArray(cssClass)) {
        x.classList.add(...cssClass)
    }
    return x
}

function section(title = "", content) {
    if (!(this instanceof section)) {
        return new section(title, content)
    }

    let div = document.createElement("section")
    let c = Div(["content", "grid"])
    let t = document.createElement("a")
    add(div, "section")
    div.id = title
    add(t, "title")
    add(t, "notranslate")
    t.setAttribute("translate", "no")
    t.innerHTML = "<span>" + title.slice(0, title.length - 1) + "</span>" + title[title.length - 1]
    div.appendChild(t)
    // div.innerHTML = "<a translate='no' onclick='main.toScrool(\"" + title + "\")' class='notranslate title' link=" + title + "><span>" + title.slice(0, title.length - 1) + "</span>" + title[title.length - 1] + "</a>"
    if (Array.isArray(content)) {
        for (let i = 0; i < content.length; i++) {
            c.appendChild(content[i])
        }
    } else if (!is.empty(content)) {
        c.appendChild(content)
    }
    div.appendChild(c)
    this.setContent = (value) => {
        c.appendChild(value)
        return this
    }
    this.setEventTitle = (callback) => {
        t.addEventListener("click", callback)
    }
    /**
     * @param {boolean} bool
     */
    this.reverse = (bool) => {
        if (bool) {
            add(c, "reverse")
        } else {
            remove(c, "reverse")
        }
        return this
    }
    this.self = div
}
function btn(innerHTML = "", withSlide = false) {
    let div = Div("btn")
    withSlide ? addSlide(div) : void 0;
    div.innerHTML = innerHTML
    return div
}

function box_height(child, style) {
    let div = Div()
    div.classList.add("box_height")

    if (child) div.appendChild(child)
    if (style) Styler(div, style)

    return div
}
/**
 * @param { HTMLDivElement } div
 * @param {{ }} style
 */
function Styler(div, style) {
    for (const key in style) {
        if (Object.hasOwnProperty.call(div.style, key)) {
            div.style[key] = style[key]
        }
    }
}
/**
 * @param { boolean } slide
 * @param {{ }} style
 */
function box(slide, style) {
    let div = Div("box")

    if (style) Styler(div, style)
    if (slide) {
        addSlide(div)
    }

    return div
}
function card(innerHTML, style) {
    let div = Div("card")

    if (innerHTML) div.innerHTML = innerHTML
    if (style) Styler(div, style)

    return div
}
function addSlide(div){
    let s = document.createElement("span")
    div.classList.add("slide")
    div.appendChild(s)
    div.addEventListener("mouseover",(e)=>{
        s.style.left = e.pageX - div.offsetLeft + "px"
        s.style.top = e.pageY - div.offsetTop + "px"
        add(div,"animated")
    })
    div.addEventListener("mouseout", function (e) {
        s.style.left = e.pageX - div.offsetLeft + "px"
        s.style.top = e.pageY - div.offsetTop + "px"
    })
}
//#endregion

//#region Tools
const isMobile = is.mobileCheck()
const isMobileAndTablet = is.mobileAndTabletCheck()
//#endregion

const css = {
    $,
    $id,
    $all,
    add,
    remove,
    toggle,
    contains,
    smooth,
    Styler
}
const tools = {
    print,
    is,
    isMobile,
    isMobileAndTablet
}
const Box = {
    card,
    Div,
    box_height,
    box,
    btn,
    section
}
const globalVariables = {
    __nav__: $id("nav"),
    __body__: $id("body"),
    __back__: $id("back"),
    __plane__: $id("plane"),
    __logo__: $id("hero")
}

export { css, Box, tools, globalVariables }