import Cookies from 'js-cookie';

const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloseButtons = document.querySelectorAll('.modal__close');

function closeModals() {
    modals.forEach(modal => modal.classList.remove('modal--active'));
}

function toggleModal(target) {
    const targetModal = document.querySelector(`#${target}`);

    modals.forEach(modal => {
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
    const hasSeen = Cookies.get('modalz');
    const providedExpiry = modal.dataset.expires;
    let expires;

    if (providedExpiry) {
        expires = parseInt(providedExpiry);
    } else {
        expires = 1;
    }

    if(!hasSeen) {
        setTimeout(() => {
            modal.classList.add('modal--active');
            Cookies.set('modalz', true, { expires });
        }, delay);
    }

}

if (modals.length) {
    modals.forEach(modal => {
        modal.addEventListener('click', clickOutside);

        const delay = parseInt(modal.dataset.timer)
        if(delay) {
            triggerModal(modal, delay);
        }

    });

    window.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
}

if (modalTriggers.length > 0) {
    modalTriggers.forEach(trigger =>
        trigger.addEventListener('click', e => {
            toggleModal(e.target.dataset.modal);
        })
    );
}

if (modalCloseButtons.length > 0) {
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModals);
    });
}
