pageHero = document.getElementsByClassName("title")[0];
pageTitle = document.getElementById("page-title");
pageLogo = document.getElementById("page-logo");
nav = document.getElementsByTagName("nav")[0];

window.onscroll = function() {
  //TOP
  if (pageHero.getBoundingClientRect().top <= 0) {
    pageTitle.style.opacity = 0;
    nav.style.borderBottom = "";
    pageLogo.innerHTML = "opentools.design";
  }
  //BOTTOM
  if (pageHero.getBoundingClientRect().bottom <= 0) {
    pageTitle.style.opacity = 1;
    nav.style.borderBottom = "1px solid #f2f2f2";

    function mobile(x) {
      if (x.matches) {
        pageLogo.innerHTML = "Back";
      }
    }
    var x = window.matchMedia("(max-width: 510px)");
    mobile(x);
    x.addListener(mobile);
  }
};
