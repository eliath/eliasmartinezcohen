_desktop = {

	init: function init() {
		window.history.replaceState({page: 'home'}, '', '');
		$('body').attr('id', 'home');
		this.$el = $('.main-container');
		this.render();
		this.renderFooter($('footer'));
		
		window.setInterval($.proxy(_site.titleScroll, _site), 250);
		$(window).mousemove($.proxy(_site.bgMouseShadow, _site));
		$(window).on('popstate', $.proxy(_site.back, _site));

		//logic to load resume/projects
		var state = _site.getQuery('goto');
		if (state) _site.goto(state);
	},

	render: function render() {
		this.$card = $('<div>', {class: 'card rapidBorder'}).appendTo(this.$el);
		
		var _this = this;
		this.renderCard(this.$card, function() {
			var $slashWrap = $('<div>', {class: 'slashWrap'}).appendTo(_this.$el);
			var $a = $('<div>', {class: 'wrapA'}).appendTo($slashWrap),
				$b = $('<div>', {class: 'wrapB'}).appendTo($slashWrap);
			_this.renderSlashes($a, $b);
		});
	},

	renderSlashes: function renderSlashes($a, $b) {
		var _this = this;
		$.when($a.load('/img/slashA.svg'), $b.load('/img/slashB.svg')).done(function() {
			$('.slashWrap').hover(function() {
				//crazy colors:
				_this.colorInt = setInterval($.proxy(_this.rapidColor, _this), 10);
				//crazy rotate:
				$('.wrapA, .wrapB').addClass('rotate');
			}, function() {
				//stop colors:
				clearInterval(_this.colorInt);
				$('.rapidBorder').css('border-color', 'black');
				$('.rapidStroke').css('stroke', 'black');
				//stop rotate:
				$('.wrapA, .wrapB').removeClass('rotate');
			});
		
		});
	},

	renderCard: function renderCard($container, cb) {
		//Email
		$('<p>', {class: 'email', html: _site.obfuscateEmail()}).appendTo($container);

		//ASL
		var asl = _site.getAge() + ' / M / NYC';
		$('<p>', {class: 'asl', html: asl}).appendTo($container);

		//Occupation
		var occ = ['Web', 'Software', 'UI', 'UX'].join('<span class="sep">•</span>');
		$('<p>', {class: 'occupation', html: occ}).appendTo($container);

		//Bottom links:
		var links = [
			'<a id="projects-link">&gt;&gt; Projects</a>',
			'<a id="resume-link">&gt;&gt; Résumé</a>'
		].join('\n');
		$('<div>', {class: 'links', html: links}).appendTo($container);
		$('#projects-link').click(function() {_site.goto('projects');});
		$('#resume-link').click(function() {_site.goto('resume');});
		
		cb(); //callback function
	},

	renderFooter: function renderFooter($footer) {
		var $p = $('<p>').appendTo($footer);
		var i = 0;
		for (i=0; i < _site.mylinks.length; i++) {
			var link = _site.mylinks[i];
			var $link = $('<a>', link).html(link.title);
			$p.append($link);
			if (i < _site.mylinks.length - 1) $p.append('<div class="sep"></div>');
		}
	},

	rapidColor: function rapidColor() {
		var c = 'hsl(' + (Math.floor(Math.random() * 361)) + ', 100%, 60%)';
		$('.rapidStroke').css('stroke', c);
		$('.rapidBorder').css('border-color', c);
	},

	loadHome: function loadHome() {
		this.$el.empty();
		$('body').attr('id', 'home');
		this.render();
	},

	loadResume: function loadResume() {
		$('body').attr('id', 'resume');
		this.$el.load('resume.html', function() {
			$('.contact').html(_site.obfuscateEmail());
			$('.back-btn').click(function() {
				window.history.back();
			});
		});

	},

	loadProjects: function loadProjects() {
		var _this = this;
		$('body').attr('id', 'projects');
		this.$el.load('projects.html', function() {
			// bind back button
			$('#go-back').click(function() {
				window.history.back();
			});

			$('.project-square').click(function() {
				_this.toggleProjectInfo($(this));
			});
		});
	},

	toggleProjectInfo: function toggleProjectInfo($prj_sq) {
		var $table_wrap = $('.table-wrap'),
			$squares = $('.project-square'),
			$drawer = $('.project-drawer');

		var infos = $prj_sq.find('.infos').html();

		if ($table_wrap.hasClass('show-info')) {
			// drawer is open
			// see if you should close or load another project:
			if ($prj_sq.hasClass('active')) {
				// close drawer
				$prj_sq.toggleClass('active');
				$table_wrap.toggleClass('show-info');
				$drawer.toggleClass('open').empty();
			} else {
				// load another project
				$squares.removeClass('active');
				$prj_sq.toggleClass('active');
				$drawer.find('*').fadeOut('400', function() {
					$drawer.empty().append($(infos).hide().fadeIn('fast'));
				}); 
					
			}
		} 

		//drawer is closed; open it.
		else {
			$prj_sq.toggleClass('active');
			$table_wrap.toggleClass('show-info');
			$drawer.toggleClass('open').append(infos);
		}
	}
};