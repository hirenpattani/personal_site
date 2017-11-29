(function($) {
"use strict";
$(function(){




/*------------------------------------------------------------------
[Table of contents]

1. General Functions
2. Banner Text Slide
3.  Portfolio map-auto-height
4. Google Map
5. SVGMenu
6. Magnific popup
7. Portfolio Menu Scroll
8. Portfolio Scrollup
9. Sticky Menu
10. Preloader 
11. Gallery Isotope
-------------------------------------------------------------------*/

  /* =========================================================
    1. General Functions
  ========================================================= */
  jQuery.fn.exists = function(){return this.length>0;}


   /* =========================================================
     2. Banner Text Slide
   ========================================================= */
  if ($('#banner-text-slide').length > 0) {
    $("#banner-text-slide").owlCarousel({
        navigation : false, // Show next and prev buttons
        pagination : false,
        slideSpeed : 300,
        paginationSpeed : 400,
        transitionStyle : "fade",
        autoPlay : true,
        singleItem:true
    });
  }

  /*--------------------------------------------------------------
    3.  Portfolio map-auto-height
  -------------------------------------------------------------*/
  function autoHeight() {
    var comming_contact_form = $('.portfolio-contact-form'),
        comming_soon_map = $('#map');

        comming_soon_map.css('height', comming_contact_form.outerHeight());
  }
  autoHeight();

  $(document).ready(function(){
    autoHeight();
  });

  $(window).on('resize',function(){
    autoHeight();
  });


  /*--------------------------------------------------------------
    4. Google Map
  --------------------------------------------------------------*/
  if($('#map').exists()){
    google.maps.event.addDomListener(window, 'load', init);

      function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true,
            disableDefaultUI: true,
            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(21.729601, 70.447216), // New York

            // How you would like to style the map. 
            // This is where you would paste any style found on Snazzy Maps.
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
          };


        // Get the HTML DOM element that will contain your map 
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using our element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);

        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(40.6700, -73.9400),
          map: map,
          icon: 'static/images/map-icon.png',
          // title: 'Larsia'
        });
        var contentString = '<div id="content">' +
            '<div id="myDiv">' +
            '</div>' +
            '<p>Prabhat Art Studio' +
            '<p> Station Road, Dhoraji</p>' +
            '<p>India, 360410</p>'+
            '</div>' +
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 280
        });

        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 750);  //time it takes for one bounce   

        google.maps.event.addListener(marker, 'click', function () {
            infowindow.open(map, marker);
        });

    }
  }


  /*--------------------------------------------------------------
    5. SVGMenu
  --------------------------------------------------------------*/
  (function() {
      function SVGMenu( el, options ) {
        this.el = el;
        this.init();
      }

      SVGMenu.prototype.init = function() {
        this.trigger = this.el.querySelector( 'button.menu__handle' );
        this.shapeEl = this.el.querySelector( 'div.morph-shape' );

        var s = Snap( this.shapeEl.querySelector( 'svg' ) );
        this.pathEl = s.select( 'path' );
        this.paths = {
          reset : this.pathEl.attr( 'd' ),
          open : this.shapeEl.getAttribute( 'data-morph-open' ),
          close : this.shapeEl.getAttribute( 'data-morph-close' )
        };

        this.isOpen = false;

        this.initEvents();
      };

      SVGMenu.prototype.initEvents = function() {
        this.trigger.addEventListener( 'click', this.toggle.bind(this) );
      };

      SVGMenu.prototype.toggle = function() {
        var self = this;

        if( this.isOpen ) {
          classie.remove( self.el, 'menu--anim' );
          setTimeout( function() { classie.remove( self.el, 'menu--open' ); }, 250 );
        }
        else {
          classie.add( self.el, 'menu--anim' );
          setTimeout( function() { classie.add( self.el, 'menu--open' );  }, 250 );
        }
        this.pathEl.stop().animate( { 'path' : this.isOpen ? this.paths.close : this.paths.open }, 350, mina.easeout, function() {
          self.pathEl.stop().animate( { 'path' : self.paths.reset }, 800, mina.elastic );
        } );
        
        this.isOpen = !this.isOpen;
      };

      new SVGMenu( document.getElementById( 'menu' ) );

    })();


  /*--------------------------------------------------------------
    6. Magnific popup 
  --------------------------------------------------------------*/
  if($('.portfolio-gallery-single-hover-item').exists()){
    $('.portfolio-gallery-single-hover-item').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            // titleSrc: function(item) {
            //     return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            // }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 500, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
        
    });
  }


  /*--------------------------------------------------------------
    7. Portfolio Menu Scroll
  --------------------------------------------------------------*/
  if ($('.portfolio-menu-scroll a').length > 0) {
    $('.portfolio-menu-scroll a').on('click', function(e) {
          e.preventDefault();
          $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 700, 'linear');
      });
  }
 


  $(window).on('scroll', function(){

    /*--------------------------------------------------------------
      8. Portfolio Scrollup
    --------------------------------------------------------------*/
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }


    /*--------------------------------------------------------------
      9. Sticky Menu 
    --------------------------------------------------------------*/
    if ($(window).scrollTop() > $('.portfolio-header-area').height()) {
      $('.elastic_menu').addClass('stick-menu');
    } else{
      $('.elastic_menu').removeClass('stick-menu');
    }


  });

  $('.scrollup').on('click',function () {
      $("html, body").animate({
          scrollTop: 0
      }, 600);
      return false;
  });



});  // end of document ready


 
$(window).on("load" ,function(){
  /*--------------------------------------------------------------
    10. Preloader 
  --------------------------------------------------------------*/
  if($('#preloader').exists()){
    $("#preloader").fadeOut(500);
  }

  /*--------------------------------------------------------------
    11. Gallery Isotope
  --------------------------------------------------------------*/
  if($('#portfolio-items').exists()){
    var $container = $('#portfolio-items'),
      colWidth = function () {
        var w = $container.width(), 
          columnNum = 1,
          columnWidth = 0;
        if (w > 1200) {
          columnNum  = 5;
        } else if (w > 900) {
          columnNum  = 3;
        } else if (w > 600) {
          columnNum  = 2;
        } else if (w > 450) {
          columnNum  = 2;
        } else if (w > 385) {
          columnNum  = 1;
        }
        columnWidth = Math.floor(w/columnNum);
        $container.find('.collection-grid-item').each(function() {
          var $item = $(this),
            multiplier_w = $item.attr('class').match(/collection-grid-item-w(\d)/),
            multiplier_h = $item.attr('class').match(/collection-grid-item-h(\d)/),
            width = multiplier_w ? columnWidth*multiplier_w[1] : columnWidth,
            height = multiplier_h ? columnWidth*multiplier_h[1]*0.4-12 : columnWidth*0.5;
          $item.css({
            width: width,
            //height: height
          });
        });
        return columnWidth;
      },
      isotope = function () {
        $container.isotope({
          resizable: false,
          itemSelector: '.collection-grid-item',
          masonry: {
            columnWidth: colWidth(),
            gutterWidth: 0
          }
        });
      };
    isotope();
    $(window).resize(isotope);
    var $optionSets = $('.watch-gallery-nav .option-set'),
        $optionLinks = $optionSets.find('li');
    $optionLinks.click(function(){
    var $this = $(this);
      var $optionSet = $this.parents('.option-set');
      $optionSet.find('.selected').removeClass('selected');
      $this.addClass('selected');

      // make option object dynamically, i.e. { filter: '.my-filter-class' }
      var options = {},
          key = $optionSet.attr('data-option-key'),
          value = $this.attr('data-option-value');
      // parse 'false' as false boolean
      value = value === 'false' ? false : value;
      options[ key ] = value;
      if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
        // changes in layout modes need extra logic
        changeLayoutMode( $this, options )
      } else {
        // creativewise, apply new options
        $container.isotope( options );
      }
      return false;
    });
  }

});



})(jQuery);



