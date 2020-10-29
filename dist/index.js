'use strict';

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modals = document.querySelectorAll('.modal');
var modalTriggers = document.querySelectorAll('[data-modal]');
var modalCloseButtons = document.querySelectorAll('.modal__close');

function closeModals() {
    modals.forEach(function (modal) {
        return modal.classList.remove('modal--active');
    });
}

function toggleModal(target) {
    var targetModal = document.querySelector('#' + target);

    modals.forEach(function (modal) {
        if (modal !== targetModal) {
            modal.classList.remove('modal--active');
        }
    });
    targetModal.classList.toggle('modal--active');
}

function clickOutside(e) {
    if (e.target === e.currentTarget) {
        closeModals();
    }
}

function triggerModal(modal, delay) {
    var hasSeen = _jsCookie2.default.get('modalz');
    var expires = parseInt(modal.dataset.expires);

    if (!hasSeen) {
        setTimeout(function () {
            modal.classList.add('modal--active');
            _jsCookie2.default.set('modalz', true, { expires: expires });
        }, delay);
    }
}

if (modals.length) {
    modals.forEach(function (modal) {
        modal.addEventListener('click', clickOutside);

        var delay = parseInt(modal.dataset.timer);
        if (delay) {
            triggerModal(modal, delay);
        }
    });

    window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
}

if (modalTriggers.length > 0) {
    modalTriggers.forEach(function (trigger) {
        return trigger.addEventListener('click', function (e) {
            toggleModal(e.target.dataset.modal);
        });
    });
}

if (modalCloseButtons.length > 0) {
    modalCloseButtons.forEach(function (button) {
        button.addEventListener('click', closeModals);
    });
}