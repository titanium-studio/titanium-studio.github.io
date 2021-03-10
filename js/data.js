/**
 * @param { string } path
 * @param {( err: Error, res: JSON ) => void } callback
 */
function getData(path, callback) {
  if (path[0] !== "/") path = "/" + path
  getJSON(window.location.origin + path, callback)
}

/**
 * @param { string } path
 * @param {( err: Error, res: JSON ) => void } callback
 */
const getJSON = function (url, callback) {
  let xhr = new XMLHttpRequest(),
    c = callback;
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = (() => (xhr.status === 200) ? c(null, xhr.response) : c(xhr.status, xhr.response))
  xhr.send()
}

const calcRatio = (() => {
  let x = (...v) => v.every(u => "number" == typeof u),
    y = (...v) => v.reduce((a, b) => a + ("number" == typeof b ? 1 : 0), 0);
  return (a, b, c, d) => {
    if (y(a, b, c, d) == 3) throw new Error("Bad arguments")
    if (x(a, c, d)) return a * d / c
    if (x(a, b, d)) return a * d / b
    if (x(a, b, c)) return c * b / a
    if (x(b, c, d)) return c * b / d
  }
})();