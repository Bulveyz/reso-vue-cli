//
// Dropdown
//
// Libraries: jQuery, jQuery Migrate, bootstrap.js

(function ($) {
  var $dropdown = $('.dropdown');

  $(document).on('ready', function () {
    $dropdown.on('show.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $dropdown.on('hide.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });
  });
})(jQuery);