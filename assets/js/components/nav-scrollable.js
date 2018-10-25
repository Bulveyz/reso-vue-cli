//
// Scrollable Nav
//
// Libraries: jQuery, jQuery Migrate, Perfect Scroll

(function ($) {
  $(document).on('ready', function () {
    var $scrollFifth = document.querySelector('#scrollFifth'),
      scrollFifthInit = new PerfectScrollbar($scrollFifth);

    $(window).on('resize', function() {
      scrollFifthInit.update();
    });
  });
})(jQuery);