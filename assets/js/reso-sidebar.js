var resoSidebar = Vue.component('reso-sidebar', {
   data() {
    return {
      streamItems: [],
      show: false,
      busy: false
    }
  },
  methods: {
    loadMore() {
      axios.get('http://vh228-reso.ffox.site/activityList.json')
        .then(response => {      
          this.streamItems.push(response.data[Math.round(Math.random() * 9)])
        });
    },
    fetchStream() {
      axios.get('http://vh228-reso.ffox.site/activityList.json')
        .then(response => this.streamItems = response.data);
    },
    outside() {
      if (this.show) {
        this.show = false;
      }
    }
  },
  mounted() {
    this.fetchStream();
    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    function disableScroll() {
      if (window.addEventListener)
        window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault;
      window.onmousewheel = document.onmousewheel = preventDefault;
      window.ontouchmove = preventDefault;
      document.onkeydown = preventDefaultForScrollKeys;
    }

    function enableScroll() {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }

      var keys = {37: 1, 38: 1, 39: 1, 40: 1},
        sidebarIsClosed = true,
        JSONPath = '/reso/ajax/activityList.json',
        i = 0,
        i2 = 0;

      var $scrollThird = document.querySelector('#scrollThird'),
        scrollThirdInit = new PerfectScrollbar($scrollThird);


      $('.rs-hamburger.is-closed').on('click', function () {
        scrollThirdInit.update();
      });

      $('.rs-hamburger').on('click', function () {
        if (sidebarIsClosed === true) {
          disableScroll();

          sidebarIsClosed = false;
        } else {
          enableScroll();

          sidebarIsClosed = true;
        }
      });

      $('.rs-sidebar-overlay').on('click', function () {
        enableScroll();

        sidebarIsClosed = true;
      });

    $scrollThird.addEventListener('ps-y-reach-end', () => {
      this.loadMore();
    });
  },
  directives: {
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
  template: `<div>
        <div class="rs-hamburger-wrapper">
        <div class="rs-hamburger is-closed">
        <div class="rs-hamburger-lines-wrapper">
        <div class="rs-hamburger-lines">
        <span class="rs-hamburger-lines__item and-top"></span>
        <span class="rs-hamburger-lines__item and-middle"></span>
        <span class="rs-hamburger-lines__item and-bottom"></span>
        </div>
        </div>

        <div class="rs-hamburger-ring">
        <svg>
        <path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="4" d="m23.92848,2c-12.129191,0 -21.92848,9.82592 -21.92848,21.988073s9.79929,21.988073 21.92848,21.988073s21.92848,-9.82592 21.92848,-21.988073s-9.79929,-21.988073 -21.92848,-21.988073"/>
        </svg>

        <svg width="0" height="0">
        <mask id="mask">
        <path xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#ff0000" stroke-miterlimit="10" stroke-width="4" d="M 34 2 c 11.6 0 21.8 6.2 27.4 15.5 c 2.9 4.8 5 16.5 -9.4 16.5 h -4"/>
        </mask>
        </svg>
        </div>

        <div class="rs-hamburger-path">
        <div class="rs-hamburger-path__animate">
        <div class="rs-hamburger-path__animate-rotation"></div>
        </div>
        </div>
        </div>
        </div>

        <div id="sidebar" class="rs-sidebar">
        <div class="rs-sidebar-header d-flex align-items-center justify-content-between">
        <h3 class="rs-sidebar-header__title">Flux d’activités</h3>
        </div>

        <div class="rs-sidebar-body">
        <div class="dropdown sidebar__dropdown mb-4" v-click-outside="outside">
                    <div @click="show = !show" class="sidebar__dropdown_item g-cursor-pointer" :aria-expanded="show">
                        <span class="d-block g-line-height-1 g-font-size-14 g-font-primary-bold g-text-transform-none">Agro-écologie à bas niveau deus</span>
                        <u class="d-block g-font-size-12 text-decoration g-font-primary-medium text-default">Aller au projet</u>
                    </div>
                    
                    <transition name="slideDown">
                      <ul class="dropdown-menu list-unstyled sidebar_custom__list" v-show="show">
                          <li>
                              <a href="#!">Classified advertising</a>
                          </li>
                          <li>
                              <a href="#!">Form of advertising</a>
                          </li>
                          <li>
                              <a href="#!">Common in other periodicals</a>
                          </li>
                          <li>
                              <a href="#!">A classified is usually</a>
                          </li>
                          <li>
                              <a href="#!">Can consist of as little</a>
                          </li>
                      </ul>
                      </transition>
                </div>

     
        <div id="scrollThird" class="rs-sidebar-content" style="position: relative;">
					<div class="rs-activity-list">
        <transition-group name="list">
        <div v-for="(item, index) in streamItems" :key="index" class="media border-bottom flex-column width-full py-2">
        <div class="d-flex align-items-center width-full pr-4 mb-1">
        <div class="rounded-circle rs-avatar mr-2">
        <a class="rs-link-red" href="#!">
        <img class="rounded-circle g-width-40 g-height-40 mCS_img_loaded" :src="item.avatar" alt="Image Description">
        <i v-if="item.medal" class="reso-icon-medal rs-avatar__icon-bottom-right rs-icon-xsm"></i>
        </a>
        </div>

        <div class="media-body d-inline-flex align-items-start flex-column justify-content-end">
        <a href="#!" class="g-font-primary-bold g-color-black g-font-size-14 g-line-height-18 g-text-underline--none--hover">{{item.name}}</a>
        <span class="rs-badge rs-badge-grey g-font-primary-boldItalic" title="">{{item.tag}}</span>
        </div>

        <span class="g-font-size-12 g-font-primary-mediumItalic g-color-grey-v2 ml-auto">{{item.timeAgo}}</span>
        </div>

        <div class="media-body d-inline-flex align-items-start flex-column justify-content-start g-pl-47 pr-4">
        <p class="g-font-primary-light g-color-grey g-font-size-13 mb-0">
              
        </p>
        
        <div v-html="item.description">
          
        </div>
        </div>
        </div>
        </transition-group>
        </div>           
        </div>
        </div>
        </div>
        <div class="rs-sidebar-overlay inactive"></div>
        </div>`
})

new Vue({
  el: '#reso-sidebar',
})