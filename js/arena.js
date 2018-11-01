var root = "https://api.are.na/v2/channels/";
var channel;

function loadData(channel) {
  fetch(root + channel)
    .then(function(response) {
      if (response == 404) {
        document.getElementById("loading").style.display = "none";
      }
      return response.json();
    })
    .then(function(data) {
      populatePage(data);
      document.getElementById("loading").style.display = "none";
    });
}

function populatePage(data) {
  var channelDescription = document.getElementById("channelDescription");
  var linkNumber = document.getElementById("linkNumber");
  var collabNumber = document.getElementById("collabNumber");

  if (data.metadata.description) {
    channelDescription.innerHTML = data.metadata.description;
  }
  if (data.length > 0) {
    linkNumber.innerHTML = data.length;
  }

  data.contents.reverse();

  console.log(data);

  collumn = document.getElementsByClassName("collumn");
  var collaborators = [];

  for (let i = 0; i < data.contents.length; i++) {
    var container = document.getElementsByClassName("link-wrapper")[0];
    var link = document.createElement("a");
    var image = document.createElement("img");
    var par = document.createElement("p");
    var title = document.createElement("h6");
    var wrapper = document.createElement("div");

    collaborators.push(data.contents[i].connected_by_user_slug);

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

    par.innerHTML = "added by" + " " + data.contents[i].connected_by_username;
    title.innerHTML = data.contents[i].title;

    link.appendChild(image);
    link.appendChild(par);
    link.appendChild(title);
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  }

  var collabs = [];
  var arr = collaborators.filter(function(el) {
    // If it is not a duplicate, return true
    if (collabs.indexOf(el) == -1) {
      collabs.push(el);
      return true;
    }

    return false;
  });

  collabNumber.innerHTML = collabs.length;
}
