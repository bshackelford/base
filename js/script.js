// Add active navigation class based on URL
$(function() {
    $('nav a[href^="/' + location.pathname.split("/")[1] + '"]').addClass('active');
});

// close modal
$(".js-modal-close").click(function() {
    $("body").removeClass("modal-open")
});