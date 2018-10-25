//
// Custom Select
//
// Libraries: jQuery, jQuery Migrate, jQuery Validation, Select2

/*
  * for using custom member select should add this html code

  <div class="rs-form-group and-has-icon form-group mb-0 rs-member-select">
    <select class="rs-custom-select-member and-has-icon" id="js-select2-venue" style="width: 100%;"></select>
  </div>
*/

(function ($) {

  $(document).ready(function () {

    // custom select for members page
    var $selectMember = $('.rs-custom-select-member');
    $selectMember.select2();
    
    var membersSearchList = [
      { id: 'member-1', imgSrc: 'img1.jpg', name: 'Pat Hibulaire', text: 'Recherchez dans la liste…', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-2', imgSrc: 'img2.jpg', name: 'Bob Dropbox 2', text: 'Charge de mission', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-3', imgSrc: 'img1.jpg', name: 'Charlie Dropbox 3', text: 'Charge de mission 1', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-4', imgSrc: 'img2.jpg', name: 'Jonny Dropbox 4', text: 'Charge de mission 2', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-5', imgSrc: 'img1.jpg', name: 'Snoop Dropbox 5', text: 'Charge de mission 3', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-6', imgSrc: 'img2.jpg', name: 'Chester Dropbox 6', text: 'Charge de mission 4', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-7', imgSrc: 'img1.jpg', name: 'Marlyn Dropbox 7', text: 'Charge de mission 5', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-8', imgSrc: 'img2.jpg', name: 'Mike Dropbox 8', text: 'Charge de mission 6', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
      { id: 'member-9', imgSrc: 'img1.jpg', name: 'Mike Dropbox 9', text: 'Charge de mission 7', draaf: 'Direction Régionale de l\'Alimentation de l\'Agriculture et de la Forêt' },
    ];

    var inviterText = 'La personne que vous souhaitez ajauter au project nefait pa parti du Reso?';
    
    var input_values = ['', '', '', ''];
  
    //  Select2:select event handler
    /* var select_event = function (e, type, index) {
      var item = '<li class="item" data-type="' + type + '" data-_eq="' + e.params.data.id + '">' + e.params.data.name + '<span class="close"></span></li>';
      var target = $('#filterTagsUl .closeAll');
      $(item).insertBefore(target);
      $('#filterTagsUl').parent().removeClass('d_none').show();
      input_values[index] = '';
  
      if ($('.rs-select-member .select2-results__options li').attr('aria-selected', 'true')) {
        $('.sl-arrow').addClass('d-none');
        $('.sl-checked').removeClass('d-none');
      } else {
        $('.sl-arrow').removeClass('d-none');
        $('.sl-checked').addClass('d-none');
      }
  
      $('#overlaySection').toggleClass('active');
    }; */
  
    //  Select2:unselect event handler
    /* var unselect_event = function (e, type, index) {
      var item = $('#filterTagsUl').find('[data-type="' + type + '"][data-_eq="' + e.params.data.id + '"]');
      item.remove();
      isEmpty();
      input_values[index] = '';
    }; */

    // var isEmpty = function () {
     /* if (!$selectMember.val()) {
        $('#filterTags').addClass('d_none');
        $('.sl-arrow').removeClass('d-none');
        $('.sl-checked').addClass('d-none');
      }
    }
    */
  
    //  Select2:open event handler
    var open_event = function (e, index) {
      setTimeout(function () {
        $('#overlaySection').toggleClass('active');
        insert_input(index);
        $($('input.select2-search__field.default-search')[index]).val(input_values[index]).trigger('keyup');
      }, 0);
    };
  
    //  Insert custom input
    var insert_input = function (index, val) {
      if ($('span.select2-dropdown').last().find('ul').find('input').length > 0) { return true; }
      val = val || '';
      var search_input = ''; // search field
      $('span.select2-dropdown').last().find('ul').prepend(search_input);
      $('.custom-select__dropdown-search__field').val(val);
      $('.custom-select__dropdown-search__field').keyup(function (e) {
        var value = e.target.value;
        input_values[index] = value;
        $($('input.select2-search__field.default-search')[index]).val(value).trigger('keyup');
      });
      $('.custom-select__dropdown-search__field').focus();
    }
  
    //  Matcher
    var matcher = function (e, item, index) {
      if (!e.term) { return item; }
      if (item.name.toLowerCase().indexOf(e.term.toLowerCase()) !== -1) { return item; }
      setTimeout(function () {
        insert_input(index, input_values[index]);
      }, 0);
      return null;
    };
  
    var templateResult = function (state, index) {
      if (!state.id) return state.name;
      var head = state.name.substr(0, index);
      var bold_state = head + '<div class="media mb-1 align-items-start">' +
        '<a href="home.html" class="mr-3 rs-award">' +
          '<img class="rounded-circle" src="./assets/img/200x200/' + state.imgSrc + '" width="45" height="45" alt="Image Description">' +
        '</a>' +
        '<div class="media-body d-flex">' +
          '<div class="d-flex flex-column">' +
            '<a href="home.html" class="h5 font-weight-bold rs-mb-2 rs-text-black rs-text-danger-hover">' + state.name  +'</a>' +
            '<span class="h6 text-dark-grey mb-1">' + state.text  +'</span>' +
            '<span class="rs-badge rs-badge-grey rs-badge-grey--hover rs-width-60" data-toggle="tooltip" data-placement="top" title="' + state.draaf + '">Draaf</span>' +
          '</div>' +
        '</div>' +
        '<img class="mr-2" src="./assets/img/icons/plus-icon.svg" width="24px" height="24px"/>'
      '</div>'
      return bold_state;
    }
  

    var inviterBlock = '<div class="rs-inviter-block">' +
      '<p class="mb-3">' + inviterText + '</p>' +
      '<button class="btn btn-danger">Inviter un nouvel utilisateur</button>'
    '</div>'

    //  Init select2
    var $selectMember = $("#js-select2-venue").select2({
      dropdownParent: $('#rsMemberSelect'),
      data: membersSearchList,
      matcher: function (e, item) { return matcher(e, item, 0); },
      templateResult: function (state) { 
        insert_input(0, input_values[0]); 
        return templateResult(state, 0); 
      },
      escapeMarkup: function (markup) { return markup; },
      
      })
      //.on('select2:select', function (e) { select_event(e, 'membersSearchList', 0); })
      // .on('select2:unselect', function (e) { unselect_event(e, 'membersSearchList', 0); })
      .on('select2:open', function (e) { open_event(e, 0); });
  
  
    $selectMember.data('select2').$container.addClass("rs-select-member");
    $selectMember.data('select2').$dropdown.addClass("rs-select-member");
    $selectMember.data('select2').$dropdown.find(".select2-results").append(inviterBlock);

    // $(".select2-search__field").attr("data-placeholder","bar");

    $($('input.select2-search__field')[0]).hide().addClass('default-search').attr("placeholder","bar").blur();

    $('.select2-selection__rendered').text('Rechercher dans la liste');


    $('.rs-custom-select-member').on('select2:open', function (e) {
      $('.select2-results__options').mCustomScrollbar('destroy');
        setTimeout(function () {
          $('.select2-results__options').mCustomScrollbar();
        }, 0);
    });

  });


})(jQuery);