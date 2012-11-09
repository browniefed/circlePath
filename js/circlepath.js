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
				this._angles = angles;
				this._items = this._buildItems(items);
				this._options = $.extend({}, defaults, options);
				this._state = 'closed';
				this._addItems();
				this.hook();
				
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
				pos = self._$ele.find('.cirPathcenter').position(),
				lis = self._$ele.find('li:not(.cirPathcenter)');
				self._state = 'opening';

				/*
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
				*/
				$.each(lis, function(i, val) {
					var data = $(this).find('a').data();
					$(this).css({top: data.x + pos.top + 'px', left: data.y + pos.left + 'px'}).show();
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
							var xy = self._getPosition(key, i);
							xy.location = key;
							t.push($.extend({}, v, xy));
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
			},
			_getPosition: function(location, i) {
				var self = this,
					center = self._angles[location][0] + Math.floor(((self._angles[location][0] - self._angles[location][1])/2)),
					step = Math.abs(self._angles[location][1] - self._angles[location][0])/(self._counts[location] - 1);

				if (self._counts[location] === 1) {
					return self._getXY(center, 1);
				} else if (self._counts[location] === 2) {
					if (i === 1) {
						return self._getXY(self._angles[location][0]);
					} else {
						return self._getXY(self._angles[location][1]);
					}
				} else {
					return self._getXY(self._angles[location][0], 150, i, step);
				}

			},
			_getXY: function(angle, radius, i, step) {
				i = i || 0;
				step = step || 0;
				angle += (i * step);
				var x = (Math.cos( (angle * (Math.PI/180))) * 150),
					y = (Math.sin( (angle * (Math.PI/180))) * 150);
				return {x:x, y:y};
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