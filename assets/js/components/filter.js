//
// Filter
//
// Libraries: jQuery, jQuery Migrate, Isotope, Isotope Masonry Horizontal, Malihu Custom Scrollbar

(function ($) {
  var windowWidth = window.innerWidth,
    $filetrInvoker = $('.rs-filter__invoker'),
    $filter = $('.rs-filter-menu'),
    $filterItem = $('.rs-filter-menu__item'),
    $grid = $('#grid1'),
    $grid2 = $('#grid2'),
    currentCat = '*';

  $(document).on('ready', function () {
    $filterItem.on('click', function () {
      var $this = $(this),
        filterValue = $this.data('filter');

      currentCat = filterValue;

      $grid.data('current-category', filterValue);
      $grid2.data('current-category', filterValue);

      $filterItem.removeClass('active');
      $this.addClass('active');

      $grid.isotope({
        filter: filterValue
      });

      $grid2.isotope({
        filter: filterValue
      });
    });

    if (windowWidth <= 992) {
      $filetrInvoker.addClass('mobile-mode');

      if ($filetrInvoker.hasClass('mobile-mode')) {
        $filetrInvoker.on('click', function (e) {
          e.preventDefault();

          var $this = $(this),
            target = $this.data('target');

          $(target).slideToggle(400);
        });
      } else {
        $filetrInvoker.removeClass('mobile-mode');
      }

      $filterItem.on('click', function () {
        $filter.slideUp(400);
      });
    }
  });

  $(window).on('resize', function () {
    var newWindowWidth = window.innerWidth,
      $newFiletrInvoker = $('.rs-filter__invoker');

    if (newWindowWidth <= 992) {
      $newFiletrInvoker.addClass('mobile-mode');
    } else {
      $newFiletrInvoker.removeClass('mobile-mode');
    }
  });
})(jQuery);