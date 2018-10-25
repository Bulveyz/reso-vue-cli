//
// Edit Field
//
// Libraries: jQuery, jQuery Migrate

(function ($) {
  var $editable = $('.rs-editable');

  $(document).on('ready', function () {
    if ($editable.length) {
      $editable.each(function () {
        var $this = $(this),
          $editableField = $this.children('.rs-editable__control'),
          type = $editableField.attr('type'),
          editableFieldTitle = $editableField.data('title'),
          $editableEditBtn = $this.children('.rs-editable__btn.and-edit'),
          $editableDoneBtn = $this.children('.rs-editable__btn.and-done'),
          initValue = $editableField.val();

        if (type === 'email' || type === 'tel' || type === 'url') {
          $this.addClass('has-link');
        }

        switch (type) {
          case 'email':
            $('<a class="rs-editable__pseudo-link" href="mailto:' + initValue + '">' + initValue + '</a>').prependTo($this);
            break;

          case 'tel':
            $('<a class="rs-editable__pseudo-link" href="tel:' + initValue + '" target="_blank">' + initValue + '</a>').prependTo($this);
            break;

          case 'url':
            $('<a class="rs-editable__pseudo-link" href="' + initValue + '" target="_blank">' + (editableFieldTitle ? editableFieldTitle : initValue) + '</a>').prependTo($this);
            break;

          default:
            $('<span class="rs-editable__pseudo-text">' + (editableFieldTitle ? editableFieldTitle : initValue) + '</span>').prependTo($this);
        }

        $editableEditBtn.on('click', function (e) {
          e.preventDefault();

          $this.addClass('is-focus');
          $editableField.attr('readonly', false).trigger('focus').select();
        });

        $editableDoneBtn.on('click', function (e) {
          e.preventDefault();

          if ($editableField.val() === '') {
            $editableField.val(initValue);
          }

          $editableField.attr('readonly', true);
          $this.removeClass('is-change is-focus is-without-init-value');

          switch (type) {
            case 'email':
              $this.children('.rs-editable__pseudo-link').text($editableField.val()).attr('href', 'email:' + $editableField.val());
              break;

            case 'tel':
              $this.children('.rs-editable__pseudo-link').text($editableField.val()).attr('href', 'tel:' + $editableField.val());
              break;

            case 'url':
              $this.children('.rs-editable__pseudo-link').text(editableFieldTitle ? editableFieldTitle : $editableField.val()).attr('href', $editableField.val());
              break;

            default:
              $this.children('.rs-editable__pseudo-text').text(editableFieldTitle ? editableFieldTitle : $editableField.val());
          }

          initValue = $editableField.val();
        });

        $editableField.on('keyup', function () {
          $this.addClass('is-change is-focus');

          if ($editableField.val() === initValue) {
            $this.removeClass('is-change is-focus');
          }
        });

        $(document).on('click', function (e) {
          if ($(e.target).closest($this).length === 0) {
            if (!$this.hasClass('is-without-init-value')) {
              $editableField.attr('readonly', true);
              $editableField.val(initValue);
              $this.removeClass('is-change is-focus');
            } else {
              $editableField.val('');
              $this.removeClass('is-change is-focus');
            }
          }
        });
      });
    }
  });
})(jQuery);