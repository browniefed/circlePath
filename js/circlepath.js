/*!
 * CirclePath jQuery Plugn
 * Original author: @browniefed
 * Licensed under the WTFPL
 */
;(function($, window, document, undefined) {
		
		//For old timers
		if (typeof Object.create !== 'function') {
			Object.create = function(o) {
				var F = function() {};
				F.prototype = o;
				return new F();
			}
		}

		var pluginName = 'circlePath',
		defaults = {
			on: 'click',
			open: function() {},
			close: function() {},
			init: function() {}
		};

		
		var circlePath = {
			init: function(ele, items, options) {
				this._$ele = $(ele);
				
				this._initCss();
				this.hook();
			},

			hook: function() {
				
			},

			open: function() {
				
			},

			close: function() {
				
			},

			_initCss: function() {
				
			}
		}

		$.fn[pluginName] = function(items, options) {
			return this.each(function() {
				var obj = Object.create(circlePath);
				obj.init(this, items, options);
				$(this).data('circlePath', obj);
			});
		}


})(jQuery, window, document);


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
			on: What triggers the opening of the menu
			-- Default: click
			-- Options: hover, click, other event name
			open: Function to call when menu opens, triggers once completely opened
			close: Function to call when closes, triggers once completely closed
			init: Function called on the initiation of plugin
			(Add other options like, partial circles to create feature like Path)
	*/