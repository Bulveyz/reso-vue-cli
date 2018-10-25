//
// Tooltip
//
// Libraries: jQuery, jQuery Migrate, Bootstrap.js

(function ($) {
  var $tooltip = $('[data-toggle="tooltip"]'),
    $parent = $tooltip.parents('.rs-tooltips-fixed');

  $(document).on('ready', function () {
    if ($tooltip.length) {
      if (!$parent.hasClass('rs-tooltips-fixed')) {
        $tooltip.each(function () {
          var $this = $(this);

          $this.tooltip({
            container: $this,
            template: '<div class="tooltip tooltip-absolute"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
          });
        });
      } else {
        $tooltip.tooltip();
      }
    }
  });
})(jQuery);