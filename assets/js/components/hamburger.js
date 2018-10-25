//
// Hamburger
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  $(document).on('ready', function () {
    var isOpened = false,
      $hamburger = $('.rs-hamburger'),
      $sidebar = $('#sidebar'),
      $overlay = $('.rs-sidebar-overlay'),
      $document = $('html, body');

    $hamburger.on('click', function () {
      var $this = $(this);

      if (isOpened === false) {
        $this.addClass('is-open').removeClass('is-closed');
        $sidebar.addClass('active');
        $overlay.addClass('active');

        $sidebar.on('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function (e) {
          $document.addClass('is-sidebar-opened');
        });


        isOpened = true;
      } else {
        $this.removeClass('is-open').addClass('is-closed');
        $sidebar.removeClass('active');
        $overlay.removeClass('active');
        $document.removeClass('is-sidebar-opened');

        isOpened = false;
      }
    });

    $overlay.on('click', function () {
      var $this = $(this);

      $this.removeClass('active');
      $sidebar.removeClass('active');
      $document.removeClass('is-sidebar-opened');
      $hamburger.removeClass('is-open').addClass('is-closed');

      isOpened = false
    });
  });
})(jQuery);