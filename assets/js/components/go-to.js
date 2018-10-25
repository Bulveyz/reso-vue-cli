//
// Go To
//
// Libraries: jQuery, jQuery Migrate, animate.css

(function ($) {
  var $goTo = $('.rs-go-to');

  $(document).on('ready', function () {
    $goTo.on('click', function (e) {
      e.preventDefault();

      $('html, body').stop().animate({
        'scrollTop': 0
      }, 800);
    });
  });

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 400 && !$goTo.hasClass('animation-was-fired')) {
      $goTo.show();

      setTimeout(function () {
        $goTo.addClass('animation-was-fired animated zoomIn').css({
          'opacity': ''
        });
      });
    } else if ($(window).scrollTop() <= 400 && $goTo.hasClass('animation-was-fired')) {
      $goTo.removeClass('animation-was-fired zoomIn');

      setTimeout(function () {
        $goTo.addClass('zoomOut').css({
          'opacity': 0
        });
      }, 100);

      setTimeout(function () {
        $goTo.removeClass('animated zoomOut').hide();
      }, 400);
    }
  });
})(jQuery);