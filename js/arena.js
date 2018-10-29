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
    var container = document.getElementsByClassName("link-wrapper")[0];
    var link = document.createElement("a");
    var image = document.createElement("img");
    var par = document.createElement("p");
    var title = document.createElement("h6");
    var wrapper = document.createElement("div");

    link.setAttribute("target", "_blank");

    if (data.contents[i].source) {
      link.setAttribute("href", data.contents[i].source.url);
    } else if (data.contents[i].class == "Channel") {
      link.setAttribute(
        "href",
        "https://www.are.na/" +
          data.contents[i].user.slug +
          "/" +
          data.contents[i].slug
      );
    } else if (data.contents[i].class == "Attachment") {
      link.setAttribute("href", data.contents[i].attachment.url);
    }
    if (data.contents[i].image) {
      image.src = data.contents[i].image.display.url;
    } else if (data.contents[i].class == "Channel") {
      image.src = "img/icons/link-icon.svg";
      image.style.backgroundColor = "var(--accentColor)";
    } else {
      image.src = "img/icons/link-icon.svg";
      image.style.backgroundColor = "var(--accentColor)";
    }

    par.innerHTML = "added by" + " " + data.contents[i].connected_by_username;
    title.innerHTML = data.contents[i].title;

    link.appendChild(image);
    link.appendChild(par);
    link.appendChild(title);
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }
}

el = document.getElementsByClassName("content-wrapper")[1];

function isScrolledIntoView(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // Only completely visible elements return true:
  var isVisible = elemTop >= 0 && elemBottom <= window.innerHeight;
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

function isVisible() {
  if (isScrolledIntoView) {
    console.log("olazito");
  } else {
    console.log("adeusito");
  }
}

document.onScroll = isVisible();
