Vue.component('members-select-menu', {
  props: ['placeholder'],
  data() {
    return {
      active: false, // true when menu open
      search: '', // search string
      members: [], // array with members
      laod: false, // loading (ture when members is loading)
      inter: 0 // integer for animation delay when scroll members menu
    }
  },
  components: {
    PerfectScrollbar
  },
  methods: {
    // Event when menu is open
    openMenu() {
      this.active = !this.active;
      this.fetchMembers();
    },

    // Load more members
    loadMore() {
      axios.get('http://vh228-reso.ffox.site/members.json')
        .then(response => {
          // Push new members into array
          response.data.forEach(member => {
            this.members.push(member)
          });
        })
    },
    // If Click outside
    outside() {
      this.active = false;
    },

    // Init bootstrap tooltip when member pushed to members array and render in list
    tooltipInit() {
      setTimeout(function() {
        $('[data-toggle="tooltip"]').tooltip({ boundary: 'viewport' });
      }, 500)
    },

    // Fetch members when menu is open
    fetchMembers() {
     if (this.members.length === 0) {
       // Start loadin
       this.load = true;

       setTimeout(() => {
         axios.get('http://vh228-reso.ffox.site/members.json')
           .then(response => {
             this.members = response.data;
           });

         // End loading
         this.load = false
       }, 500)
     }
    },

    // Animation for each item in members (lazyload) before animation
    beforeEnter: function (el) {
      el.style.opacity = 0
      Velocity(el, {scale: .7}, {duration: 0})
    },

    // In animation
    enter: function (el, done) {
      this.animationDelayr(15);
      var delay = this.inter * 150
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1, scale: 1 },
          { complete: done }
        )
      }, delay)

      delay = 0;
    },

    // When leave item
    leave: function (el, done) {
      var delay = el.dataset.index * 50
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0 },
          { complete: done }
        )
      }, delay)
    },

    // Set delay animation for new items in members (lazyload)
    animationDelayr(perItems) {
      if (this.inter >= perItems) {
        this.inter = 0;
      }
      this.inter++;
    },
  },
  computed: {
    // Filter members (demo)
    filterList() {
      var vm = this
      return this.members.filter(function (item) {
        return item.name.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1
      })
    }
  },
  mounted() {
    // Add event scroll (when members menu on the bottom call loadMore function)
    const scrollerMenu = document.querySelector('#mCSB_1');
    scrollerMenu.addEventListener('scroll', e => {
      if (scrollerMenu.scrollTop + scrollerMenu.clientHeight >= scrollerMenu.scrollHeight) {
        this.loadMore();
      }
    })

    // Init PerfectScrollbar.js scrollbar
    scrollThirdInit = new PerfectScrollbar(scrollerMenu);

    // Init tooltips for another elements onthe page
    $('[data-toggle="tooltip"]').tooltip()
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    },

    'click-outside': {
      bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

      }
    }
  },
    template: `
    <div class="rs-form-group and-has-icon form-group mb-0 rs-member-select position-relative">  
      <span class="select2 select2-container select2-container--default rs-select-member w-100">
        <span class="selection">
          <!--Select menu input active = false-->
          <span v-if="!active" class="select2-selection select2-selection--single" @click="openMenu">
            <span class="members-menu-placeholder">{{placeholder}}</span>			
            <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>
          </span>	
          
          <!--Select menu input active = true-->
          <span v-click-outside="outside" v-if="active" class="select2-selection select2-selection--single">		
            <input v-model="search" v-focus class="members-menu-input" placeholder="Saisir pour filtrer la liste" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="textbox">
            <span class="select2-selection__arrow" role="presentation" @click="active = !active"><b style="transform: rotate(180deg)" role="presentation"></b></span>
          </span>
      </span>
    </span>
  
    <!--Select menu when active-->
    <div v-show="active">
    <div id="mCSB_1" class="members-menu-sresults mCustomScrollBox mCS-light mCSB_vertical mCSB_inside">
      <ul class="select2-results__options">   
    
      <!-- Loadin icon -->
      <img v-if="load" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 150px" src="assets/img/Loading_icon.gif" alt="loadin animation">
      
      
      <!-- Animation group for items -->
      <transition-group name="staggered-fade"
      v-bind:css="false"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
      tag="div">
      
      <!-- Member Item -->
      <li v-for="(member, index) in filterList" :key="index" class="select2-results__option" :data-index="index">
      <div class="media mb-1 align-items-start"><a href="home.html" class="mr-3 rs-award">
        <!-- Avatar -->
        <img class="rounded-circle" :src="member.avatar" width="45" height="45" alt="Image Description"></a>
        
        <!-- Member Content -->
        <div class="media-body d-flex">
          <div class="d-flex flex-column">
          
            <!-- Member Link -->
            <a href="home.html" class="h5 font-weight-bold rs-mb-2 rs-text-black rs-text-danger-hover">{{member.name}} {{member.secondName}}</a>
            <span class="h6 text-dark-grey mb-1">Charge de mission 1</span>
                    
            <!-- Badge | Init Tooltip -->
            {{tooltipInit()}}
            <span class="rs-badge rs-badge-grey rs-badge-grey--hover rs-width-60" data-toggle="tooltip" data-placement="top" title="" data-original-title="Direction Régionale de l'Alimentation de l'Agriculture et de la Forêt">{{member.badge}}</span>          
          </div>
        </div>
        
        <!-- Add Member Icon -->
        <div class="icn-add mr-2" @click="$emit('addMember', filterList[index])"></div>
      </div>
    </li>    
  </transition-group>
  </ul>   
</div>
<!-- Invite Block -->   
<div class="rs-inviter-block"><p class="mb-3">La personne que vous souhaitez ajauter au project nefait pa parti du Reso?</p><button class="btn btn-danger">Inviter un nouvel utilisateur</button></div>
</div>
</div>
  `
});

Vue.component('members', {
  data() {
    return {
      members: []
    }
  },
  methods: {
    // Add member
    addMember(member) {
      this.members.push(member);
    },
    // Delete member
    deleteMember(index) {
      this.members.splice(index, 1);
    }
  },
  template: `
  <div class="bg-white">
				<div class="d-flex align-items-center flex-wrap rs-width-full py-3 px-4 border-bottom">
					<h2 class="h3 font-weight-bold mb-sm-0 mb-4 mr-4">People ({{members.length}})</h2>
					<div class="d-flex align-items-center ml-sm-auto rs-select_wrap">
					
						<!-- rs-member-select -->
						<members-select-menu @addMember="addMember" placeholder="Rechercher dans la listed"></members-select-menu>
						<!-- END rs-member-select -->
					</div>
				</div>

				<div class="py-3 px-4" style="height: 100vh">
					<!-- row -->
					<div class="rs-members__list pt-2">
						<transition-group name="list" class="row">
						<div v-for="(member, index) in members" :key="index" class="col-lg-4 col-sm-6">										
						
							<div class="media mb-4 align-items-center">
								<a href="home.html" class="mr-3 rs-award">
								  <!-- Avatar Member -->
									<img class="rounded-circle" :src="member.avatar" width="45" height="45" alt="Image Description">
								</a>
								<div class="media-body d-flex">
									<div class="d-flex flex-column">
										<a href="home.html" class="h5 font-weight-bold mb-1 rs-text-black rs-text-danger-hover">{{member.name}} {{member.secondName}}</a>
										<span class="h6 text-dark-grey mb-1">Chargé de mission</span>
										<!-- Member Badge -->
										<span class="rs-badge rs-badge-grey rs-badge-grey--hover rs-width-60" data-toggle="tooltip" data-placement="top"
										  title="Direction Régionale de l'Alimentation de l'Agriculture et de la Forêt">{{member.badge}}</span>
									</div>
									<!-- Dropdown | Actions -->
									<div class="dropdown ml-auto rs-dropdown-h20 mt-2">
										<a id="moreDropdown9Invoker" class="u-link-v5 g-dot_wrap d-flex align-items-center" href="#!" aria-haspopup="true"
										  aria-expanded="false" data-toggle="dropdown">
											<span class="g-dot dot-1 rs-dot-grey mb-3"></span>
											<span class="g-dot dot-2 rs-dot-grey mb-3"></span>
											<span class="g-dot dot-3 rs-dot-grey mb-3"></span>
										</a>
										<div class="rs-dropdown dropdown-menu dropdown-menu-right" aria-labelledby="moreDropdown9Invoker">
											<div class="rs-dropdown-content">
												<h5 class="rs-dropdown__title">Actions</h5>
												<a class="rs-dropdown__item" href="#">
													<i class="fa fa-edit rs-dropdown__item-icon"></i>
													Edit
												</a>
												<a class="rs-dropdown__item" href="#">
													<i class="reso-icon-pin rs-dropdown__item-icon"></i>
													Pin
												</a>
												<!-- Delete Member -->
												<a class="rs-dropdown__item" href="#!" @click="deleteMember(index)">
													<i class="fa fa-trash rs-dropdown__item-icon"></i>
													Delete
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
</transition-group>				
					</div>
					<!-- END row -->
				</div>

			</div>
  `
})

new Vue({
  el: '#members'
})