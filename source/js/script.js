(function () {
  var pageMain = document.querySelector('.page-main');
  var noJS = document.querySelector('.page-header--nojs');
  var pageHeader = document.querySelector(".page-header");
  var toggleButton = pageHeader.querySelector(".page-header__toggle");
  var buttonBuy = document.querySelectorAll('.button--buy');
  var buttonClose = document.querySelector('.modal-user__btn-close');
  var buttonCloseMessage = document.querySelector('.modal-message__btn-close');
  var overlay = document.querySelector('.modal-overlay');
  var modalUser = document.querySelector('.modal-user');
  var modalMessage = document.querySelector('.modal-message');
  var form = modalUser.querySelector('.modal-user__form');
  var userPhone = modalUser.querySelector('[name=phone]');
  var userEmail = modalUser.querySelector('[name=email]');
  var kodEscape = 27;

  if (noJS) {
    noJS.classList.remove('page-header--nojs');
  }

  if (toggleButton) {
    toggleButton.onclick = function () {
      pageHeader.classList.toggle('page-header--menu-open');
    }
  }

  if (buttonBuy && buttonClose && overlay && modalUser) {

    var closeForm = function () {

    };

    var openMessage = function () {

      var closeMessage = function () {
        buttonCloseMessage.removeEventListener('click', onButtonCloseMessageClick);
        overlay.removeEventListener('click', onOverlayClick);
        window.removeEventListener('keydown', onKeydownClick);

        overlay.classList.remove('modal-overlay--open');
        modalMessage.classList.remove('modal-message--open');
      };

      var onButtonCloseMessageClick = function () {
        closeMessage();
      };

      var onOverlayClick = function () {
        closeMessage();
      };

      var onKeydownClick = function (evtKeydown) {
        if (evtKeydown.keyCode === kodEscape) {
          closeMessage();
          window.removeEventListener('keydown', onKeydownClick);
        }
      };

      overlay.classList.add('modal-overlay--open');
      modalMessage.classList.add('modal-message--open');

      buttonCloseMessage.addEventListener('click', onButtonCloseMessageClick);
      overlay.addEventListener('click', onOverlayClick);
      window.addEventListener('keydown', onKeydownClick);

    };


    var onButtonOpenModalClick = function (evtOpen) {
      if (evtOpen.target && evtOpen.target.classList.contains('button--buy')) {
        event.preventDefault();

        modalUser.classList.add('modal-user--open');
        overlay.classList.add('modal-overlay--open');
        userPhone.focus();

        var closeForm = function () {
          if (event && event.preventDefault) {
            event.preventDefault();
          }

          modalUser.classList.remove('modal-user--open');
          modalUser.classList.remove('modal-user__error');
          overlay.classList.remove('modal-overlay--open');

          overlay.removeEventListener('click', onCloseModalClick);
          buttonClose.removeEventListener('click', onCloseModalClick);
          buttonClose.removeEventListener('click', onCloseModalClick);

          userPhone.value = '';
          userEmail.value = '';

        };

        var onCloseModalClick = function (evtClose) {
          closeForm();
        };

        var onCloseButtonClick = function (evtClose) {
          closeForm();
        };

        var onKeydownClick = function (evtKeydown) {
          if (evtKeydown.keyCode === kodEscape) {
            closeForm();
            window.removeEventListener('keydown', onKeydownClick);
          }
        };

        var onSubmitClick = function (evtPost) {
          event.preventDefault();

          if (userPhone.value) {
            localStorage.setItem("userPhone", userPhone.value);
            if (userEmail.value) {
              localStorage.setItem("userEmail", userEmail.value);
            }
            onCloseModalClick();
            openMessage();
          } else {
            modalUser.classList.remove('modal-user__error');
            modalUser.offsetWidth = modalUser.offsetWidth;
            modalUser.classList.add('modal-user__error');
            userPhone.focus();
          }

        };

        buttonClose.addEventListener('click', onCloseButtonClick);
        overlay.addEventListener('click', onCloseModalClick);
        window.addEventListener('keydown', onKeydownClick);
        form.addEventListener('submit', onSubmitClick);
      }
    }

    pageMain.addEventListener('click', onButtonOpenModalClick);
  }
})();
