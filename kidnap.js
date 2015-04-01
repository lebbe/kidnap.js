/**
 * kidnap.js
 * Copyright Lars-Erik Bruce 2015.
 * MIT License.
 */
(function() {

	// The different default font-styles.
	var magazines = [{
		name: 'newspaper',
		style: {
			fontFamily: '\'Open Sans\' sans-serif',
			fontWeight: '300',
			color: 'rgb(74, 62, 39)',
			backgroundColor: 'rgb(115, 140, 162)',
			fontSize: '120%',
			padding: '4px',
			margin: '2px'
		}
	},
	{
		name: 'magazine1',
		style: {
			fontFamily: '\'Roboto Slab\', \'Times New Roman\' serif',
			fontWeight: '700',
			color: 'rgb(96, 57, 90)',
			backgroundColor: 'rgb(233, 233, 231)',
			fontSize: '90%',
			padding: '4px',
			margin: '2px',
			textTransform: 'uppercase'
		}
	},
	{
		name: 'journal1',
		style: {
			fontFamily: '\'Roboto Slab\', \'Times New Roman\' serif',
			fontWeight: '300',
			color: 'rgb(226, 221, 215)',
			backgroundColor: 'rgb(127, 160, 191)',
			fontSize: '105%',
			padding: '4px',
			margin: '2px'
		}
	},
	{
		name: 'journal1',
		style: {
			fontFamily: '\'Roboto Slab\', \'Times New Roman\' serif',
			fontWeight: '400',
			color: '#F5EAD5',
			backgroundColor: '#EE4A3A',
			fontSize: '100%',
			padding: '4px',
			margin: '2px',
			textTransform: 'uppercase'
		}
	}];

	/**
	 * kidnap takes the HTML Node Element as first argument and (optionally)
	 * options as second argument.
	 *
	 * opts.rotate          how many degrees a letter should rotate +-
	 * opts.linebreakPeriod replace period with line-break? 
	 *
	 */
	function kidnap(elem, opts) {
		opts = opts || {};
		opts.rotate = opts.rotate || 6;
		opts.linebreakPeriod = opts.linebreakPeriod || false;
		
		var text = elem.textContent;
		elem.textContent = '';

		text.split(' ').forEach(function(word) {
			var wordElement = document.createElement('span');
			var spaceElemen = document.createElement('span');
			wordElement.style.whiteSpace = 'nowrap';
			spaceElemen.textContent = ' ';
			spaceElemen.style.fontSize = '100%';
			elem.appendChild(wordElement);
			elem.appendChild(spaceElemen);
			
			word.split('').forEach(function(ch) {
				 var el = document.createElement('span');

				 if(opts.linebreakPeriod && ch === '.') {
				 	wordElement.appendChild(document.createElement('br'));
				 	return;
				 }

				// Pick a random magazine the letter is cut out from
				var magazine = magazines[parseInt(Math.random() * magazines.length)].style;
	
				for(field in magazine) {
					el.style[field] = magazine[field];
				}
	
				// Rotate +- opts.rotate degrees
				var test = 'rotate(' + parseInt((Math.random() * (opts.rotate * 2) + 1) - opts.rotate) + 'deg)';
				console.log(test);
				el.style.display = 'inline-block';
				el.style.transform = test;
	
				el.textContent = ch;
	
				wordElement.appendChild(el);
			});
		});

	};

	// Expose kidnap in jQuery or in window object if available
	if(window.jQuery && !jQuery.fn.kidnap) {
		jQuery.fn.kidnap = function(opts) {
			for(var i = 0; i < this.length; i++)
				kidnap(this[i], opts);
			return this;
		}
	} else if(!window.kidnap) {
		window.kidnap = kidnap;
	}

})();
