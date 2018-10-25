//
// Grid First
//
// Libraries: jQuery, jQuery Migrate, Isotope, Isotope Masonry Horizontal, Perfect Scroll

(function ($) {
  var windowWidth = window.innerWidth,
    $grid = $('#grid1'),
    currentCat = '*',
    JSONPath = '/reso/ajax/galleryList.json',
    $scrollFirst = document.querySelector('#scrollFirst'),
    $scrollSecond = document.querySelector('#scrollSecond');

  $(document).on('ready', function () {
    if (windowWidth >= 992) {
      $grid.isotope({
        itemSelector: '.cbp-item',
        percentPosition: true,
        masonry: {
          columnWidth: '.grid-sizer'
        }
      });
    } else {
      $grid.isotope({
        itemSelector: '.cbp-item',
        layoutMode: 'masonryHorizontal'
      });
    }

    var i3 = 0,
      i4 = 0;

    if (windowWidth <= 992) {
      var scrollFirstInit = new PerfectScrollbar($scrollFirst);

      $scrollFirst.scrollLeft = 275;

      $scrollFirst.addEventListener('ps-x-reach-end', function () {
        $.getJSON(JSONPath, function (data) {
          if (i3 < data.length) {
            currentCat = $grid.data('current-category');

            if (currentCat === '*' || currentCat === '.' + data[i3].category.slug) {
              for (i3; i3 < i4; i3++) {
                var $template = '<div class="cbp-item g-grid__item ' + data[i3].category.slug + '">' +
                  '<div class="rs-portlet g-bg-white g-rounded-4">' +
                  '<div class="rs-portlet__top mb-2">' +
                  '<span class="g-font-primary g-font-size-13 g-color-main">' + data[i3].date + '</span>' +
                  '<div class="media align-items-center g-cursor-pointer">' +
                  '<div class="media-body d-inline-flex align-items-end flex-column justify-content-end">' +
                  '<h4 class="g-font-primary-bold g-color-grey g-font-size-12 g-letter-spacing-0_1 mb-1">' + data[i3].name + '</h4>' +
                  '<span class="rs-badge rs-badge-grey rs-badge-grey--hover" data-toggle="tooltip" data-placement="top" title="' + data[i3].tooltipTitle + '">' + data[i3].tag + '</span>' +
                  '</div>' +
                  '<div class="d-flex ml-2">' +
                  '<div class="rounded-circle">' +
                  '<img class="rounded-circle g-width-40 g-height-40" src="' + data[i3].avatar + '" alt="Image Description">' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<a href="#!" class="g-font-size-18 g-color-main g-font-primary-semiBold g-line-height-21 g-text-underline--none--hover">' + data[i3].title + '</a>' +
                  '<a href="#!" class="d-block mb-3 g-font-primary-light g-font-size-12 g-color-grey-v2 g-color-grey-v2--hover g-line-height-18 g-text-underline--none--hover">' + data[i3].description + '</a>' +
                  '<div class="d-flex align-items-center justify-content-between rs-portlet_manual mb-2">' +
                  '<a href="#!" class="d-inline-flex align-items-center g-text-underline--none--hover">' +
                  '<i class="reso-icon-comment rs-icon-md text-grey"></i>' +
                  '<span class="g-font-size-15 g-color-grey-v3 g-font-primary-light ml-1">' + data[i3].mesagesQty + '</span>' +
                  '</a>' +
                  '<i class="reso-icon-pin rs-icon-xmd text-danger"></i>' +
                  '</div>' +
                  '<div class="d-flex align-items-center rs-portlet_bottom">' +
                  '<div class="rs-badge rs-badge--card rs-badge-green g-font-size-12">' + data[i3].category.name + '</div>' +
                  '<div class="rs-portlet_bottom_links g-line-height-1">' +
                  '<span class="g-font-size-11 g-font-primary-bold g-color-green">' + data[i3].category.ferme + '</span>' +
                  '<span class="g-font-size-11 g-font-primary-bold g-color-green">|</span>' +
                  '<span class="g-font-size-11 g-font-primary-bold g-color-green">' + data[i3].category.text + '</span>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>',
                  newAddedItem = $($template);

                $grid.append(newAddedItem).isotope('appended', newAddedItem);

                var $tooltip = newAddedItem.find('[data-toggle="tooltip"]'),
                  $parent = $tooltip.parents('.rs-tooltips-fixed');

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
              }

              $scrollFirst.scrollLeft += -30;
            }
          }
        });

        i4 += 1;
      });

      $grid.on('arrangeComplete', function (event, filteredItems) {
        scrollFirstInit.update();
      });

      $(window).on('resize', function() {
        scrollFirstInit.update();
      });
    } else {
      var scrollSecondInit = new PerfectScrollbar($scrollSecond, {
        railYHeight: 524
      });

      $scrollSecond.addEventListener('ps-y-reach-end', function () {
        $.getJSON(JSONPath, function (data) {
          if (i3 < data.length) {
            currentCat = $grid.data('current-category');

            if (currentCat === '*' || currentCat === '.' + data[i3].category.slug) {
              for (i3; i3 < i4; i3++) {
                var $template = '<div class="cbp-item g-grid__item ' + data[i3].category.slug + '">' +
                  '<div class="rs-portlet g-bg-white g-rounded-4">' +
                  '<div class="rs-portlet__top mb-2">' +
                  '<span class="g-font-primary g-font-size-13 g-color-main">' + data[i3].date + '</span>' +
                  '<div class="media align-items-center g-cursor-pointer">' +
                  '<div class="media-body d-inline-flex align-items-end flex-column justify-content-end">' +
                  '<h4 class="g-font-primary-bold g-color-grey g-font-size-12 g-letter-spacing-0_1 mb-1">' + data[i3].name + '</h4>' +
                  '<span class="rs-badge rs-badge-grey rs-badge-grey--hover" data-toggle="tooltip" data-placement="top" title="' + data[i3].tooltipTitle + '">' + data[i3].tag + '</span>' +
                  '</div>' +
                  '<div class="d-flex ml-2">' +
                  '<div class="rounded-circle">' +
                  '<img class="rounded-circle g-width-40 g-height-40" src="' + data[i3].avatar + '" alt="Image Description">' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<a href="#!" class="g-font-size-18 g-color-main g-font-primary-semiBold g-line-height-21 g-text-underline--none--hover">' + data[i3].title + '</a>' +
                  '<a href="#!" class="d-block mb-3 g-font-primary-light g-font-size-12 g-color-grey-v2 g-color-grey-v2--hover g-line-height-18 g-text-underline--none--hover">' + data[i3].description + '</a>' +
                  '<div class="d-flex align-items-center justify-content-between rs-portlet_manual mb-2">' +
                  '<a href="#!" class="d-inline-flex align-items-center g-text-underline--none--hover">' +
                  '<i class="reso-icon-comment rs-icon-md text-grey"></i>' +
                  '<span class="g-font-size-15 g-color-grey-v3 g-font-primary-light ml-1">' + data[i3].mesagesQty + '</span>' +
                  '</a>' +
                  '<i class="reso-icon-pin rs-icon-xmd text-danger"></i>' +
                  '</div>' +
                  '<div class="d-flex align-items-center rs-portlet_bottom">' +
                  '<div class="rs-badge rs-badge--card rs-badge-green g-font-size-12">' + data[i3].category.name + '</div>' +
                  '<div class="rs-portlet_bottom_links g-line-height-1">' +
                  '<span class="g-font-size-11 g-font-primary-bold g-color-green">' + data[i3].category.ferme + '</span>' +
                  '<span class="g-font-size-11 g-font-primary-bold g-color-green">|</span>' +
                  '<span class="g-font-size-11 g-font-primary-bold g-color-green">' + data[i3].category.text + '</span>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '</div>',
                  newAddedItem = $($template);

                $grid.append(newAddedItem).isotope('appended', newAddedItem);

                var $tooltip = newAddedItem.find('[data-toggle="tooltip"]'),
                  $parent = $tooltip.parents('.rs-tooltips-fixed');

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
              }

              $scrollSecond.scrollTop += -30;
            }
          }
        });

        i4 += 1;
      });

      $grid.on('arrangeComplete', function (event, filteredItems) {
        scrollSecondInit.update();
      });
    }
  });
})(jQuery);