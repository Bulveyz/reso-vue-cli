//
// Textarea
//
// Libraries: jQuery, jQuery Migrate, Bootstrap.js

(function ($) {
  var $textarea = $('rs-textarea');

  $(document).on('ready' , function () {

    if($textarea.length) {
      $($textarea).keyup(function(){
        $(this).height(40);
        $(this).height(this.scrollHeight);
      });
    }

    $('.rs-comment__new_placeholder').on('click', function() {
      $(this).parent().addClass('active');
      $(this).addClass('d-none');
      $(this).parent().find('.rs-comment__new_textarea').removeClass('opacity-none').focus();
      $(this).parent().find('.rs-comment__new_send').addClass('d-none');
      $('.rs-comment__new_bottom').removeClass('hide');
    });

    $('.rs-comment__new_textarea').on('keyup', function() {
      if($(this).length) {
        $('.rs-comment__new_send').prop("disabled", false);
      } else {
        $('.rs-comment__new_send').prop("disabled", true);
      }
    });

    // mouseup
    $(document).mouseup(function(e) {
      var commentBlock = $(".rs-comment__new");
      if (!commentBlock.is(e.target) && commentBlock.has(e.target).length === 0) {
        $('.rs-comment__new_textarea__wrap').removeClass('active');
        $('.rs-comment__new_send').removeClass('d-none');
        $('.rs-comment__new_bottom').addClass('hide');
        $('.rs-comment__new_placeholder').removeClass('d-none');
        $('.rs-comment__new_textarea').addClass('opacity-none');
      }
    });


  });
})(jQuery);
