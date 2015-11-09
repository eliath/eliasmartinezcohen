_site = {

	init: function init() {
		//logic to load desktop site:
		var force_desktop = this.getQuery('desktop');
		if (this.isMobile() && !force_desktop)  {
			_mobile.init();
		} else {
			_desktop.init();
		}
	},

	goto: function goto(page) {
		var state = {page: page},
			url = (page === 'home') ? '/' : '/'+page;
		if (url) window.history.pushState(state, '', url);

		//loadkey is the name of the function to call
		var loadkey = 'load'+page.charAt(0).toUpperCase() + page.substr(1).toLowerCase();
		
		if (this.isMobile()) {
			_mobile[loadkey]();
		} else {
			var $el = $('.main-container');
			$el.fadeOut('400', function() {
				window.scrollTo(0,0);
				$el.empty();
				$('.links-container').remove();
				$(document).off('click');
				_desktop[loadkey]();
				$el.fadeIn(400);
			});
		}
	},

	back: function back(event) {
		if (event.originalEvent.state === null) return true;
		var page = event.originalEvent.state.page;
		if (page) {
			this.currPage = page;
			switch(page) {
				case 'projects':
					this.goto(page);
					break;
				case 'resume':
					this.goto(page);
					break;
				default:
					this.goto('home');
			}
		}
	},

	bgMouseShadow: function bgMouseShadow(event) {
		var throttle = 50,
			offsetX = (event.pageX * -1 / throttle),
			offsetY = (event.pageY * -1 / throttle);
		$('body').css('background-position', offsetX + 'px ' + offsetY + 'px');
	},

	/**
	 * Obfuscates my email address.
	 * Based on:
	 * 	Ton van Hattum <www.tonvanhattum.com.br/> 
	 *  http://tonvanhattum.com.br/email_encrypter.php
	 * 
	 * @return {String} a full HTML mailto link, i.e. <a href...>
	 */
	obfuscateEmail: function obfuscateEmail() {

		var eye_str='',
			hate_str='',
			spam_str='',
			sovery_str='',
			much_str='';

		var eye=[76,113,48,120,130,117,118,77,50,125,113,121,124,132,127,74],
			hate=[116,123,120,112,131,119],
			spam=[79,131,134,120,131,131,116,129,61,114,126,124],
			sovery=[52,80],
			much=[67,54,104,69];


		var sl3=15, sl5=7, sl6=18, sl8=16, sl9=15;

		var i;
		for (i=0; i<eye.length; i++)
			eye_str+=String.fromCharCode(eye[i]-sl8);
		for (i=0; i<hate.length; i++)
			hate_str+=String.fromCharCode(hate[i]-sl3);
		for (i=0; i<spam.length; i++)
			spam_str+=String.fromCharCode(spam[i]-sl9);
		for (i=0; i<sovery.length; i++)
			sovery_str+=String.fromCharCode(sovery[i]-sl6);
		for (i=0; i<much.length; i++)
			much_str+=String.fromCharCode(much[i]-sl5);
		

		var link = eye_str + hate_str + 
				spam_str + sovery_str + 
				hate_str + spam_str + much_str;

		this.email_address = link.split('>')[1].split('<')[0];
		return link;
	},

	/**
	 * Same as above except with my personal Gmail
	 * @return {String} a full HTML mailto link, i.e. <a href...>
	 */
	obfuscateGmail: function obfuscateGmail() {
		var eye_str = '', 
			hate_str = '', 
			spam_str = '', 
			sovery_str = '', 
			much_str = '';
		
		var sl3 = 4, sl5 = 0, sl6 = 11, sl8 = 8, sl9 = 16;
		
		var eye = [68,105,40,112,122,109,110,69,42,117,105,113,116,124,119,66],
			hate = [105,112,109,101,119,113,101,118,120,109,114,105,126,103,115,108,105,114],
			spam = [80,119,125,113,121,124,62,115,127,125],
			sovery = [45,73],
			much = [60,47,97,62];
		
		var i;
		for (i = 0; i < eye.length; i++)
			eye_str += String.fromCharCode(eye[i]-sl8);

		for (i = 0; i < hate.length; i++)
			hate_str += String.fromCharCode(hate[i]-sl3);

		for (i = 0; i < spam.length; i++)
			spam_str += String.fromCharCode(spam[i]-sl9);

		for (i = 0; i < sovery.length; i++)
			sovery_str += String.fromCharCode(sovery[i]-sl6);

		for (i = 0; i < much.length; i++)
			much_str += String.fromCharCode(much[i]-sl5);

		var link = eye_str + hate_str + 
				spam_str + sovery_str + 
				hate_str + spam_str + much_str;

		this.email_address = link.split('>')[1].split('<')[0];
		return link;
	},

	/**
	 * gets the email adress 
	 * (obfuscated --> never in plain text)
	 * 
	 * @return {String}   email@address.com
	 */
	getEmail: function getEmail() {
		return (this.email_address) ? this.email_address : this.obfuscateEmail().split('>')[1].split('<')[0];
	},

	/**
	 * Gets the query value from the URL  
	 * @param  {String} key  the key to the desired value.
	 * @return {String}		 the value given by the key in the URL.
	 */
	getQuery: function getQuery(key) {
		var query = window.location.search.substring(1);
		var keys = query.split('&');
		for (var i = 0; i < keys.length; i++) {
			var item = keys[i].split('=');
			if (item[0].toLowerCase() === key.toLowerCase()) return item[1];
		}
		return false;
	},

	
	/**
	 * @return {Boolean}: true if the visitor is using a mobile browser
	 */
	isMobile: function isMobile() {
		var device = navigator.userAgent || navigator.vendor || window.opera;
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(device) || 
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(device.substr(0,4))) {
			return true;
		}
		return false;
	},

	getAge: function getAge() {
		return Math.floor(((Date.now() - Date.parse('01/19/1993')) / 1000) / 31536000);
	},

	snapchatAlert: function snapchatAlert() {
		window.alert('USERNAME:\n@eliath');
	},


	/*** * * * * * * * * * * * * * * *
	 * Links 2 social				 *
	 * * * * * * * * * * * * * * * * */
	mylinks: [
		{title: 'twitter', href: 'https://twitter.com/eliath_', target: '_blank'},
		{title: 'github', href: 'https://github.com/eliath', target: '_blank'},
		{title: 'linkedin', href: 'https://www.linkedin.com/pub/el%C3%ADas-mart%C3%ADnez-cohen/94/8/828', target: '_blank'},
		{title: 'facebook', href: 'https://www.facebook.com/eliath', target: '_blank'},
		{title: 'instagram', href: 'https://instagram.com/eliath.biz', target: '_blank'},
		{title: 'spotify', href: 'http://open.spotify.com/user/127205523', target: '_blank'},
		{title: 'dump', href: 'http://dump.fm/eliath', target: '_blank'}
	],

	/*** * * * * * * * * * * * * * * *
	 * Title stuff					 *
	 * * * * * * * * * * * * * * * * */
	title: 'Elías Martínez Cohen',
	titleScroll: function titleScroll() {
		if (!this.title_index || this.title_index > this.title.length) {
			this.title_index = 1;
		}
		document.title = this.title.substring(0, this.title_index);
		this.title_index++;
	}
};