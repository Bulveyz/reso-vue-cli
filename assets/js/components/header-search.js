//
// Header Search
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var windowWidth = window.innerWidth,
    $header = $('.rs-header'),
    $searchBtn = $('.rs-header-search__btn'),
    $searchField = $('.rs-header-search__control'),
    $overflow = $('#overlaySection');

  $(document).on('ready', function () {
    if (windowWidth <= 768) {
      $searchBtn.on('click', function (e) {
        if ($searchField.val() === '') {
          e.preventDefault();

          if($header.hasClass('search-animation-start')) {
            $header.removeClass('search-animation-start');
            $searchField.blur();
            $overflow.removeClass('active');
          } else {
            $header.addClass('search-animation-start');
            $('input.rs-header-search__control').focus();
            $overflow.addClass('active');
          }

        }
      });
    }

    // remove cover block - hack for OS X systems
    $overflow.click(function(){
      $(this).removeClass('active');
      $header.removeClass('search-animation-start');
      $searchField.val('');
      $searchField.blur();
    });
  });

})(jQuery);