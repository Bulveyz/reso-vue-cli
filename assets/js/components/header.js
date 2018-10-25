//
// Header
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  $(window).on('scroll', function () {
    var windowOffsetTop = $(window).scrollTop(),
      $header = $('header:not(.and-static)');

    if (windowOffsetTop > 20) {
      $header.addClass('active');
      $('body').addClass('st-fixed');
    } else {
      $header.removeClass('active');
      $('body').removeClass('st-fixed');
    }

  });
})(jQuery);