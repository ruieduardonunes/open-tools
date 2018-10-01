var root = "http://api.are.na/v2/channels/";
var channel;

function loadData(channel) {
  fetch(root + channel)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      populatePage(data);
    });
}

function populatePage(data) {
  var channelDescription = document.getElementById("channelDescription");
  var linkNumber = document.getElementById("linkNumber");

  if (data.metadata.description) {
    channelDescription.innerHTML = data.metadata.description;
  }
  if (data.length > 0) {
    linkNumber.innerHTML = data.length;
  }

  data.contents.reverse();

  console.log(data);

  collumn = document.getElementsByClassName("collumn");

  for (let i = 0; i < data.contents.length; i++) {
    if (i == 0) {
      var hero = document.getElementById("featured-hero");
      var link = document.createElement("a");
      var image = document.createElement("img");
      var par = document.createElement("p");
      var title = document.createElement("h3");
      var desc = document.createElement("h6");

      if (data.contents[i].source) {
        link.setAttribute("href", data.contents[i].source.url);
      }
      // if (data.contents[i].image) {
      //   image.src = data.contents[i].image.large.url;
      // }
      par.innerHTML = "added by" + " " + data.contents[0].connected_by_username;
      title.innerHTML = data.contents[0].title;
      desc.innerHTML = data.contents[0].description;

      link.appendChild(image);
      link.appendChild(par);
      link.appendChild(title);
      link.appendChild(desc);
      hero.appendChild(link);
    } else if (i == 1 || i == 2) {
      var container = collumn[1];
      var link = document.createElement("a");
      var image = document.createElement("img");
      var par = document.createElement("p");
      var title = document.createElement("h6");
      var wrapper = document.createElement("div");

      if (data.contents[i].source) {
        link.setAttribute("href", data.contents[i].source.url);
      }
      // if (data.contents[i].image) {
      //   image.src = data.contents[i].image.display.url;
      // }
      par.innerHTML = "added by" + " " + data.contents[i].connected_by_username;
      title.innerHTML = data.contents[i].title;

      link.appendChild(image);
      link.appendChild(par);
      link.appendChild(title);
      wrapper.appendChild(link);
      container.appendChild(wrapper);
    } else if (i == 3 || i == 4) {
      var container = collumn[2];
      var link = document.createElement("a");
      var image = document.createElement("img");
      var par = document.createElement("p");
      var title = document.createElement("h6");
      var wrapper = document.createElement("div");

      if (data.contents[i].source) {
        link.setAttribute("href", data.contents[i].source.url);
      }
      // if (data.contents[i].image) {
      //   image.src = data.contents[i].image.display.url;
      // }
      par.innerHTML = "added by" + " " + data.contents[i].connected_by_username;
      title.innerHTML = data.contents[i].title;

      link.appendChild(image);
      link.appendChild(par);
      link.appendChild(title);
      wrapper.appendChild(link);
      container.appendChild(wrapper);
    } else if (i >= 5) {
      console.log("this is" + i);
      var container = document.getElementsByClassName("link-wrapper")[0];
      var link = document.createElement("a");
      var image = document.createElement("img");
      var par = document.createElement("p");
      var title = document.createElement("h6");
      var wrapper = document.createElement("div");

      if (data.contents[i].source) {
        link.setAttribute("href", data.contents[i].source.url);
      }
      // if (data.contents[i].image) {
      //   image.src = data.contents[i].image.display.url;
      // }
      par.innerHTML = "added by" + " " + data.contents[i].connected_by_username;
      title.innerHTML = data.contents[i].title;

      link.appendChild(image);
      link.appendChild(par);
      link.appendChild(title);
      wrapper.appendChild(link);
      container.appendChild(wrapper);
    }
  }
}
