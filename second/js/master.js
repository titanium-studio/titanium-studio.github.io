function Main(device, work) {
    /**
     * @typedef { Element } self
     * @typedef { Element } query
     */
    /**
     * @typedef { string } style
     */



    /**
     * @param { string } name 
     * @param { string[] } style 
     */
    function createElement(name, style) {
        var a = document.createElement(name)
        var c = document.createAttribute("class")
        c.value = style[0]
        style.forEach((x, i) => {
            if (i !== 0) {
                c.value += (" " + x)
            }
        })
        a.setAttributeNode(c)
        return a
    }
    /**
     * @param  { ...Struct } blocks
     * @returns { Struct[] }
     */
    function push(...blocks) {
        var a = []
        blocks.forEach((x, i) => {
            a[i] = x.push()
        })
        return a
    }
    /**
     * @param { string } query 
     * @param { any } html 
     */
    function view(query, html) {
        document.querySelector(query).appendChild(html)
    }
    class Struct {
        static manager = {
            list: new Array()
        }
        /**
         * @param {{
         *      name?: string,
         *      type?: string,
         *      style?: string[]
         * }} [params] 
         */
        constructor({ name = "div", type = "default", style = ["wrapper"] }) {
            this.name = name
            this.type = type
            this.style = style
            this.children = true
            this.list = new Array()
            this.html = this.init(name, type, style)
        }
        init(name, type, style) {
            switch (type) {
                case "default":
                    this.children = true
                    break
                case "text":
                    this.children = false
                default:
                    break
            }
            Struct.manager.push(this)
            return createElement(name, style)
        }
        /**
         * @param { HTMLElement[] | Struct[] } params 
         */
        child(params) {
            console.log(params)
            if (!this.children) {
                console.log("exit: " + this.html)
                return
            }
            if (Array.isArray(params)) {
                params.forEach((x, i) => {
                    this.html.appendChild(params[i].html)
                    this.list.push(params[i])
                })
            } else if (params.html !== undefined) {
                this.html.appendChild(params.html)
                this.list.push(params)
            } else if (typeof params == "object") {
                params.forEach((x, i) => {
                    this.html.appendChild(params[i].html)
                    this.list.push(params[i])
                })
            }
        }
        clear() {
            this.html.innerHTML = ""
            this.list = new Array()
        }
        push() {
            return this
        }
        text(str) {
            if (this.children) {
                return
            }
            this.html.innerHTML = str
        }
        update() {
            if (!this.children) {
                return
            }
            this.html.innerHTML = ""
            console.log(this.list)
            this.list.forEach((x, i) => {
                if (x.html !== undefined) {
                    this.html.appendChild(x.html)
                } else {
                    this.html.appendChild(x)
                }
            })
        }
        view(query) {
            document.querySelector(query).appendChild(this.html)
        }
    }
    const UI = function UI(query) {
        if (this === globalThis) {
            return new UI(query)
        }
        if (!(globalThis === window && window && document)) {
            return { query: query }
        }
        // this.self = []
        this.self = (Array.isArray(query)) ? query : document.querySelectorAll(query)
    }
    UI.prototype.view = view
    UI.prototype.push = push
    UI.on = (self, event, callback) => {
        self.addEventListener(event, callback, false)
    }
    /**
     * @param { string } queryAll
     */
    UI.prototype.all = (queryAll) => {
        return new UI(document.querySelectorAll(queryAll))
    }
    /**
     * @param { string } ev
     * @param { ( event : Event ) => any } fn
     */
    UI.prototype.on = (ev, fn) => {
        this.self.forEach((q) => {
            UI.on(q, ev, fn)
        })
        return this
    }
    UI.def = (query, self) => {
        console.log("is function not work(")
    }
    UI.containClass = (self, style) => {
        return self.classList.contains(style)
    }
    UI.addClass = (self, style) => {
        self.classList.add(style)
    }
    UI.removeClass = (self, style) => {
        self.classList.remove(style)
    }
    /**
     * @param { string } style
     */
    UI.prototype.toogle = (style) => {
        this.self.forEach((q) => { UI.containClass(q, style) ? UI.removeClass(q, style) : UI.addClass(q, style) })
        return this
    }

    if (window === globalThis && window) {
        return { Struct, UI, push, view }
    }
}
