//
// Custom Select
//
// Libraries: jQuery, jQuery Migrate, jQuery Validation, Select2

(function ($) {
  var $select = $('.rs-custom-select');
  
  $(document).ready(function () {
    $select.each(function () {
      var $this = $(this),
        placeholder = $this.data('placeholder'),
        classes = $this.attr('class');

      $this.select2({
        placeholder: placeholder ? placeholder : false,
        containerCssClass: classes ? classes : false,
        minimumResultsForSearch: Infinity,
        dropdownCssClass: 'rs-custom-select__dropdown'
      });

      if ($this.prop('required')) {
        $this.change(function () {
          $this.valid();
        });
      }
    });
    
  });
})(jQuery);