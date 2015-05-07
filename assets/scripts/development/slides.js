function Slider( element ) {
	this.el = document.querySelector( element );
	this.init();
}
Slider.prototype = {
	init: function() {
		var w = window,
				y = window.innerHeight,
				slideshowHeight = 0,
				offsetTop = 0,
				slideOffsets = [0];
		this.slides = this.el.querySelectorAll( '.slide' );
		for( var i = 0; i < this.slides.length; i++ ) {
			var self = this.slides[i],
					content = self.querySelector( '.content' ),
					slideHeight = content.offsetHeight;
			if( slideHeight < y ) {
				self.style.height = y+'px';
				slideshowHeight += y;
				offsetTop += y;
				slideOffsets.push(	offsetTop );
				self.setAttribute( 'data-top', slideOffsets[i] );
				self.setAttribute( 'data-bottom', slideOffsets[i] + y ); 
			} else {
				self.style.height = slideHeight +'px';
				slideshowHeight += slideHeight;
				offsetTop += slideHeight;
				slideOffsets.push(	offsetTop ); 
				self.setAttribute( 'data-top', slideOffsets[i] );
				self.setAttribute( 'data-bottom', slideOffsets[i] + slideHeight );
			}
		}
		this.el.style.height = slideshowHeight + 'px';
		this.getSlide( w, i );
	},
	getSlide: function( w, slideTotal ) {
		var slide = getParameterByName('slide'),
				baseURL = w.location.protocol + '//' + w.location.host + w.location.pathname;
		if( slide !== '' ) {
			if( slide <= slideTotal ) {
				var element = document.querySelector( '.slide[data-count="'+ slide +'"]' ),
						top = element.getAttribute( 'data-top' );
				this.el.style.top = '-' + top + 'px';
			} else {
				alert( 'too far!' );
				this.el.style.top = '0px';
				w.history.replaceState({}, '', baseURL+'?slide=1');
				slide = 1;
			}
		} else {
			w.history.replaceState({}, '', baseURL+'?slide=1');
			slide = 1;
		}
		this.scroll( slide, w );
		this.slide( slide, slideTotal );
	},
	scroll: function( slide, w ) {
		var currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' ),
				slideshowTop = parseInt( this.el.style.top ),
				scrollLimit = parseInt( currSlide.getAttribute( 'data-bottom' ) )  + slideshowTop - parseInt( w.innerHeight );
		w.addEventListener('scroll', function() {
		  if( w.pageYOffset >= scrollLimit ) {
		  	w.scrollTo( 0, scrollLimit );
		  }
		});
	},
	slide: function( slide, slideTotal ) {
		var self = this,
				currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' ),
				next;
		document.onkeydown = function(e) {
			if( e.keyCode == 39 || e.which == 39 ) {
				next = parseInt( slide ) + 1;
				dir = 'r';
				if( next > 0 && next < slideTotal ) {
					console.log( 'right' );
					self.animate( next );
				}
			} else if( e.keyCode == 37 || e.which == 37 ) {
				next = parseInt( slide ) - 1;
				dir = 'l';
				if( next > 0 && next < slideTotal ) {
					console.log( 'left' );
					self.animate( next );
				}
			}
		};
	},
	animate: function( next, dir ) {
		var nextSlide = document.querySelector( '.slide[data-count="' + next + '"]' ),
				scrollTop = nextSlide.getAttribute( 'data-top' );
		console.log( this.el );
		this.el.style.top = '-' + scrollTop + 'px';
	}
};
document.addEventListener( 'DOMContentLoaded', function() {
	var slider = new Slider( '.slideshow' );
});
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}