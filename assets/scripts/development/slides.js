function Slider( element ) {
	this.el = document.querySelector( element );
	this.slides = this.el.querySelectorAll( '.slide' );
	this.arrows = document.querySelectorAll( '.arrows svg' );
	this.w = window;
	this.baseURL = this.w.location.protocol + '//' + this.w.location.host + this.w.location.pathname;
	this.init();
}
Slider.prototype = {
	init: function() {
		for( var i = 0; i < slides.length; i++ ) {}
		this.getSlide( i );
	},
	getSlide: function( slideTotal ) {
		var slide = getParameterByName('slide');
		if( slide !== '' ) {
			if( slide <= slideTotal ) {
				var element = document.querySelector( '.slide[data-count="'+ slide +'"]' ),
						top = element.getAttribute( 'data-top' );
				this.el.style.top = '-' + top + 'px';
				this.changeClasses( slide, element );
			} else {
				alert( 'too far!' );
				this.el.style.top = '0px';
				this.w.history.replaceState({}, '', this.baseURL+'?slide=1');
				slide = 1;
			}
		} else {
			this.w.history.replaceState({}, '', this.baseURL+'?slide=1');
			slide = 1;
		}
		this.slide( slideTotal );
		this.arrowz( slideTotal );
	},
	changeClasses: function( next, element ) {
		for( var k = 0; k < this.slides.length; k++ ) {
			this.slides[k].classList.remove( 'active' );
		}
		for( var a = 0; a < this.arrows.length; a++ ) {
			this.arrows[a].classList.remove( 'active' );
		}
		var up = document.querySelector( 'svg.up' ),
				down = document.querySelector( 'svg.down' ),
				left = document.querySelector( 'svg.left' ),
				right = document.querySelector( 'svg.right' ),
				scroll = element.getAttribute( 'data-scroll' );
		element.classList.add( 'active' ); 
		if( next == 1 ) {
			right.classList.add( 'active' );
		} else if( next > 1 && next < k ) {
			left.classList.add( 'active' );
			right.classList.add( 'active' );
		} else if( next == k ) {
			left.classList.add( 'active' );
		}
		/*if( scroll == 1 ) {
			up.classList.add( 'active' );
			down.classList.add( 'active' );
		}*/
	},
	slide: function( slideTotal ) {
		var self = this,
				slide, currSlide, next;
		document.onkeydown = function(e) {
			if( e.keyCode == 39 || e.which == 39 ) {
				slide = getParameterByName( 'slide' );
				currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' );
				next = parseInt( slide ) + 1;
				if( next > 0 && next <= slideTotal ) {
					self.animate( next );
				}
			} else if( e.keyCode == 37 || e.which == 37 ) {
				slide = getParameterByName( 'slide' );
				currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' );
				next = parseInt( slide ) - 1;
				if( next > 0 && next <= slideTotal ) {
					self.animate( next );
				}
			}
		};
	},
	arrowz: function( slideTotal ) {
		for( var p = 0; p < this.arrows.length; p++ ) {
			var self = this,
					arrow = this.arrows[p];
			self.clicky( arrow, slideTotal );
		}
	},
	clicky: function( element, slideTotal ) {
		var self = this;
		element.addEventListener('click', function() {
			var el = this,
					dir = el.getAttribute( 'data-dir' );
			if( dir == 'r' ) {
				slide = getParameterByName( 'slide' );
				currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' );
				next = parseInt( slide ) + 1;
				if( next > 0 && next <= slideTotal ) {
				self.animate( next );
				}
			} else if( dir == 'l' ) {
				slide = getParameterByName( 'slide' );
				currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' );
				next = parseInt( slide ) - 1;
				if( next > 0 && next <= slideTotal ) {
				self.animate( next );
				}
			}
		});
	},
	animate: function( next ) {
		var nextSlide = document.querySelector( '.slide[data-count="' + next + '"]' ),
				scrollTop = nextSlide.getAttribute( 'data-top' );
		this.el.style.top = '-' + scrollTop + 'px';
		this.w.history.replaceState({}, '', this.baseURL+'?slide=' + next);
		this.changeClasses( next, nextSlide );
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
slidesInit();
window.addEventListener('scroll', function() {
	var slideshow = document.querySelector( '.slideshow' ),
			activeSlide = slideshow.querySelector( '.active' ),
			slideshowTop = parseInt( slideshow.style.top ),
			scrollLimit = parseInt( activeSlide.getAttribute( 'data-bottom' ) )  + slideshowTop - parseInt( window.innerHeight );
	if( window.pageYOffset >= scrollLimit ) {
  	window.scrollTo( 0, scrollLimit );
  }
});
window.addEventListener('resize', function() {
	slidesInit();
});
function slidesInit() {
	var y = window.innerHeight,
			slideshow = document.querySelector( '.slideshow' );
			slideshowHeight = 0,
			offsetTop = 0,
			slideOffsets = [0],
			slides = slideshow.querySelectorAll( '.slide' );
	for( var i = 0; i < slides.length; i++ ) {
		var self = slides[i],
				content = self.querySelector( '.content' ),
				slideHeight = content.offsetHeight;
		if( slideHeight < y ) {
			self.style.height = y+'px';
			slideshowHeight += y;
			offsetTop += y;
			slideOffsets.push(	offsetTop );
			self.setAttribute( 'data-top', slideOffsets[i] );
			self.setAttribute( 'data-bottom', slideOffsets[i] + y ); 
			self.setAttribute( 'data-scroll', '0' );
		} else {
			self.style.height = slideHeight +'px';
			slideshowHeight += slideHeight;
			offsetTop += slideHeight;
			slideOffsets.push(	offsetTop ); 
			self.setAttribute( 'data-top', slideOffsets[i] );
			self.setAttribute( 'data-bottom', slideOffsets[i] + slideHeight );
			self.setAttribute( 'data-scroll', '1' );
		}
	}
	slideshow.style.height = slideshowHeight + 'px';
}