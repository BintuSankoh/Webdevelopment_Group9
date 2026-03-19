/**
 * Campus Life Companion - External JavaScript
 */

(function () {
  'use strict';

  function handleSignupSubmit(event) {
    event.preventDefault();
    var form = document.getElementById('signup');
    if (!form) return false;

    var data = {};
    var i;
    var el;
    for (i = 0; i < form.elements.length; i++) {
      el = form.elements[i];
      if (el.name && el.value !== undefined) {
        data[el.name] = el.value;
      }
      if (el.type === 'checkbox') {
        data[el.name] = el.checked;
      }
    }
    alert('Thank you! Your account has been created.\n\n(Teaching demo – no data is sent.)');
    return false;
  }

  function initCookieBanner() {
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = banner ? banner.querySelector('[data-cookie-accept]') : null;
    if (acceptBtn) {
      acceptBtn.addEventListener('click', function () {
        if (banner) {
          banner.style.display = 'none';
        }
      });
    }
  }

  function init() {
    var signupForm = document.getElementById('signup');
    if (signupForm) {
      signupForm.addEventListener('submit', handleSignupSubmit);
    }
    initCookieBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
