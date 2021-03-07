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