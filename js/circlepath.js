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
			radius: 150,
			autoRadius: false,
			on: 'click',
			open: function() {},
			closed: function() {},
			init: function() {}
		};
		angles = {
			s: [338, 383],
			se: [22, 67],
			e: [68, 112],
			ne: [112, 157],
			n: [157, 202],
			nw: [202, 247],
			w: [247, 292],
			sw: [292, 337]
		}

		
		var circlePath = {
			init: function(ele, items, options) {
				this._$ele = $(ele);
				this._counts = {};
				this._angles = angles;
				this._options = $.extend({}, defaults, options);
				this._state = 'closed';
				this._items = this._buildItems(items);
				this._addItems();
				this.hook();
				this._options.init();
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
				var self = this,
				pos = self._$ele.find('.cirPathcenter').position(),
				lis = self._$ele.find('li:not(.cirPathcenter)');
				self._state = 'opening';

				$.each(lis, function(i, val) {
					var data = $(this).find('a').data();
					$(this).css({display: 'block'}).animate({top: data.x + pos.top + 'px', left: data.y + pos.left + 'px', opacity: 1})
				});
				self._state = 'open';
				self._options.open();
				return true;
			},

			close: function() {
				var self = this,
				pos = self._$ele.find('.cirPathcenter').position(),
				lis = self._$ele.find('li:not(.cirPathcenter)');
				self._state = 'closing';

				$.each(lis, function(i, val) {
					var data = $(this).find('a').data();
					$(this).animate({top: pos.top + 'px', left: pos.left + 'px', opacity: 0}, function() {
						$(this).css({display: 'none'});
					})
				});
			
				self._state = 'closed';
				self._options.closed();
				return true;
			},
			_buildItems: function(items) {
				var self = this,
				tempItems = [];
				$.each(items, function(key, val) {
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
					return self._getXY(center, self._options.radius);
				} else if (self._counts[location] === 2) {
					if (i === 1) {
						return self._getXY(self._angles[location][0], self._options.radius);
					} else {
						return self._getXY(self._angles[location][1], self._options.radius);
					}
				} else {
					return self._getXY(self._angles[location][0], self._options.radius, i, step);
				}

			},
			_getXY: function(angle, radius, i, step) {
				i = i || 0;
				step = step || 0;
				angle += (i * step);
				
				angle = (angle >= 360) ? angle - 360 : angle;

				var x = (Math.cos( (angle * (Math.PI/180))) * radius),
					y = (Math.sin( (angle * (Math.PI/180))) * radius);

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