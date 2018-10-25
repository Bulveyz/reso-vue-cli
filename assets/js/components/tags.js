//
// Tags
//
// Libraries: jQuery, jQuery Migrate, Select2

(function ($) {
  var $tags = $('.rs-tags');

  $(document).on('ready', function () {
    $tags.each(function () {
      var $this = $(this),
        classes = $this.attr('class');

      $this.select2({
        containerCssClass: classes ? classes : false
      });
    });
  });
})(jQuery);