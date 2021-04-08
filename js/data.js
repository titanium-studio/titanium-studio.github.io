/**
 * @param { string } path
 * @param {( err: Error, res: JSON ) => void } callback
 */
function getData(path, callback) {
  let p = path
  if (p[0] !== "/") p = "/" + p
  getJSON(window.location.origin + p, callback)
}

/**
 * @param { string } path
 * @param {( err: Error, res: JSON ) => void } callback
 */
const getJSON = function (url, callback) {
  let x = new XMLHttpRequest(),
    c = callback;
  x.open('GET', url, true)
  x.responseType = 'json'
  x.onload = (() => (x.status === 200) ? c(null, x.response) : c(x.status, x.response))
  x.send()
}

/** @type { (a: number, b: number, c: number, d: number) => number } */
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