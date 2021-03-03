var icons = document.getElementsByClassName("open-icon");

function mobile() {
	if (isTouchDevice()) {
		var currentElement = Math.floor(Math.random() * (icons.length - 1));
		setInterval(() => {
			currentElement = Math.floor(Math.random() * (icons.length - 1));
			icons[currentElement].classList.add("animate");
			console.log(currentElement);
			setTimeout(() => {
				icons[currentElement].classList.remove("animate");
			}, 3000);
		}, 5000);
	} else {
	}
}

function isTouchDevice() {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
}

mobile();
