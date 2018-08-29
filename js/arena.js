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
  fetch(
    "http://dev.are.na/oauth/authorize?client_id=6ce6938e5e24c827fdb6acb55a92e1e006b165266ae2b1d6fc4cebd89aea81ce&redirect_uri=https://opentools.design/&response_type=code"
  )
    .then(function(response) {
      return response;
    })
    .then(function(key) {
      var url =
        "https://dev.are.na/oauth/token?client_id=6ce6938e5e24c827fdb6acb55a92e1e006b165266ae2b1d6fc4cebd89aea81ce&client_secret=14af41a719258af9a23dd256b3e65314d9ed0d15caae0ee08a921241fa1d44d4&code=" +
        key +
        "&grant_type=authorization_code&redirect_uri=https://opentools.design/";
      fetch(url, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(response => console.log("Success:", JSON.stringify(response)));
    });
}
