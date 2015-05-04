function Slider( element ) {
	this.el = document.querySelector( element );
	this.init();
}
Slider.prototype = {
	init: function() {
		var w = window,
				x = window.innerWidth,
				y = window.innerHeight;

		this.overflow = this.el.querySelector( '.overflow' );
		this.slides = this.el.querySelectorAll( '.slide' );

		var slideHeights = [],
				slideOffsets = [ 0 ],
				offsetTop = 0;

		for( var i = 0; i < this.slides.length; i++ ) {

			var self = this.slides[i],
					count = self.getAttribute( 'data-count' ),
					content = self.querySelector( '.content' ),
					contentHeight = content.offsetHeight;

			slideHeights.push( contentHeight );

			if( contentHeight < y ) {
				self.style.height = y+'px';
				offsetTop += y;
				slideOffsets.push(	offsetTop ); 
				self.style.top = slideOffsets[i]+'px';
				self.setAttribute( 'data-scroll', '0' );
			} else {
				self.style.height = contentHeight+'px';
				offsetTop += contentHeight;
				slideOffsets.push(	offsetTop ); 
				self.style.top = slideOffsets[i]+'px';
				self.setAttribute( 'data-scroll', '1' );
			}
		}

		var newHeight = slideOffsets[slideOffsets.length-1];
		this.el.style.height = newHeight + 'px';

		this.getSlide( w, this.slides );

	},
	getSlide: function( w, slides ) {
		var slide = getParameterByName('slide');

		if( slide === '' ) {

			var baseURL = w.location.protocol + '//' + w.location.host + w.location.pathname;
				w.history.replaceState({}, '', baseURL+'?slide=1');

		} else {

			for( var i = 0; i < slides.length; i++ ) {

				var self = slides[i];

				if( i < ( slide - 1 ) ) {
					self.offset = parseInt( self.style.height );
					self.style.top = '-' + self.offset + 'px';

				} else if( i == ( slide - 1 ) ) {

					self.style.top = 0;

				}
			}
		}
	},
	navigate: function( i, slide ) {

	}
};
document.addEventListener( 'DOMContentLoaded', function() {
	var slider = new Slider( '.slideshow' );
});

/*function doSetTimeout(i) {
	setTimeout(function() {
		console.log(i);
	}, i*1000);
}
function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
    _x += el.offsetLeft - el.scrollLeft;
    _y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return { top: _y, left: _x };
}*/
function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}