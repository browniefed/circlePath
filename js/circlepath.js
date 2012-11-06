/*!
 * CirclePath jQuery Plugn
 * Original author: @browniefed
 * Licensed under the WTFPL
 */
;(function($, window, document, undefined) {
	$.fn.circlePath = function(options) {
		
		options = $.extend({}, $.fn.circlePath.options, options);
		return this.each(function() {
			var eles = $(this).find('li:not(.center)'),
			center = $(this).find('li.center'),
			radius = 300,
			width = eles.outerWidth(),
			height = 300,
			angle = 0,
			step = (2 * Math.PI) / eles.length;
			$(this).css('position','relative');
			center.addClass('cirPathCenter');
			eles.addClass('cirPathEle');
			eles.each(function(i, v){
				var x = Math.round((width/2) + radius * Math.cos(angle) - $(this).width()/2);
				var y = Math.round((height/2) + radius * Math.sin(angle) - $(this).height()/2);
				$(this).css({left: x + 'px', top: y + 'px', display: 'block'});
				angle += step;
			});
		});
	}
	/*
		Options:
			delay: Time it takes for the menu to appear and execute transition effects
			showTransition: The effects the menu takes when appearing, multiple effects, delay time is spread among
			-- Transitions capable: Fade, Slide, FadeEach, ...
			-- Default ['fade', 'slide']
			hideTransition: Same as showTransition, just in reverse
			start: Where to start the menu options appearing from
			-- Default: N
			-- Options: N, NE, E, SE, S, SW, W, NW
			location: Limits menu items to a quadrant, or multiple quadrants
			-- Default: ['NE']
			-- Options: Accepts array, same options as start
			allowMultRows: true
			-- Allow for multiple rows, at maxWidth
			maxItems: Indiciate the maximum items per row
			-- Default: 3
			maxWidth: false
			-- Default none
			(Add other options like, partial circles to create feature like Path)
	*/

	$.fn.circlePath.options = {
			delay: 100,
			showTransition: ['fade','slide'],
			hideTransition: ['fade','slide'],
			start: 'N',
			location: ['NE'],
			allowMultRows: true,
			maxItems: 3,
			maxWidth: false
	};
})(jQuery, window, document);