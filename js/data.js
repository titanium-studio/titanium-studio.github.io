
/**
 * @param { string } path
 * @param {( err: Error, res: JSON ) => void } callback
 */
function getimages(path, callback) {
  if (path[0] !== "/") path = "/" + path
  getJSON(window.location.origin + path, callback)
}
const getData = getimages

const getJSON = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'json'
  xhr.onload = function () {
    var status = xhr.status
    if (status === 200) {
      callback(null, xhr.response)
    } else {
      callback(status, xhr.response)
    }
  }
  xhr.send()
}