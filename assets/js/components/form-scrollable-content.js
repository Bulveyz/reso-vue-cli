//
// Form Scrollable Content
//
// Libraries: jQuery, jQuery Migrate, Perfect Scroll

(function ($) {
  $(document).on('ready', function () {
    var $scrollFourth = document.querySelector('#scrollFourth'),
      scrollFourthInit = new PerfectScrollbar($scrollFourth);

    $('[data-next-step="#stepFormTermsOfUse"]').on('click', function (e) {
      scrollFourthInit.update();
    });
  });
})(jQuery);