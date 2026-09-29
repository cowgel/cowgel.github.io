// https://davidshimjs.github.io/qrcodejs/
// https://github.com/davidshimjs/qrcodejs
// https://codepen.io/davidshimjs/pen/NdBYrg
// https://cccapc7759.ggo.bid/bidding/package-browse
// https://cccapc7759.ggo.bid/bidding/package/14423804 package 20
// https://cccapc7759.ggo.bid/bidding/package/14423732 package 81
/* -- HTML
<div id="form">
    <textarea id="more" rows="10" cols="150">
    ["https://catawbacountycapc.org/capc/","","Children’s Advocacy and Protection Center of Catawba County"]
    ["https://www.catawbascience.org/","","Catawba Science Center"]
    ["https://www.catawbacountync.gov","","Catawba County"]
    ["https://www.redtorus.com","","Red Torus"]
    </textarea>
    <br>
    <button id="update">Update</button>
    <br><br>
</div>
<div id="output"></div>
*/
/* -- CSS
@media print {
  form, #form{
    display: none !important;
  }
}
* {
  font-family: "Roboto Slab", sans-serif;
  box-sizing: border-box;
}
.wrapper {
  border: 1px solid grey;
  padding: 5px;
  width: 500px;
  display: grid;
  grid-template-areas:
    "code title"
    "code package";
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 5fr 1fr;
}
.qrcode {
  border: 1px solid roange;
  grid-area: code;
  margin-right: 10px;
}
.qr-package {
  grid-area: package;
  color: grey;
  color: dimgrey;
  font-size: 0.8em;
  padding-top: 3px;
  text-align: right;
}
.qr-title {
  grid-area: title;
  font-size: 1.5em;
  font-weight: bold;
}
*/
// -- JavaScript
let t = {
  width: 128,
  height: 128,
  colorDark : "#000000",
  colorLight : "#ffffff",
  correctLevel : QRCode.CorrectLevel.H
}

function createElement(name, props) {
  let elm = document.createElement(name)
  for (let p in props) {
    elm.setAttribute(p, props[p])
  }
  return elm
}

function process() {
  let out = document.querySelector('#output')
  out.textContent = ''
  let ctl = document.querySelector('#more')
  let a = ctl.value.trim().split('\n')
  a.forEach((r, i) => {
    let s = JSON.parse(r)
    // console.log(s)
    let d = createElement('div', { id: `wrap_${i}`, class: 'wrapper'})
    let q = createElement('div', { id: `qr_${i}`, class: 'qrcode'})
    // console.log(q)
    let qrcode = new QRCode(q, Object.assign(t, { text: s[0]}))
    // console.log(qrcode)
    let pkg = createElement('div', { id: `pkg_${i}`, class: 'qr-package'})
    pkg.append(document.createTextNode(s[1]))
    let title = createElement('div', { id: `title_${i}`, class: 'qr-title'})
    title.append(document.createTextNode(s[2]))
    let img = createElement('img', { id: `img_${i}`, class: 'image', alt: `${s[2]}`, src: `${s[3]}`})
    d.append(q, title, pkg, img)
    out.append(d, createElement('br'))
  })
}

function fileUpload (elmnt) {
  if (elmnt && JSON.stringify && JSON.parse) {
    //let u = util._2e({ input: { _: 'type='file' accept='.json''}})
    let u = document.createElement('input')
    u.setAttribute('type', 'file')
    u.addEventListener('change', (function(e1) {
      let files = e1.target.files, f = files[0]
      let reader = new FileReader()
      reader.onload = function(e2) {
        let t = e2.target.result
        try {
          //elmnt.value = JSON.stringify(JSON.parse(t), undefined, 4)
          elmnt.value = t
        } catch (ex) {
          console.error('invalid document')
          console.error(ex)
        }
        u = undefined
      }
      reader.readAsText(f)
    }), false)
    //u.click() // Firefox: <input> picker was blocked due to lack of user activation
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    })
    u.dispatchEvent(event)
  }
}

const btn = document.querySelector('#update')
if (btn) btn.addEventListener('click', process)
  const upload = document.querySelector('#btn-data-upload')
console.log(upload)
upload.addEventListener('click', e => {
  // alert('upload')
  fileUpload(document.querySelector('#more'))
})
