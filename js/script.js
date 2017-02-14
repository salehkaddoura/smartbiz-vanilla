var nameInputField = document.querySelector('.form__input--name'),
	emailInputField = document.querySelector('.form__input--email'),
	messageInputField = document.querySelector('.form__input--message'),
	formSubmitWrapper = document.querySelector('.form__submit__wrapper'),
	svgPath = document.querySelector('.form__submit__svg path'),
	formInputCount = Array.from(document.querySelectorAll('.form__input')),
	length = svgPath.getTotalLength(),
	sectionLength = (length / formInputCount.length);

// to do: add 1 event listener on the form and use event delegation
nameInputField.addEventListener("keyup", debounce(validateNameField, 500));
emailInputField.addEventListener("keyup", debounce(validateEmailField, 500));
messageInputField.addEventListener("keyup", debounce(validateMessageField, 500));

function validateNameField() {
	var val = nameInputField.value;
	
	if (val) {
		drawSvgPath();
	}
}

function validateEmailField() {
	// email regex can go her to validate email
	var val = emailInputField.value;

	if (val) {
		drawSvgPath();
	}
}

function validateMessageField() {
	var val = messageInputField.value;
	
	if (val) {
		drawSvgPath();
	}
}

function drawSvgPath() {
	if (svgPath.style.strokeDashoffset <= 0) {
		return;
	}

	svgPath.style.strokeDashoffset -= sectionLength;	
	
	if (svgPath.style.strokeDashoffset <= 0) {
		setTimeout(function() {
			formSubmitWrapper.classList.add('form__valid');
		}, 500);

		return;
	}
}

function initPathAttributes() {
	svgPath.style.transition = svgPath.style.WebkitTransition = 'none';
	// Set up the starting positions
	svgPath.style.strokeDasharray = length + ' ' + length;
	svgPath.style.strokeDashoffset = length;
	// Trigger a layout so styles are calculated & the browser
	// picks up the starting position before animating
	svgPath.getBoundingClientRect();
	// Define our transition
	svgPath.style.transition = svgPath.style.WebkitTransition = 'stroke-dashoffset 0.50s ease-in-out';
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

initPathAttributes();
