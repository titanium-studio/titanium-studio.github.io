//#region Types
/** @typedef { number } n */
/** @typedef { (err: null | n, res: JSON | any) => void } fn */
//#endregion

/**
 * @param { string } url
 * @param { fn } fn
 */
const getData = (url, fn) => getJSON(location.origin + (url[0] !== "/" ? "/" + url : url), fn),
  getJSON = (url, fn) => {
    let x = new XMLHttpRequest()
    x.open('GET', url, true)
    x.responseType = 'json'
    x.onload = () => fn(x.status === 200 ? null : x.status, x.response)
    x.send()
  }

/**
 * @param  {...string } str
 */
function path(...str) {
  let res = "", y = "/"
  forEach(str, (x, i) => {
    x = x.trim()
    if (i > 0 && x.slice(0, 3) == "../") {
      res = res.slice(0, res.lastIndexOf("/"))
      x = s.slice(2)
    }
    if (i > 0 && x[0] !== y) x = y + x
    if (i < str.length && x.endsWith(y)) x = x.slice(0, x.length - 1)
    res += x
  })
  return res
}

/** @type { (a: n, b: n, c: n, d: n) => n } */
const calcRatio = (() => {
  let x = v => "number" == typeof v,
    y = (...v) => v.every(u => x(u)),
    z = (...v) => v.reduce((a, b) => a + (x(b) ? 1 : 0), 0);
  return (a, b, c, d) => {
    if (z(a, b, c, d) !== 3) throw new Error("Bad arguments")
    if (y(a, c, d)) return a * d / c
    if (y(a, b, d)) return a * d / b
    if (y(a, b, c)) return c * b / a
    if (y(b, c, d)) return c * b / d
  }
})();