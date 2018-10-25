//
// sidebar show activities
//
// Libraries: jQuery, jQuery Migrate, Malihu Custom Scrollbar

(function ($) {
  $(document).on('ready', function () {
    $('#rsShowActivitiesOther').on('click', function() {
      $('.rs-sidebar_activities_other').slideToggle();
      $(this).toggleClass('active');
    });
  });
})(jQuery);
