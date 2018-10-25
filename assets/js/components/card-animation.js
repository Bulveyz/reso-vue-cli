//
// Card Animation
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  $(document).on('ready', function () {
    $('.inf__item_half__inner__txt').mouseenter(function () {
      var $self = $(this);
      var imgBox = $self.closest('div.inf__item').find('.inf__item__imgLink');

      imgBox.find('img').css('transform', 'scale(1.05)');
      imgBox.addClass('inf__itemTransparent');
    }).mouseleave(function () {
      var $self = $(this);
      var imgBox = $self.closest('div.inf__item').find('.inf__item__imgLink');

      imgBox.find('img').css('transform', 'scale(1)');
      imgBox.removeClass('inf__itemTransparent');
    });
  });
})(jQuery);