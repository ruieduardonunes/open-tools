var channel;

//To do
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

function populatePage(data) {}
