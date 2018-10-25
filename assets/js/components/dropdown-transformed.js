//
// Dropdown Transformed
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $dropdown = $('.rs-dropdown-transformed'),
    $body = $('body'),
    windowWidth = window.innerWidth;

  $(document).on('ready', function () {
    if (windowWidth <= 768) {
      $body.addClass('is-mobile-mode');
    } else {
      $body.removeClass('is-mobile-mode');
    }

    $dropdown.each(function () {
      var $this = $(this),
        $dropdownBtn = $this.children('.rs-dropdown-transformed__btn'),
        $dropdownMenu = $this.children('.rs-dropdown-transformed-menu'),
      isMenuOpened = false;

      $dropdownBtn.on('click', function(e) {
        if ($body.hasClass('is-mobile-mode')) {
          if(isMenuOpened === false) {
            $dropdownBtn.addClass('is-opened');
            $dropdownMenu.find('.active').hide();
            $dropdownMenu.slideDown(400, function() {
              isMenuOpened = true;
            });
          } else {
            $dropdownMenu.slideUp(400, function() {
              $dropdownBtn.removeClass('is-opened');
              $dropdownMenu.find('.active').show();

              isMenuOpened = false;
            });
          }
        } else {
          return false;
        }
      });
    });
  });

  $(window).on('resize', function () {
    var newWindowWidth = window.innerWidth;

    if (newWindowWidth <= 768) {
      $body.addClass('is-mobile-mode');
    } else {
      $body.removeClass('is-mobile-mode');
    }
  });
})(jQuery);