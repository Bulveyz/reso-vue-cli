//
// Password toText
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $passToText = $('.rs-password-to-text');

  $(document).on('ready', function () {
    $passToText.each(function () {
      var $this = $(this),
        $target = $($this.data('target')),
        isPassword = true;

      $this.on('click', function (e) {
        e.preventDefault();

        if (isPassword === true) {
          $target.attr('type', 'text');

          isPassword = false;
        } else {
          $target.attr('type', 'password');

          isPassword = true;
        }
      });
    });
  });
})(jQuery);