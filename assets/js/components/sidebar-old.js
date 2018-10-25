//
// Sidebar
//
// Libraries: jQuery, jQuery Migrate, Malihu Custom Scrollbar

(function ($) {
  $(document).on('ready', function () {
    var JSONPath = '/reso/ajax/activityList.json',
      i = 0,
      i2 = 0;

    $('.rs-sidebar-content').mCustomScrollbar({
      mouseWheelPixels: 500,
      callbacks: {
        whileScrolling: function () {
          if (this.mcs.topPct >= 90) {
            $.getJSON(JSONPath, function (data) {
              if (i < data.length) {
                for (i; i < i2; i++) {
                  var $template = '<div class="media border-bottom flex-column width-full py-2">' +
                    '<div class="d-flex align-items-center width-full pr-4 mb-1">' +
                    '<div class="rounded-circle mr-2">' +
                    '<a href="#!">' +
                    '<img class="rounded-circle g-width-40 g-height-40 mCS_img_loaded" src="' + data[i].avatar + '" alt="Image Description">' +
                    '</a>' +
                    '</div>' +
                    '<div class="media-body d-inline-flex align-items-start flex-column justify-content-end">' +
                    '<a href="#!" class="g-font-primary-bold g-color-black g-font-size-14 g-line-height-18 g-text-underline--none--hover">' + data[i].name + '</a>' +
                    '<span class="rs-badge rs-badge-grey g-font-primary-boldItalic">' + data[i].tag + '</span>' +
                    '</div>' +
                    '<span class="g-font-size-12 g-font-primary-mediumItalic g-color-grey-v2 ml-auto">' + data[i].timeAgo + '</span>' +
                    '</div>' +
                    '<div class="media-body d-inline-flex align-items-start flex-column justify-content-start g-pl-47 g-pr-20">' +
                    '<p class="g-font-primary-light g-color-grey g-font-size-13 mb-0">a créé ' + data[i].discussionsQty + ' discussions ' + data[i].description + '</p>' +
                    '</div>' +
                    '</div>',
                    newAddedItem = $($template);

                  $('.rs-activity-list').append(newAddedItem);

                  var $toggler = newAddedItem.find('.sidebar__tous');

                  $toggler.each(function () {
                    var $content = newAddedItem.find('.sidebar__tous__list');

                    $(this).click(function () {
                      $content.toggleClass('active');
                      $(this).toggleClass('active');
                    });
                  });
                }
              }
            });

            i2 += 1;
          }
        }
      }
    });
  });
})(jQuery);