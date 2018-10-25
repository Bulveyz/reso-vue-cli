//
// Video
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $video = $('.rs-video');

  $(document).on('ready', function () {
    $video.each(function () {
      var $this = $(this),
        $play = $this.find('.rs-video__play-btn'),
        $target = document.getElementById($play.data('target'));

      $target.addEventListener('ended', videoIsEnded, false);

      $play.on('click', function (e) {
        e.preventDefault();

        $this.addClass('is-played');
        $target.play();
      });

      function videoIsEnded(e) {
        $this.removeClass('is-played');
      }
    });
  });
})(jQuery);