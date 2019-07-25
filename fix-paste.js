// Whenever there's an event for cut/copy/paste stop the propagation of the event
window.document.addEventListener('cut', function (e) {
    e.stopPropagation();
}, true);
window.document.addEventListener('copy', function (e) {
    e.stopPropagation();
}, true);
window.document.addEventListener('paste', function (e) {
    e.stopPropagation();
}, true);