//
// Animated Background
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $animatedBg = $('.rs-animated-bg');

  $(window).on('load', function () {
    $animatedBg.each(function () {
      var $this = $(this),
        elHeight = $this.outerHeight(),
        elParentHeight = $this.parent().outerHeight(),
        offsetTop = 0;

      window.setInterval(function () {
        if(offsetTop >= -(elHeight - elParentHeight - 2)) {
          $this.css('top', offsetTop -= 2);
        } else {
          clearInterval();
        }
      }, 100);
    });
  });
})(jQuery);