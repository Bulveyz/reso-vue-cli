//
// Aside - slider
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  $(document).on('ready', function () {
    $('.rs-aside__slider').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
    })
  });
})(jQuery);