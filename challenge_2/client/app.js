document.getElementById('jsonbox').onsubmit = (event) => {
  event.preventDefault();
  let jsonstr = event.target[0].value;
  if(jsonstr[jsonstr.length - 1] === ';') {
    jsonstr = jsonstr.slice(0, jsonstr.length - 1);
  }
  fetch('/formcsv', {
    method: 'POST',
    body: jsonstr,
    headers: { 'Content-type': 'application/json' }
    })
    .then(() => {
      document.getElementById('dllink').innerHTML = 'Download Report Here';
    })
    .catch((err) => {
      console.log(err);
    });
  };

document.getElementById('jsonupload').onsubmit = (event) => {
  event.preventDefault();
  var reader = new FileReader();
  reader.onload = function (e) {
    let jsonstring = e.target.result;
    if(jsonstring[jsonstring.length - 1] === ';') {
      jsonstring = jsonstring.slice(0, jsonstring.length - 1);
    }
    fetch('/formcsv', {
      method: 'POST',
      body: jsonstring,
      headers: { 'Content-type': 'application/json' }
      })
      .then(() => {
        document.getElementById('dluploadlink').innerHTML = 'Download Report Here';
      })
      .catch((err) => {
        console.log(err);
      });
  }
  reader.readAsText(event.target[0].files[0]);
}