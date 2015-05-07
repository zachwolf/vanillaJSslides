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
	getSlide: function( w, slideCount ) {
		var slide = getParameterByName('slide'),
				baseURL = w.location.protocol + '//' + w.location.host + w.location.pathname;
		if( slide !== '' ) {
			if( slide<= slideCount ) {
				var element = document.querySelector( '.slide[data-count="'+ slide +'"]' ),
						top = element.getAttribute( 'data-top' );
				w.scrollTo( 0, top );
			} else {
				alert( 'too far!' );
				w.scrollTo( 0, 0 );
				w.history.replaceState({}, '', baseURL+'?slide=1');
			}
		} else {
			w.history.replaceState({}, '', baseURL+'?slide=1');
		}

		this.scroll( slide, w );
	},
	scroll: function( slide, w ) {
		var currSlide = document.querySelector( '.slide[data-count="' + slide + '"]' ),
				offsetTop = currSlide.getAttribute( 'data-top' ),
				height = currSlide.offsetHeight,
				scrollLimit = parseInt( offsetTop ) + parseInt( height ) - parseInt( w.innerHeight );
		w.addEventListener('scroll', function() {
		  if( w.pageYOffset > scrollLimit ) {
		  	w.scrollTo( 0, scrollLimit );
		  } else if( w.pageYOffset < offsetTop ) {
		  	w.scrollTo( 0, offsetTop );
		  }
		});
		/*w.addEventListener('scroll', function(e) {
		  console.log( w.pageYOffset );
		});*/
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