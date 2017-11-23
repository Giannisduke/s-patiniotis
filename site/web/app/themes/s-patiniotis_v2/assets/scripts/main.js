  /* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
          var scrollTop = 0;


$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
});

// Init controller
var controller = new ScrollMagic.Controller();

// Change behavior of controller
// to animate scroll instead of jump
controller.scrollTo(function(target) {

  TweenMax.to(window, 1, {
    scrollTo : {
      y : target, // scroll position of the target along y axis
      autoKill : true // allows user to kill scroll action smoothly
    },
    ease : Cubic.easeInOut
  });

});

//  Bind scroll to anchor links
$(document).on("click", "a[href^=#]", function(e) {
  var id = $(this).attr("href");

  if($(id).length > 0) {
    e.preventDefault();

    // trigger scroll
    controller.scrollTo(id);

    // If supported by the browser we can also update the URL
    if (window.history && window.history.pushState) {
      history.pushState("", document.title, id);
    }
  }

});

 new ScrollMagic.Scene({
     triggerElement: "#home",
     duration: $('#home').height()
   })
   .setClassToggle(".home", "active")
   .addTo(controller);

 new ScrollMagic.Scene({
     triggerElement: "#products",
     duration: $('#products').height()
   })
   .setClassToggle(".products", "active")
   .addTo(controller);


$(document).on('facetwp-loaded', function() {



//Isotope
var $container = $('.grid'),
$items = $('.grid_item');
 $checkboxes = $('#filters input');

$container.isotope({
itemSelector: '.grid_item',
masonry: {
columnWidth: '.grid-sizer',
gutter: '.gutter-sizer'
}
});

$checkboxes.change(function(){
var filters = [];

// get checked checkboxes values
$checkboxes.filter(':checked').each(function(){
filters.push( this.value );
TweenMax.fromTo( $(".ajax_content"), 1.2, {css: {display: "block"}}, {css:{display: "none" }, ease: Elastic.easeOut.config(1, 0.3) }) ;
});
// ['.red', '.blue'] -> '.red, .blue'
filters = filters.join(', ');
$container.isotope({ filter: filters });
});

$.ajaxSetup({cache:false});

$items.click(function(){

var $this = $(this);
var post_url = $this.attr('data-href');

// don't proceed if already selected
var $previousSelected = $('.selected');
$(this).addClass( 'selected col-lg-12' );
$this.removeClass('grid_item');

$(".selected").load(post_url + " .woocommerce-product-gallery__image");




$previousSelected.removeClass('selected col-lg-12');
$previousSelected.addClass('grid_item');

    // update sortData for new items size
    $container
      .isotope( 'updateSortData', $this )
      .isotope( 'updateSortData', $previousSelected )

      .isotope();


  });
  var tl = new TimelineMax({repeat:0,yoyo:false});
  tl.staggerFromTo(".grid_item", 0.5,
      {delay:2.75, x:170, autoAlpha:0,ease: Elastic.easeOut.config(2, 0.75)},
      {delay:2.75, x:0, autoAlpha:1,ease: Elastic.easeOut.config(2, 0.75)}  , 0.4);
    // layout Isotope after each image loads
        $container.imagesLoaded().progress( function() {
        $container.isotope('layout');
        });


    });


      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired

      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page


      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS










      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
