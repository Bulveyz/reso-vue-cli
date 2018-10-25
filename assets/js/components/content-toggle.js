//
// Content Toggle
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $toggler = $('.sidebar__tous'),
    $content = $('.sidebar__tous__list');

  $(document).on('ready', function () {
    $toggler.each(function () {
      $(this).click(function () {
        $content.toggleClass('active');
        $(this).toggleClass('active');
      });
    });
  });
})(jQuery);