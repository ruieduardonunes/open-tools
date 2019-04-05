pageHero = document.getElementsByTagName("body")[0].children[1].children[0];
pageTitle = document.getElementById("page-title");
pageLogo = document.getElementById("page-logo");
nav = document.getElementsByTagName("nav")[0];

function navBarUpdate() {
  //TOP
  if (pageHero.getBoundingClientRect().top <= 0) {
    nav.style.borderBottom = "1px solid rgba(242, 242, 242, 0)";

    if (pageTitle && pageLogo) {
      pageTitle.style.opacity = 0;
      pageLogo.innerHTML = "opentools.design";
    }
  }
  //BOTTOM
  if (pageHero.getBoundingClientRect().bottom <= 0) {
    nav.style.borderBottom = "1px solid rgba(242, 242, 242, 1)";

    if (pageTitle && pageLogo) {
      pageTitle.style.opacity = 1;
    }

    function mobile(x) {
      if (x.matches) {
        pageLogo.innerHTML = "Back";
      }
    }
    var x = window.matchMedia("(max-width: 510px)");
    if (pageLogo) {
      mobile(x);
    }
    x.addListener(mobile);
  }
}

window.onscroll = function() {
  navBarUpdate();
};

function openDat() {
  var path = window.location.pathname;
  var myURL = "dat://opentools.hashbase.io" + path;

  window.open(myURL, "_blank");
}
