//
// Bottom nav
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  $(document).on('ready', function () {

    $('.rs-bottom-nav__item').on('click', function() {
      var $self = $(this);
      var $selfHref = $self.attr('href');
      var anchor = $('.rs-dropdown-transformed__btn');

      console.log($selfHref);

      if($selfHref == '#sidebarSlider' || $selfHref == '#sidebarBell' || $selfHref == '#sidebarSondage') {
        $('.rs-project-body').addClass('rs-btmNav');
      } else {
        $('.rs-project-body').removeClass('rs-btmNav');
      }
      
      if($self.hasClass('active')) {
        return false;
      } else {
        $('.rs-bottom-nav__item').each(function() {
          $(this).removeClass('active');
        });

        $('.rs-mobile-navbox').each(function() {
          $(this).addClass('d-none');
        })

        $(this).addClass('active');
        $($selfHref).removeClass('d-none');
        $('.rs-aside__slider').slick('refresh');

        $('body, html').animate({scrollTop: $(anchor).offset().top}, 400);
      }
    });

  });
})(jQuery);

