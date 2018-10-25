//
// Userpic
//
// Libraries: FilePond

(function ($) {
  $.fn.filepond.registerPlugin(FilePondPluginImagePreview);

  var $filepond = $('.filepond');

  $(document).ready(function () {
    $filepond.each(function () {
      var $this = $(this),
        placeholderImg = $this.data('placeholder-img'),
        dimensions = JSON.parse(this.getAttribute('data-dimensions'));

      $this.filepond({
        labelIdle: '<i class="fa fa-camera-retro filepond--drop-label-icon"></i>',
        labelFileLoading: '',
        labelTapToCancel: '',
        imagePreviewWidth: dimensions.width,
        imagePreviewHeight: dimensions.height,
        imageCropAspectRatio: '1:1',
        imageResizeTargetWidth: dimensions.width,
        imageResizeTargetHeight: dimensions.height
      });

      $this.filepond('allowImagePreview', true);

      if (placeholderImg) {
        $this.filepond('addFile', placeholderImg);
      }
    });
  });
})(jQuery);