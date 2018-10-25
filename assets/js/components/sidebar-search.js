//
// Sidebar Search
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $invoker = $('.rs-search-invoker'),
    $target = $('.rs-search-body');

  $(document).on('ready', function () {
    $invoker.on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      $invoker.toggleClass('opened');
      $target.slideToggle(400);
    });

    $target.on('click', function (e) {
      e.stopPropagation();
    });
  });

  $(document).on('click', function (e) {
    if ($invoker.is(':visible')) {
      $invoker.removeClass('opened');
      $target.slideUp(400);
    }
  });

  $(window).on('resize', function (e) {
    var windowWidth = window.innerWidth;

    if (windowWidth >= 769) {
      $invoker.removeClass('opened');
      $target.show();
    }
  });
})(jQuery);