window.onload = test2;

var channel;

//Delete
var channel = "http://api.are.na/v2/channels/inclusive-design-toolkit";

function loadData(channel) {
  fetch(channel)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      //populatePage(data);
    });
}

//loadData(channel);

function populatePage(data) {
  //console.log(data);

  //TO Delete
  for (var images in data.contents) {
    var image = document.createElement("img");
    if (data.contents.hasOwnProperty(images)) {
      if (data.contents[images].base_class == "Block") {
        image.src = data.contents[images].image.original.url;
        document.body.appendChild(image);
      } else {
      }
    }
  }
}

function test() {
  window.location =
    "http://dev.are.na/oauth/authorize?client_id=6ce6938e5e24c827fdb6acb55a92e1e006b165266ae2b1d6fc4cebd89aea81ce&redirect_uri=https://opentools.design/&response_type=code";
}

function test2() {
  var currentURL = window.location;
  var hasCode = currentURL.search.substring(1);

  if (hasCode) {
    var url = new URL(currentURL.href);
    var code = url.searchParams.get("code");
    getKey(code);
  }
}

function getKey(code) {
  var id = "6ce6938e5e24c827fdb6acb55a92e1e006b165266ae2b1d6fc4cebd89aea81ce";
  var secret =
    "14af41a719258af9a23dd256b3e65314d9ed0d15caae0ee08a921241fa1d44d4";
  var callback = "https://opentools.design/";
  var url =
    "https://dev.are.na/oauth/token?client_id=" +
    id +
    "&client_secret=" +
    secret +
    "&code=" +
    code +
    "&grant_type=authorization_code&redirect_uri=" +
    callback;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(response => console.log("Success:", JSON.stringify(response)));
}
