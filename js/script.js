var nameInputField = document.querySelector('.form__input--name');
var emailInputField = document.querySelector('.form__input--email');
var messageInputField = document.querySelector('.form__input--message');
var formSubmitWrapper = document.querySelector('.form__submit__wrapper');
var formBody = document.getElementById('form__body');
var svgPath = document.querySelector('.form__submit__svg path');
var formInputCount = Array.from(document.querySelectorAll('.form__input'));
var length = svgPath.getTotalLength();
var sectionLength = (length / formInputCount.length).toFixed();

formBody.addEventListener("keyup", debounce(function(e) {
  validateForm(e);
}, 500));

var drawFieldState = {
  nameField: false,
  emailField: false,
  messageField: false
};

function validateForm(event) {
  switch(event.target.name) {
    case 'name__field':
      validateNameField();
      break;
    case 'email__field':
      validateEmailField();
      break;
    case 'message__field':
      validateMessageField();
      break;
  }
} 

function validateNameField() {
  var val = nameInputField.value;
  
  if (val) {
    drawSvgPath('nameField', true);
  } else {
    drawSvgPath('nameField', false);
  }
}

function validateEmailField() {
  // email regex can go her to validate email
  var val = emailInputField.value;

  if (val) {
    drawSvgPath('emailField', true);
  } else {
    drawSvgPath('emailField', false);
  }
}

function validateMessageField() {
  var val = messageInputField.value;
  
  if (val) {
    drawSvgPath('messageField', true);
  } else {
    drawSvgPath('messageField', false);
  }
}

function drawSvgPath(prop, valid) {
  var currentSvgPathLength;

  if (!valid && drawFieldState[prop]) {
    drawFieldState[prop] = false;

    if (svgPath.style.strokeDashoffset < length) {
      currentSvgPathLength = parseInt(Number(svgPath.style.strokeDashoffset).toFixed());
      svgPath.style.strokeDashoffset = currentSvgPathLength + Number(sectionLength);

      setTimeout(function() {
        formSubmitWrapper.classList.toggle('form__valid', false);
      }, 500);  
    }

    return;
  }

  if (!drawFieldState[prop] && svgPath.style.strokeDashoffset > 0 && valid ) {
    currentSvgPathLength = parseInt(Number(svgPath.style.strokeDashoffset).toFixed());
    svgPath.style.strokeDashoffset = currentSvgPathLength - Number(sectionLength);
    drawFieldState[prop] = true;

    if (svgPath.style.strokeDashoffset <= 0) {
      svgPath.style.strokeDashoffset = 0;
      
      setTimeout(function() {
        formSubmitWrapper.classList.add('form__valid');
      }, 500);  
    }
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
