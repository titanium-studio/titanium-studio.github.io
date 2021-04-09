//#region Types
/** @typedef { number } n */
/** @typedef { (err: null | n, res: JSON | any) => void } fn */
//#endregion

/**
 * @param { string } url
 * @param { fn } fn
 */
const getData = (url, fn) => {
  let p = url
  if (p[0] !== "/") p = "/" + p
  getJSON(window.location.origin + p, fn)
},
  getJSON = (url, fn) => {
    let x = new XMLHttpRequest()
    x.open('GET', url, true)
    x.responseType = 'json'
    x.onload = () => fn(x.status === 200 ? null : x.status, x.response)
    x.send()
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