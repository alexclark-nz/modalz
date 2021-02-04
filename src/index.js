import Cookies from 'js-cookie';

const modals = document.querySelectorAll('.modal');
const modalTriggers = document.querySelectorAll('[data-modal]');
const modalCloseButtons = document.querySelectorAll('.modal__close');

/**
 * Closes all modals in the document
 */
function closeAllModals() {
    modals.forEach(modal => modal.classList.remove('modal--active'));
}


/**
 * Closes a specific modal
 * If we have a 'data-next-modal' attribute, we can trigger another modal
 * @param {Object} e
 */
function closeModal({ target }) {
    const modal = target.closest('.modal');
    modal.classList.remove('modal--active');

    const { nextModal } = modal.dataset;    
    if (nextModal) {
        toggleModal(nextModal);
    }
}

/**
 * Toggle a specific modal (by ID)
 * @param {String} target
 */
function toggleModal(target) {
    const targetModal = document.querySelector(`#${target}`);

    modals.forEach(modal => {
        if (modal !== targetModal) {
            modal.classList.remove('modal--active');
        }
    });
    targetModal.classList.toggle('modal--active');
}

/**
 * Handles clicking outside the modal to deactivate
 * @param {Object} e 
 */
function clickOutside(e) {    
    if (e.target === e.currentTarget) {
        closeModal(e);
    }
}

/**
 * Handles the automatic activation of modals
 * @param {HTMLElement} 
 * @param {Number} delay 
 */
function triggerModal(modal, delay) {
    const { id } = modal;
    const hasSeen = Cookies.get(`modalz-${id}`);
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
            Cookies.set(`modalz-${id}`, true, { expires });
        }, delay);
    }

}


/**
 * Event listeners
 */
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
            closeAllModals();
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
        button.addEventListener('click', closeModal);
        button.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                closeModal();
            }
        });
    });
}
