//
// Grid Second
//
// Libraries: jQuery, jQuery Migrate, Isotope, Isotope Masonry Horizontal, Infinite Scroll

(function ($) {
  var windowWidth = window.innerWidth,
    $grid2 = $('#grid2'),
    currentCat = '*';

  $(document).on('ready', function () {
    var i2 = 0;

    $grid2.isotope({
      itemSelector: '.cbp-item',
      percentPosition: true,
      masonry: {
        columnWidth: '.grid-sizer'
      }
    });

    $grid2.infiniteScroll({
      path: function () {
        return '/reso/ajax/galleryList2.json';
      },
      responseType: 'text',
      history: false
    });

    $grid2.on('load.infiniteScroll', function (event, response) {
      var data2 = JSON.parse(response),
        arrayLength2 = data2.length;

      if (i2 < arrayLength2) {
        currentCat = $grid2.data('current-category');

        if (currentCat === '*' || currentCat === '.' + data2[i2].infSection) {
          var $template2 = '<div class="cbp-item g-grid__item ' + data2[i2].infSection + '">' +
            '<div class="inf__item mb-0">' +
            '<a href="#!" class="inf__item__imgLink inf__item__imgLink--green">' +
            '<img src="' + data2[i2].infItemImg + '" alt="Image">' +
            '</a>' +
            '<div class="inf__item_half g-bg-green"></div>' +
            '<div class="inf__item_half__inner">' +
            '<div class="rs-user-dropdown">' +
            '<div class="media-body d-flex justify-content-end">' +
            '<div class="dropdown">' +
            '<a id="moreDropdown' + data2[i2].id + 'Invoker" class="u-link-v5 g-line-height-0 g-font-size-24 g-color-white ml-2 ml-md-4 g-dot_wrap d-flex align-items-center" href="#!" aria-haspopup="true" aria-expanded="false" data-toggle="dropdown">' +
            '<span class="g-dot dot-1"></span>' +
            '<span class="g-dot dot-2"></span>' +
            '<span class="g-dot dot-3"></span>' +
            '</a>' +
            '<div class="rs-dropdown dropdown-menu dropdown-menu-right" aria-labelledby="moreDropdown' + data2[i2].id + 'Invoker">' +
            '<div class="rs-dropdown-content">' +
            '<h5 class="rs-dropdown__title">Actions</h5>' +
            '<a class="rs-dropdown__item" href="#">' +
            '<i class="fa fa-edit rs-dropdown__item-icon"></i>' +
            'Edit' +
            '</a>' +
            '<a class="rs-dropdown__item" href="#">' +
            '<i class="fa fa-trash rs-dropdown__item-icon"></i>' +
            'Delete' +
            '</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="media align-items-center g-cursor-pointer mb-2">' +
            '<div class="d-flex mr-2">' +
            '<div class="g-brd-around g-brd-3 g-brd-white rounded-circle">' +
            '<img class="rounded-circle g-width-40 g-height-40" src="' + data2[i2].infItemAvatarImg + '" alt="Image Description">' +
            '</div>' +
            '</div>' +
            '<div class="media-body d-inline-flex align-items-end flex-column justify-content-end">' +
            '<h4 class="g-font-primary-bold g-color-white g-font-size-12 mb-0 g-letter-spacing-0_5">' + data2[i2].infItemAvatarName + '</h4>' +
            '</div>' +
            '</div>' +
            '<h4 class="g-font-size-16 g-font-primary-semiBold g-color-white text-uppercase">' + data2[i2].infItemBadge + '</h4>' +
            '<a href="#!" class="g-font-size-26 g-font-primary-semiBold g-color-white g-line-height-30 text-right inf__item_half__inner__txt mb-2 g-text-underline--none--hover">' + data2[i2].infItemTitle + '</a>' +
            '<div class="d-flex align-items-center justify-content-end text-white">' +
            '<span class="d-inline-flex align-items-center">' +
            '<i class="reso-icon-members-heads rs-icon-xlg"></i>' +
            '<span class="g-font-size-13 g-font-primary-semiBold ml-2">' + data2[i2].infItemPeople + '</span>' +
            '</span>' +
            '<span class="d-inline-flex align-items-center ml-4">' +
            '<i class="reso-icon-comment rs-icon-xmd"></i>' +
            '<span class="g-font-size-13 g-font-primary-semiBold ml-2">' + data2[i2].infItemMessages + '</span>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
            newAddedItem2 = $($template2);

          $grid2.append(newAddedItem2).isotope('appended', newAddedItem2);

          var $dropdown = newAddedItem2.find('.dropdown');

          $dropdown.on('show.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
          });

          $dropdown.on('hide.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
          });

          newAddedItem2.find('.inf__item_half__inner__txt').mouseenter(function () {
            var $self = $(this),
              imgBox = $self.closest('div.inf__item').find('.inf__item__imgLink');

            imgBox.find('img').css('transform', 'scale(1.05)');
            imgBox.addClass('inf__itemTransparent');
          }).mouseleave(function () {
            var $self = $(this),
              imgBox = $self.closest('div.inf__item').find('.inf__item__imgLink');

            imgBox.find('img').css('transform', 'scale(1)');
            imgBox.removeClass('inf__itemTransparent');
          });
        }
      }

      i2++;
    });
  });
})(jQuery);