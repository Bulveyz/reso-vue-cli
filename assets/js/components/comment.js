//
// Comment
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $comment = $('.rs-comment__posted_voite'),
      $like = $('.rs-comment__posted_like'),
      onLoadBox = 0;
      onLoadBoxMobile = 0;
      $totalVoite = $('#totalVoite'),
      $totalVoiteMobile = $('#totalVoiteMobile');

  $(document).on('ready', function () {

    $comment.on('click', function() {
      $(this).parents().closest('form').find('.rs-comment__posted').slideToggle();
    });

    $like.on('click', function() {
      var $self = $(this);
      var voitedSpan = $(this).find('span');
      var voitedNumber = +voitedSpan.text();

      if($self.hasClass('liked')) {
        $self.removeClass('liked')
        voitedSpan.text(--voitedNumber);
        // $totalVoite.text(--onLoadBox);
      } else {
        $self.addClass('liked')
        voitedSpan.text(++voitedNumber);
        // $totalVoite.text(++onLoadBox);
      }

    });


    $(".form-check-label input").click(function() {

      $('input[type=radio]').attr('disabled', true);
      $('input[type=radio]').parent().addClass('disabled');
      $(this).attr( 'checked', true ).removeAttr('disabled', false).parent().removeClass('disabled');
      $totalVoite.text(++onLoadBox);
      $totalVoiteMobile.text(++onLoadBoxMobile);
    });

    // $('.rs-dropdown-show-onhover').on('click', function(e){
    //   return false;
    // });

    $('.rs-comment__posted_field').on('mouseleave', function() {
      $(".dropdown").removeClass("show");
      $('.rs-dropdown').removeClass("show").css('display', 'none');
    });

    $('.rs-comments-show').on('click', function() {
      $(this).addClass('d-none');
      $(this).parent().parent().find('.rs-show-others').slideDown();
      $(this).parent().find('.rs-comments-hide').removeClass('d-none');
    });

    $('.rs-comments-hide').on('click', function() {
      $(this).addClass('d-none');
      $(this).parent().parent().find('.rs-show-others').slideUp();
      $(this).parent().find('.rs-comments-show').removeClass('d-none');
    });

    $('.rs-repondre-btn').on('click', function() {
      $(this).parent().parent().find('.rs-repondre').slideToggle().find('textarea').focus();
    });

  });

  $(window).on('load', function () {
    $('.rs-comment__posted_like').each(function() {
      var voiteCount = +($(this).find('span').text());
      onLoadBox += voiteCount;
      onLoadBoxMobile += voiteCount;
    });
    $totalVoite.text(onLoadBox);
    $totalVoiteMobile.text(onLoadBoxMobile);
  });

})(jQuery);