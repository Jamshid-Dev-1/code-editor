const htmlCodeZone = document.getElementsByName('htmlCodeZone');
const cssCodeZone = document.getElementsByName('cssCodeZone');
const engineHtmlZone = document.getElementsByName('engineZone');

const baseurl = 'http://localhost:1101/codes';


function fetchCodes(nanoCode) {
  axios
    .get(`${baseurl}/${nanoCode}`)
    .then((res) => {
      htmlCodeZone[0].value = JSON.parse(res.data.codes).html;
      cssCodeZone[0].value = JSON.parse(res.data.codes).css;
      localStorage.setItem('codes', res.data.codes);
      engineHtmlZone[0].innerHTML = JSON.parse(res.data.codes).html;
    })
    .catch((err) => {
      alert(err.response.data.msg);
    });
}

function createRoom() {
  axios
    .get(`${baseurl}/newCache`)
    .then((data) => {
      localStorage.setItem('nanoCode', data.data.payload.nanoCode)
      localStorage.setItem('codes', JSON.stringify(data.data.payload.codes))
    })
    .catch((err) => {
      alert(err.response.data.msg);
    });
}

function updateCodes(codes) {
  axios.patch(`${baseurl}/update/${localStorage.getItem('nanoCode')}`, {
      codes
    })
    .then(response => {
      const codes = response.data.payload.codes;
      engineHtmlZone[0].innerHTML = codes.html;
      localStorage.setItem('codes', JSON.stringify(codes));
    })
    .catch(err => {
      alert(err.response.data.msg);
    })

}

function createCodesObject() {
  const obj = {
    html: htmlCodeZone[0].value,
    css: `${cssCodeZone[0].value}`
  }
  updateCodes(obj);
}



window.onload = JSON.parse(localStorage.getItem('codes')) ? fetchCodes(localStorage.getItem('nanoCode')) : createRoom();