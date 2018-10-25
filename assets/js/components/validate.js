//
// Validate
//
// Libraries: jQuery, jQuery Migrate, jQuery Validation

(function ($) {
  var $validationElement = $('.rs-validate');

  $(document).on('ready', function () {
    $validationElement.each(function () {
      var $this = $(this);

      $this.validate();
    });
  });
})(jQuery);