//
// Article page
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  $(document).on('ready', function () {
    $('.scrollToArticleComment').click(function(){
      var el = $(this).attr('href');
      $('body, html').animate({scrollTop: $(el).offset().top - 130 }, 1000);
      return false;
    });
  });
})(jQuery);
