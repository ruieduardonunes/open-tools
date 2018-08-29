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
  var code = currentURL.search.substring(1);

  console.log(code);
  if (currentURL.search.substring(1)) {
    var code = url.searchParams.get("Code");
    console.log(c);
  }
}
