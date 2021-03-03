let pageHero = document.getElementsByTagName("body")[0].children[1].children[0];
let pageTitle = document.getElementById("page-title");
let pageLogo = document.getElementById("page-logo");
let nav = document.getElementsByTagName("nav")[0];

var heroTop;
var heroBottom;

function navBarUpdate() {
	nav.style.borderBottom =
		heroBottom <= 0
			? "1px solid var(--paleSilver)"
			: "1px solid rgba(242, 242, 242, 0)";

	pageTitle.style.opacity = pageTitle && pageLogo && heroBottom <= 0 ? 1 : 0;

	if (heroTop <= 0) {
		if (pageTitle && pageLogo) {
			pageLogo.innerHTML = "opentools.design";
		}
	}
	//BOTTOM
	if (heroBottom <= 0) {
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

window.onscroll = function () {
	heroTop = pageHero.getBoundingClientRect().top;
	heroBottom = pageHero.getBoundingClientRect().bottom;
	navBarUpdate();
};

function openDat() {
	var path = window.location.pathname;
	var myURL = "dat://opentools.hashbase.io" + path;

	window.open(myURL, "_blank");
}
