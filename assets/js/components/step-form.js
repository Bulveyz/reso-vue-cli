//
// Step Form
//
// Libraries: jQuery, jQuery Migrate, jQuery Validation

(function ($) {
  var $stepForm = $('.rs-step-form');

  $(document).on('ready', function () {
    $stepForm.each(function () {
      //Variables
      var $self = $(this),
        progressID = $self.data('progress-id'),
        $progressItems = $(progressID).find('> *'),
        stepsID = $self.data('steps-id'),
        $stepsItems = $(stepsID).find('> *'),
        $stepsActiveItem = $(stepsID).find('> .active');

      $stepsItems.not('.active').hide();
      $progressItems.eq($stepsActiveItem.index()).addClass('active');

      $('[data-next-step]').on('click', function (e) {
        if ((!$self.valid())) {
          return false;
        }

        e.preventDefault();

        var $this = $(this),
          nextID = $this.data('next-step');

        $progressItems.removeClass('active current');
        $progressItems.eq($(nextID).index() - 1).addClass('checked');
        $progressItems.eq($(nextID).index()).addClass('active current');

        $stepsItems.hide().removeClass('active');
        $(nextID).fadeIn(400).addClass('active');

        $('html, body').stop().animate({
          'scrollTop': 0
        }, 800);
      });

      $('[data-previous-step]').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
          prevID = $this.data('previous-step');

        $progressItems.removeClass('active');
        $progressItems.eq($(prevID).index() - 1).addClass('checked');
        $progressItems.eq($(prevID).index()).addClass('active');

        $stepsItems.hide().removeClass('active');
        $(prevID).fadeIn(400).addClass('active');

        $('html, body').stop().animate({
          'scrollTop': 0
        }, 800);
      });

      $progressItems.on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
          toID = $this.data('to-step');

        if ($this.hasClass('checked') || $this.hasClass('current')) {
          $progressItems.removeClass('active');
          $this.addClass('active');

          $stepsItems.hide().removeClass('active');
          $(toID).fadeIn(400).addClass('active');

          $('html, body').stop().animate({
            'scrollTop': 0
          }, 800);
        } else {
          return false;
        }
      });
    });
  });
})(jQuery);