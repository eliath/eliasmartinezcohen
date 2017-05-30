_mobile  = {

	init: function init() {
		this.$el = $('body').attr('id', 'mobile').empty();
		this.render();
	},

	render: function render() {
		var _this = this;
		this.$el.load('mobile.html', function() {
			var email = _site.getEmail();
			$('.contact').append($('<a>', {href:'mailto:'+email, html:email}));
			$('.more').click($.proxy(_this.openDrawer, _this));
		});
	},

	openDrawer: function openDrawer() {
		$('.links').addClass('open');
		$('.main').addClass('blurred');
		$('.back-btn').click($.proxy(this.closeDrawer, this));
	},

	closeDrawer: function closeDrawer() {
		console.log('X helooooo?'); 
		$('.main').removeClass('blurred');
		$('.links').removeClass('open');
	},
};