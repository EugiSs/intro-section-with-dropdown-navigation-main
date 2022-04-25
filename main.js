let headerBody = document.querySelector(".header__body");
let menu = headerBody.querySelector(".header__menu");
let buttonsMenu = headerBody.querySelector(".header__buttons");
let burger = headerBody.querySelector('.header__burger');


// change parent of menu button
if (window.innerWidth >= 920) {
	headerBody.append(buttonsMenu);
}
if (window.innerWidth < 920) {
	menu.append(buttonsMenu);
}

// change parent of menu button
window.addEventListener("resize", function () {
	if (this.window.innerWidth > 920) {
		headerBody.append(buttonsMenu);
	}
	if (this.window.innerWidth <= 920) {
		menu.append(buttonsMenu);
	}
}, true);

// click check
document.addEventListener("click", function (event) {
	let target = event.target;
	let itemMenu = target.closest(".menu__item");

	// opening/closing burger menu by burger button
	if (target.classList.contains('header__burger')) {
		burger.classList.toggle("active");
		menu.classList.toggle("active");
		document.querySelector(".bg-overlay").classList.toggle("active");
		return;
	};

	if (checkDirectChildren(target, itemMenu)) {
		// if the target element has a dropdown menu open, hide the dropdown menus
		if (itemMenu.querySelector("ul.show")) {
			hideAll();
			return;
		}
		// if another element has a dropdown menu open, hide the dropdown menus and...
		if (document.querySelector("ul.show")) {
			hideAll();
		}
		// ...and open dropdown menu for target element
		itemMenu.querySelector("ul").classList.add("show");
		itemMenu.querySelector("a > img").classList.add("rotate");
		return;
	};

	// if the burger menu is open, when clicking outside the previous elements - hide the burger menu
	if (menu.classList.contains("active")) {
		hideAll();
		burger.classList.remove("active");
		menu.classList.remove("active");
		document.querySelector(".bg-overlay").classList.remove("active");
		return
	};

	// when clicking anywhere in the document (except for the previously specified elements), hide all menus
	if (document.querySelector("ul.show")) {
		hideAll();
	}
});

// if click was on <a> or <img> and and the element has a dropdown menu
function checkDirectChildren(target, parent) {
	if (parent) {
		if (Array.from(parent.children)
			.filter((el) => el.tagName === "A" || el.tagName === "IMG")
			.filter((el) => el === target).length > 0) {

			if (Array.from(parent.children).filter((el) => el.tagName === "UL").length > 0) {
				return true;
			}
		}
	}
	return false;
};

// hide all dropdown menus and rotate arrows
function hideAll() {
	Array.from(document.querySelectorAll(".menu__dropdown")).forEach((item) =>
		item.classList.remove("show")
	);
	Array.from(document.querySelectorAll(".menu__item > a > img")).forEach(
		(item) => item.classList.remove("rotate")
	);
};
