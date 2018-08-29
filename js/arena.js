var channel;

//Delete
var channel = "http://api.are.na/v2/channels/inclusive-design-toolkit";

function loadData(channel) {
  fetch(channel)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      populatePage(data);
    });
}

loadData(channel);

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
    "http://dev.are.na/oauth/authorize?client_id=f31a0e92d5d37d30d4f91ad349ff340d08e4f36e529c1d26ee0bb19aa7d59c5a&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code"
  )
    .then(function(response) {
      return response;
    })
    .then(function(key) {
      var url =
        "https://dev.are.na/oauth/token?client_id=THE_ID&client_secret=c4e1fe4fbd30432bbdfa02e98537428d573e5a0841bdf95d3f8db1028b07762e&code=" +
        key +
        "&grant_type=authorization_code&redirect_uri=urn:ietf:wg:oauth:2.0:oob";
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
