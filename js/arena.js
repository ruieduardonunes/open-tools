var root = "https://api.are.na/v2/channels/";
var page = 0;
var perPage = 8;
var loaded = 1;
var blocks;
var currentChannel;
var dataFile = {};
var contributors = [];
var names = [];

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
  "use strict";

  document.getElementsByClassName("loading")[0].style.display = "block";

  fetch(root + currentChannel + "?per=" + blocks)
    .then(function(response) {
      if (response == 404) {
        document.getElementsByClassName("loading")[0].style.display = "none";
        document.getElementsByClassName("ghost")[0].style.display = "none";
        document.getElementsByClassName("ghost")[1].style.display = "none";
      }
      return response.json();
    })
    .then(function(data) {
      populatePage(data);
      document.getElementsByClassName("loading")[0].style.display = "none";
      document.getElementsByClassName("ghost")[0].style.display = "none";
      document.getElementsByClassName("ghost")[1].style.display = "none";
    });
}

function populatePage(data) {
  "use strict";

  var linkNumber = document.getElementById("linkNumber");

  if (data.length > 0) {
    if (data.length > 9) {
      linkNumber.innerHTML = data.length;
    } else {
      linkNumber.innerHTML = "0" + data.length;
    }
  }

  updateDate(data);

  data.contents.reverse();
  dataFile = data;

  // console.log(data);

  function getContributors(data, contributors) {
    for (var i = 0; i < data.contents.length; i++) {
      contributors.push(data.contents[i].user.avatar_image.thumb);
      names.push(data.contents[i].connected_by_user_slug);
      // console.log(names);
    }
    uniqueContributors(contributors, names);
  }

  function uniqueContributors(contributors, names) {
    var userWrapper = document.getElementById("contributorWrapper");
    let uniqueContributors = [...new Set(contributors)];
    let uniqueNames = [...new Set(names)];

    for (var i = 0; i < uniqueNames.length; i++) {
      if (i < 4) {
        var userLink = document.createElement("a");
        var user = document.createElement("div");
        userLink.setAttribute("href", "https://are.na/" + uniqueNames[i]);
        userLink.setAttribute("target", "_blank");
        user.setAttribute("class", "contributors");
        user.setAttribute("title", uniqueNames[i]);

        if (uniqueContributors[i].includes("blank")) {
          user.innerHTML = "<span class=" + "open-star" + "></span>";
        } else {
          user.style.backgroundImage = "url(" + uniqueContributors[i] + ")";
        }

        userLink.appendChild(user);
        userWrapper.appendChild(userLink);
      } else {
        var userLink = document.createElement("a");
        var user = document.createElement("div");
        userLink.setAttribute(
          "href",
          "https://are.na/rui-nunes/" + currentChannel
        );
        userLink.setAttribute("target", "_blank");
        user.setAttribute("class", "contributors");
        user.setAttribute("title", "are.na");
        user.style.backgroundColor = "var(--paleSilver)";

        user.innerHTML = "<p> +" + (uniqueNames.length - 3) + "</p>";
        i = uniqueNames.lenght;

        userLink.appendChild(user);
        userWrapper.appendChild(userLink);
      }
    }
  }

  getContributors(data, contributors);

  for (let i = page; i < perPage; i++) {
    var container = document.getElementsByClassName("link-wrapper")[0];
    var link = document.createElement("a");
    var image = document.createElement("img");
    var title = document.createElement("h6");
    var wrapper = document.createElement("div");
    var imageWrapper = document.createElement("div");
    var contentWrapper = document.createElement("div");
    var type = document.createElement("p");

    link.setAttribute("target", "_blank");
    if (data.contents[i].source) {
      link.setAttribute("href", data.contents[i].source.url);
      type.innerHTML = "article";
    } else if (data.contents[i].class == "Channel") {
      link.setAttribute(
        "href",
        "https://www.are.na/" +
          data.contents[i].user.slug +
          "/" +
          data.contents[i].slug
      );
      type.innerHTML = "collection";
    } else if (data.contents[i].class == "Attachment") {
      link.setAttribute("href", data.contents[i].attachment.url);
      type.innerHTML = "document";
    } else if (data.contents[i].class == "Image") {
      link.setAttribute("href", data.contents[i].image.original.url);
      type.innerHTML = "document";
    }
    if (data.contents[i].image) {
      image.src = data.contents[i].image.display.url;
      image.setAttribute("alt", data.contents[i].generated_title);
    } else if (data.contents[i].class == "Channel") {
      image.src = "img/icons/link-icon.svg";
      image.style.backgroundColor = "var(--accentColor)";
      image.setAttribute("alt", "Channel");
    } else {
      image.src = "img/icons/link-icon.svg";
      image.style.backgroundColor = "var(--accentColor)";
      image.setAttribute("alt", "link");
    }

    image.setAttribute("onload", "fadeImage(this)");
    type.classList.add("link-type");
    wrapper.classList.add("link-wrapper-content");

    title.innerHTML = data.contents[i].title;

    imageWrapper.appendChild(image);
    link.appendChild(imageWrapper);
    contentWrapper.appendChild(type);
    contentWrapper.appendChild(title);
    link.appendChild(contentWrapper);
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }
  var loadMore = document.getElementById("loadButton");
  loadMore.style.display = "block";
}

function fadeImage(obj) {
  obj.style.opacity = 1;
  obj.style.transform = "scale(1.0)";
}

function updateDate(data) {
  var timeText = document.getElementById("timeStamp");
  var updatedAt = data.contents[data.length - 1].connected_at;

  var time = timeago().format(updatedAt);

  timeText.innerHTML = time;
  timeText.style.opacity = 1;
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
