var root = "https://api.are.na/v2/channels/";
var page = 0;
var perPage = 8;
var loaded = 1;
var blocks;
var currentChannel;
var dataFile = {};

function getInfo(channel) {
  currentChannel = channel;
  fetch(root + channel)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      blocks = data.length;
      loadData(data);
    });
}

function loadData(data) {
  document.getElementsByClassName("loading")[0].style.display = "block";

  fetch(root + currentChannel + "?per=" + blocks)
    .then(function(response) {
      if (response == 404) {
        document.getElementsByClassName("loading")[0].style.display = "none";
      }
      return response.json();
    })
    .then(function(data) {
      populatePage(data);
      document.getElementsByClassName("loading")[0].style.display = "none";
    });
}

function populatePage(data) {
  var linkNumber = document.getElementById("linkNumber");

  if (data.length > 0) {
    if (data.length > 9) {
      linkNumber.innerHTML = data.length;
    } else {
      linkNumber.innerHTML = "0" + data.length;
    }
  }

  data.contents.reverse();
  dataFile = data;

  collumn = document.getElementsByClassName("collumn");

  for (let i = page; i < perPage; i++) {
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
    } else if (data.contents[i].class == "Image") {
      link.setAttribute("href", data.contents[i].image.original.url);
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

    image.setAttribute("onload", "fadeImage(this)");

    par.innerHTML = "added by" + " " + data.contents[i].connected_by_username;
    title.innerHTML = data.contents[i].title;

    link.appendChild(image);
    link.appendChild(par);
    link.appendChild(title);
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }
  var loadMore = document.getElementById("loadButton");
  loadMore.style.display = "block";
}

function fadeImage(obj) {
  obj.style.opacity = 1;
}

function loadBlocks(elem) {
  var loader = document.getElementsByClassName("load")[0];
  loaded++;

  page = page + 8;

  if (perPage + 8 >= dataFile.length) {
    perPage = dataFile.length;
  } else {
    perPage = perPage + 8;
  }

  dataFile.contents.reverse();
  pagesNeeded = Math.ceil(dataFile.length / 8);

  var container = document.getElementsByClassName("link-wrapper")[0];
  var numberOfItems = container.childElementCount;

  if (loaded < pagesNeeded) {
    populatePage(dataFile);
  } else if (loaded == pagesNeeded) {
    loader.style.display = "none";
    populatePage(dataFile);
  } else {
    //do nothing
  }
}
