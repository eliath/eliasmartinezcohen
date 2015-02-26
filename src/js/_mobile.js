_mobile  = {

	init: function init() {
		this.$el = $('body').attr('id', 'mobile').empty();
		this.render();

		//force portrait
		this.fixOrientation();
		window.onorientationchange = this.fixOrientation;
	},

	render: function render() {
		var _this = this;
		this.$el.load('mobile.html', function() {
			$('.contact').html(_site.obfuscateEmail());
			$('.more').click($.proxy(_this.openDrawer, _this));
		});
	},

	openDrawer: function openDrawer() {
		$('.info').addClass('open');
		$('.main').addClass('blurred');
		$('.back-btn').click($.proxy(this.closeDrawer, this));
	},

	closeDrawer: function closeDrawer() {
		console.log('X helooooo?');
		$('.main').removeClass('blurred');
		$('.info').removeClass('open');
	},

	fixOrientation: function fixOrientation() {
		console.log('OREINTATION:', window.orientation);
		if (window.orientation % 180 !== 0) {
			$('#wrap').addClass('fix-rotate');	
		} else {
			$('#wrap').removeClass('fix-rotate');	
		}
	}

};