//
// Content Toggle
//
// Libraries: jQuery, jQuery Migrate, Moment.js, Flatpickr, Slick Carousel

(function ($) {
  function get2DigitFmt(val) {
    return ('0' + val).slice(-2);
  }

  $(document).on('ready', function () {
    var $datepicker = $('#datetimepickerEvents'),
      dates = $datepicker.data('rp-event-dates'),
      $calendarCarousel = $('.rs-calendar-events');

    $datepicker.flatpickr({
      inline: true,
      mode: 'single',
      dateFormat: 'd M Y',
      locale: 'fr',
      shorthandCurrentMonth: true,
      nextArrow: '<i class="reso-icon-angle-right-rounded rs-icon-smd"></i>',
      prevArrow: '<i class="reso-icon-angle-left-rounded rs-icon-smd"></i>',
      onDayCreate: function (dObj, dStr, fp, dayElem) {
        var date = $(dayElem)[0].dateObj,
          key = date.getFullYear() + '-' + get2DigitFmt(date.getMonth() + 1) + '-' + get2DigitFmt(date.getDate());

        if ($.inArray(key, dates) !== -1) {
          $(dayElem).addClass('has-event');
          $(dayElem).attr('data-slide-to', key);
        }
      },
      onReady: function () {
        $calendarCarousel.slick({
          arrows: false,
          dots: true,
          infinite: false
        });
      },
      onChange: function (date, fullDate) {
        var date = $(date)[0],
          key = date.getFullYear() + '-' + get2DigitFmt(date.getMonth() + 1) + '-' + get2DigitFmt(date.getDate()),
          targetSlideIndex = $calendarCarousel.find('.slick-slide[data-trigger-date="' + key + '"]').attr('data-slick-index');

        if ($calendarCarousel.find('.slick-slide[data-trigger-date="' + key + '"]').length) {
          $calendarCarousel.slick('slickGoTo', parseInt(targetSlideIndex));
        }
      }
    });
  });
})(jQuery);