/*!
 * CirclePath jQuery Plugn
 * Original author: @browniefed
 * Licensed under the WTFPL
 */

 //Shrinks items until hover in that location, make option
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
			radius: 0,
			autoRadius: true,
			on: 'click',
			open: function() {},
			close: function() {},
			init: function() {}
		};
		angles = {
			n: [338, 22],
			ne: [22, 67],
			e: [68, 112],
			se: [112, 157],
			s: [157, 202],
			sw: [202, 247],
			w: [247, 292],
			nw: [292, 337]
		}

		
		var circlePath = {
			init: function(ele, items, options) {
				this._$ele = $(ele);
				this._counts = {};
				this._items = this._buildItems(items);
				this._options = $.extend({}, defaults, options);
				this._angles = angles;
				this._state = 'closed';
				this._addItems();
				this.hook();
				console.log(this._counts);
			},
			hook: function() {
				var self = this;
				if (self._options.on === 'click') {
					self._$ele.on('click', function(e){
						e.preventDefault();
						if (self._state === 'closed') {
							self.open();
						} else {
							self.close();
						}
						return false;
					});
				} else if (self._options.on === 'hover') {
					self._$ele.on('mouseenter', function(e) {
						if (self._state === 'closed') {
							self.open();
						}
					}).on('mouseleave', function(e) {
						if(self._state === 'open') {
							self.close();
						}
					});
				} else {
					// I DON'T KNOW WHAT WE'RE YELLING ABOUT
				}
			},

			trigger: function(e) {
				var data = $(this).data();
				if (typeof data === 'Object') {
					if (typeof data.cb === 'Function') {
						//Apply/Call in context of anchor clicked
						data.cb(data.data);
					}
					if (typeof data.trigger === 'String') {
						$.trigger(data.trigger, data.data);
					}
					self.close();
					if (data.link === '#') {
						return false;
					} else {
						return true;
					}
				}
			},

			open: function() {
				//Get difference between angles above
				//Determine fitting radius based on item widths and such
				//DO SOME MATH
				//Animate them
				//SAVE THE MATH
				//Move the center to center jesus christ
				var self = this,
				pos = self._$ele.find('.cirPathcenter').position();
				self._state = 'opening';
				var x = (Math.cos( (self._angles.e[0] * (Math.PI/180))) * 150);
				var y = (Math.sin( (self._angles.e[0] * (Math.PI/180))) * 150);
				self._$ele.find('.cirPathe').eq(1).show().css({top: x + pos.top + 'px', left: y + pos.left + 'px'});
				x = (Math.cos( (self._angles.e[1] * (Math.PI/180))) * 150);
				y = (Math.sin( (self._angles.e[1] * (Math.PI/180))) * 150);
				self._$ele.find('.cirPathe').eq(0).show().css({top: x + pos.top + 'px', left: y + pos.left + 'px'});
				var x = (Math.cos( (self._angles.w[0] * (Math.PI/180))) * 150);
				var y = (Math.sin( (self._angles.w[0] * (Math.PI/180))) * 150);
				self._$ele.find('.cirPathw').eq(1).show().css({top: x + pos.top + 'px', left: y + pos.left + 'px'});
				x = (Math.cos( (self._angles.w[1] * (Math.PI/180))) * 150);
				y = (Math.sin( (self._angles.w[1] * (Math.PI/180))) * 150);
				self._$ele.find('.cirPathw').eq(0).show().css({top: x + pos.top + 'px', left: y + pos.left + 'px'});
				//How to move elements east, west, or to respective locations
				$.each(self._items, function(i, val) {

				});
				self._state = 'open';
				//callback + trigger
				return true;
			},

			close: function() {
				var self = this;
				self._state = 'closing';
			
				self._state = 'closed';
				//callback + trigger
				return true;
			},
			_buildItems: function(items) {
				var self = this,
				tempItems = [];
				$.each(items, function(key, val) {
					//Add temp to scope so we can access it in the loop
					var t = tempItems,
					s = self;
					//Get rid of jQuery isArray
					if ($.isArray(val)) {
						s._counts[key] = val.length;
						$.each(val, function(i, v) {
							t.push($.extend({}, v, {location: key}));
						});
					} else {
						tempItems.push($.extend({}, val, {location: key}));
					}
				});
				return tempItems;
			},
			_addItems: function() {
				var self = this;
				
				$.each(self._items, function(i, val){
					var li = $('<li/>',
										{
										'class': 'cirPathItem cirPath' + val.location,
										html: $('<a />', {
														href: (val.link || '#'),
														click: self.trigger,
														data: val,
														html: $('<img/>',{src: val.icon})
														}		
											)
										}
								);
					self._$ele.prepend(li);
				});
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