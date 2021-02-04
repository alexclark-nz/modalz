'use strict';var _jsCookie=require('js-cookie'),_jsCookie2=_interopRequireDefault(_jsCookie);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var modals=document.querySelectorAll('.modal'),modalTriggers=document.querySelectorAll('[data-modal]'),modalCloseButtons=document.querySelectorAll('.modal__close');/**
 * Closes all modals in the document
 */function closeAllModals(){modals.forEach(function(a){return a.classList.remove('modal--active')})}/**
 * Closes a specific modal
 * If we have a 'data-next-modal' attribute, we can trigger another modal
 * @param {Object} e
 */function closeModal(a){var b=a.target,c=b.closest('.modal');c.classList.remove('modal--active');var d=c.dataset.nextModal;d&&toggleModal(d)}/**
 * Toggle a specific modal (by ID)
 * @param {String} target
 */function toggleModal(a){var b=document.querySelector('#'+a);modals.forEach(function(a){a!==b&&a.classList.remove('modal--active')}),b.classList.toggle('modal--active')}/**
 * Handles clicking outside the modal to deactivate
 * @param {Object} e 
 */function clickOutside(a){a.target===a.currentTarget&&closeModal(a)}/**
 * Handles the automatic activation of modals
 * @param {HTMLElement} 
 * @param {Number} delay 
 */function triggerModal(a,b){var c=a.id,d=_jsCookie2.default.get('modalz-'+c),e=a.dataset.expires,f=void 0;f=e?parseInt(e):1,d||setTimeout(function(){a.classList.add('modal--active'),_jsCookie2.default.set('modalz-'+c,!0,{expires:f})},b)}/**
 * Event listeners
 */modals.length&&(modals.forEach(function(a){a.addEventListener('click',clickOutside);var b=parseInt(a.dataset.timer);b&&triggerModal(a,b)}),window.addEventListener('keydown',function(a){'Escape'===a.key&&closeAllModals()})),0<modalTriggers.length&&modalTriggers.forEach(function(a){return a.addEventListener('click',function(a){toggleModal(a.target.dataset.modal)})}),0<modalCloseButtons.length&&modalCloseButtons.forEach(function(a){a.addEventListener('click',closeModal),a.addEventListener('keydown',function(a){'Enter'===a.key&&closeModal()})});