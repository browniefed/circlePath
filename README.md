## About
Inspired by the Path menu, and also an article I read about placement of objects for mobile devices.
Many mobile menus simply turn into drop down lists, shrink, or become accordians.
I think a better solution for smaller menus is to create an accessibly menu for the thumb.
There are drawbacks and things that need to be added (ie. labels, tooltips, general responsiveness, etc) but those can come later.
### Options
```javascript
//defaults
var opts = {
radius: 150, //define the radius so that all your icons fit and work correctly
autoRadius: false, // not yet implemented, determines proper radius based on icon widths/overlaps etc
on: 'click', //open on click or hover
open: function() {}, //callback once the menu has opened
closed: function() {}, //callback once the menu has closed
init: function() {} //callback once all elements have been built and added
};
```
### Define your icons, callbacks, and triggers
You can define corners based upon cardinal directions
`[n, ne, e, se, s, sw, w, nw]`
You must define a center.(default later will be added)
Below illustrates the options you have, define an icon, a callback, a link, a jquery event to trigger, and data to pass along.

```javascript
var items = {
			center: { icon: 'img/appbar.list.png'},
			w: [
				{
					icon: 'img/appbar.magnify.png',
					cb: function() {},
					link: 'http://browniefed.github.com',
					data: 'search',
					trigger: 'evt_click'
				}
			],
			e: [
				{
					icon: 'img/appbar.magnify.png',
					cb: function() {},
					link: '#',
					data: 'search',
					trigger: 'evt_click'
				}
			]
		};
```
Initialize on an empty UL
```html
<ul id="#circle_menu"></ul>
<script type="text/javascript">
//Options, and items continued from above
$('#circle_menu').circlePath(items, opts);
</script>
```