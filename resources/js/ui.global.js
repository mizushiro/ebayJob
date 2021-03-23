'use strict';

//Polyfill
if (!Object.create) {
	Object.create = function (o) {
		if (arguments.length > 1) {
			throw new Error('Sorry the polyfill Object.create only accepts the first parameter.');
		}
		function F() {}
		F.prototype = o;
		return new F();
	};
}
if (!Array.indexOf){ 
	Array.prototype.indexOf = function(obj){ 
		for(var i=0; i<this.length; i++){ 
			if(this[i]==obj){ return i; } 
		} 
		return -1; 
	};
}
if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(callback,thisArg) {
		var T,k;
		if(this === null) {
			throw new TypeError('error');
		}
		var O = Object(this);
		var len = O.length >>> 0;
		if(typeof callback !== "function"){
			throw new TypeError('error');
		}
		if(arguments.length > 1){
			T = thisArg;
		}
		k = 0;
		while(k < len){
			var kValue;
			if(k in O) {
				kValue = O[k];
				callback.call(T, kValue, k, O);
			}
			k++;
		}
	};
}
if (!Array.isArray) {
	Array.isArray = function(arg){
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}
if (!Object.keys){
	Object.keys = (function() {
		'use strict';
		var hasOwnProperty = Object.prototype.hasOwnProperty,
			hasDontEnumBug = !({ toDtring : null }).propertyIsEnumerable('toString'),
			dontEnums = [
				'toString',
				'toLocaleString',
				'valueOf',
				'hasOwnProperty',
				'isPrototypeOf',
				'propertyIsEnumerable',
				'varructor'
			],
			dontEnumsLength = dontEnums.length;
		
		return function(obj) {
			if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
				throw new TypeError('Object.keys called on non=object');
			}
			var result = [], prop, i;
			for (prop in obj) {
				if (hasOwnProperty.call(obj, prop)) {
					result.push(prop);
				}
			}
			if (hasDontEnumBug) {
				for (i=0; i < dontEnumsLength; i++) {
					if (hasOwnProperty.call(obj, dontEnums[i])) {
						result.push(dontEnums[i]);
					}
				}
			}
			return result;
		};
	}()); 
}

//utils module
;(function ($, win, doc, undefined) {

	'use strict';

	var global = '$plugins';
	var namespace = 'netiveUI.plugins';
	
	//global namespace
	if (!!win[global]) {
		throw new Error("already exists global!> " + global);
	} else {
		win[global] = createNameSpace(namespace, {
			uiNameSpace: function (identifier, module) { 
				return createNameSpace(identifier, module); 
			}
		});
	}
	function createNameSpace(identifier, module) {
		var name = identifier.split('.'),
			w = win,
			p;

		if (!!identifier) {
			for (var i = 0, len = name.length; i < len; i += 1) {
				(!w[name[i]]) ? (i === 0) ? w[name[i]] = {} : w[name[i]] = {} : '';
				w = w[name[i]];
			}
		}

		if (!!module) {
			for (p in module) {
				if (!w[p]) {
					w[p] = module[p];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return w;
	}

	//jquery easing add
	var easings = {
		linear : function(t,b,c,d){return c*t/d+b;},
		easeInQuad : function(t,b,c,d){return c*(t/=d)*t+b;},
		easeOutQuad : function(t,b,c,d){return -c*(t/=d)*(t-2)+b;},
		easeInOutQuad : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return -c/2*((--t)*(t-2)-1)+b;},
		easeOutInQuad : function(t,b,c,d){if(t < d/2)return easings.easeOutQuad(t*2,b,c/2,d);return easings.easeInQuad((t*2)-d,b+c/2,c/2,d);},
		easeInCubic : function(t,b,c,d){return c*(t/=d)*t*t+b;},
		easeOutCubic : function(t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},
		easeInOutCubic : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},
		easeOutInCubic : function(t,b,c,d){if(t<d/2)return easings.easeOutCubic(t*2,b,c/2,d);return easings.easeInCubic((t*2)-d,b+c/2,c/2,d);},
		easeInQuart : function(t,b,c,d){return c*(t/=d)*t*t*t+b;},
		easeOutQuart : function(t,b,c,d){return -c*((t=t/d-1)*t*t*t-1)+b;},
		easeInOutQuart : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return -c/2*((t-=2)*t*t*t-2)+b;},
		easeOutInQuart : function(t,b,c,d){if(t<d/2)return easings.easeOutQuart(t*2,b,c/2,d);return easings.easeInQuart((t*2)-d,b+c/2,c/2,d);},
		easeInQuint : function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;},
		easeOutQuint : function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},
		easeInOutQuint : function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},
		easeOutInQuint : function(t,b,c,d){if(t<d/2)return easings.easeOutQuint(t*2,b,c/2,d);return easings.easeInQuint((t*2)-d,b+c/2,c/2,d);},
		easeInSine : function(t,b,c,d){return -c*Math.cos(t/d*(Math.PI/2))+c+b;},
		easeOutSine : function(t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},
		easeInOutSine : function(t,b,c,d){return -c/2*(Math.cos(Math.PI*t/d)-1)+b;},
		easeOutInSine : function(t,b,c,d){if(t<d/2)return easings.easeOutSine(t*2,b,c/2,d);return easings.easeInSine((t*2)-d,b+c/2,c/2,d);},
		easeInExpo : function(t,b,c,d){return (t===0)? b : c*Math.pow(2,10*(t/d-1))+b-c*0.001;},
		easeOutExpo : function(t,b,c,d){return (t==d)? b+c : c*1.001*(-Math.pow(2,-10*t/d)+1)+b;},
		easeInOutExpo : function(t,b,c,d){if(t===0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b-c*0.0005;return c/2*1.0005*(-Math.pow(2,-10*--t)+2)+b;},
		easeOutInExpo : function(t,b,c,d){if(t<d/2)return easings.easeOutExpo(t*2,b,c/2,d);return easings.easeInExpo((t*2)-d,b+c/2,c/2,d);},
		easeInCirc : function(t,b,c,d){return -c*(Math.sqrt(1-(t/=d)*t)-1)+b;},
		easeOutCirc : function(t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},
		easeInOutCirc : function(t,b,c,d){if((t/=d/2)<1)return -c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},
		easeOutInCirc : function(t,b,c,d){if (t<d/2)return easings.easeOutCirc(t*2,b,c/2,d);return easings.easeInCirc((t*2)-d,b+c/2,c/2,d);},		
		easeInElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return -(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},
		easeOutElastic : function(t,b,c,d,a,p){if(!t)return b;if((t/=d)==1)return b+c;var s,p=(!p||typeof(p)!='number')? d*.3 : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);return (a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);},
		easeInOutElastic : function(t,b,c,d,a,p){if(t===0)return b;if((t/=d/2)==2)return b+c;var s,p=d*(.3*1.5),a=0;var s,p=(!p||typeof(p)!='number')? d*(.3*1.5) : p,a=(!a||typeof(a)!='number')? 0 : a;if(!a||a<Math.abs(c)){a=c;s=p/4;}else s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return -.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},
		easeOutInElastic : function(t,b,c,d,a,p){if (t<d/2)return easings.easeOutElastic(t*2,b,c/2,d,a,p);return easings.easeInElastic((t*2)-d,b+c/2,c/2,d,a,p);},
		easeInBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*(t/=d)*t*((s+1)*t-s)+b;},
		easeOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},
		easeInOutBack : function(t,b,c,d,s){var s=(!s||typeof(s)!='number')? 1.70158 : s;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},
		easeOutInBack : function(t,b,c,d,s){if(t<d/2)return easings.easeOutBack(t*2,b,c/2,d,s);return easings.easeInBack((t*2)-d,b+c/2,c/2,d,s);},			
		easeInBounce : function(t,b,c,d){return c-easings.easeOutBounce(d-t,0,c,d)+b;},
		easeOutBounce : function(t,b,c,d){if((t/=d)<(1/2.75))return c*(7.5625*t*t)+b;else if(t<(2/2.75))return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;else if(t<(2.5/2.75))return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;else return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;},
		easeInOutBounce : function(t,b,c,d){if(t<d/2)return easings.easeInBounce(t*2,0,c,d)*.5+b;else return easings.easeOutBounce(t*2-d,0,c,d)*.5+c*.5+b;},
		easeOutInBounce : function(t,b,c,d){if(t<d/2)return easings.easeOutBounce(t*2,b,c/2,d);return easings.easeInBounce((t*2)-d,b+c/2,c/2,d);}
	};
	var easing;
	for (easing in easings) {
		$.easing[easing] = (function(easingname) {
			return function(x, t, b, c, d) {
				return easings[easingname](t, b, c, d);
			};
		})(easing);
	}

	//html5 tag & device size class 
	(function () {
		var devsize = [1920, 1600, 1440, 1280, 1024, 960, 840, 720, 600, 480, 400, 360];
		var html5tags = ['article', 'aside', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'nav', 'main', 'section', 'summary'];
		var width = $('html').outerWidth(),
			colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4',
			i = 0,
			size_len = devsize.length,
			max = html5tags.length,
			sizeMode,
			timer;

		win[global].breakpoint = width >= devsize[5] ? true : false;

		var deviceSizeClassName = function(w) {
			for (var i = 0; i < size_len; i++) {
				if (w >= devsize[i]) {
					
					sizeMode = devsize[i];
					win[global].breakpoint = width >= devsize[5] ? true : false;
					break;
				} else {
					w < devsize[size_len - 1] ? sizeMode = 300 : '';
				}
			}
		};

		for (i = 0; i < max; i++) {
			doc.createElement(html5tags[i]);
		}

		deviceSizeClassName(width);
		var sizeCls = 's' + sizeMode;
		
		$()
		$('html').addClass(sizeCls).addClass(colClass);
		win.addEventListener('resize', function() {
			clearTimeout(timer);			
			timer = setTimeout(function () {
				var $html = $('html');
				
				width = win.innerWidth; 
				// document.body.offsetWidth === $(win).outerWidth()
				// win.innerWidth : scroll 포함된 width (+17px)
				// win.outerWidth === screen.availWidth 
				deviceSizeClassName(width);

				colClass = width >= devsize[5] ? 'col-12' : width > devsize[8] ? 'col-8' : 'col-4';
				$html.removeClass('s1920 s1600 s1440 s1280 s1024 s940 s840 s720 s600 s480 s400 s360 s300 col-12 col-8 col-4');
				win[global].breakpoint = width >= devsize[5] ? true : false;

				deviceSizeClassName(width);
				sizeCls = 's' + sizeMode;
				$html.addClass(sizeCls).addClass(colClass);
			}, 100);
		});
	})();

	//requestAnimationFrame
	win.requestAFrame = (function () {
		return win.requestAnimationFrame || win.webkitRequestAnimationFrame || win.mozRequestAnimationFrame || win.oRequestAnimationFrame ||
			//if all else fails, use setTimeout
			function (callback) {
				return win.setTimeout(callback, 1000 / 60); //shoot for 60 fp
			};
	})();
	win.cancelAFrame = (function () {
		return win.cancelAnimationFrame || win.webkitCancelAnimationFrame || win.mozCancelAnimationFrame || win.oCancelAnimationFrame ||
			function (id) {
				win.clearTimeout(id);
			};
	})();

	//components option 
	win[global].option = {
		pageName: function() {
			var page = document.URL.substring(document.URL.lastIndexOf("/") + 1),
				pagename = page.split('?');

			return pagename[0]
		},
		keys: { 
			'tab': 9, 'enter': 13, 'alt': 18, 'esc': 27, 'space': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37, 'up': 38, 'right': 39, 'down': 40
		},
		effect: {
			//http://cubic-bezier.com - css easing effect
			linear: '0.250, 0.250, 0.750, 0.750',
			ease: '0.250, 0.100, 0.250, 1.000',
			easeIn: '0.420, 0.000, 1.000, 1.000',
			easeOut: '0.000, 0.000, 0.580, 1.000',
			easeInOut: '0.420, 0.000, 0.580, 1.000',
			easeInQuad: '0.550, 0.085, 0.680, 0.530',
			easeInCubic: '0.550, 0.055, 0.675, 0.190',
			easeInQuart: '0.895, 0.030, 0.685, 0.220',
			easeInQuint: '0.755, 0.050, 0.855, 0.060',
			easeInSine: '0.470, 0.000, 0.745, 0.715',
			easeInExpo: '0.950, 0.050, 0.795, 0.035',
			easeInCirc: '0.600, 0.040, 0.980, 0.335',
			easeInBack: '0.600, -0.280, 0.735, 0.045',
			easeOutQuad: '0.250, 0.460, 0.450, 0.940',
			easeOutCubic: '0.215, 0.610, 0.355, 1.000',
			easeOutQuart: '0.165, 0.840, 0.440, 1.000',
			easeOutQuint: '0.230, 1.000, 0.320, 1.000',
			easeOutSine: '0.390, 0.575, 0.565, 1.000',
			easeOutExpo: '0.190, 1.000, 0.220, 1.000',
			easeOutCirc: '0.075, 0.820, 0.165, 1.000',
			easeOutBack: '0.175, 0.885, 0.320, 1.275',
			easeInOutQuad: '0.455, 0.030, 0.515, 0.955',
			easeInOutCubic: '0.645, 0.045, 0.355, 1.000',
			easeInOutQuart: '0.770, 0.000, 0.175, 1.000',
			easeInOutQuint: '0.860, 0.000, 0.070, 1.000',
			easeInOutSine: '0.445, 0.050, 0.550, 0.950',
			easeInOutExpo: '1.000, 0.000, 0.000, 1.000',
			easeInOutCirc: '0.785, 0.135, 0.150, 0.860',
			easeInOutBack: '0.680, -0.550, 0.265, 1.550'
		},
		uiComma: function(n){
			//숫자 세자리수마다 , 붙이기
			var parts = n.toString().split(".");

			return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
		},
		partsAdd0 :function(x) {
			//숫자 한자리수 일때 0 앞에 붙이기
			return Number(x) < 10 ? '0' + x : x;
		}
	};

	// set device information
	(function () {
		var ua = navigator.userAgent,
			ie = ua.match(/(?:msie ([0-9]+)|rv:([0-9\.]+)\) like gecko)/i),
			deviceInfo = ['android', 'iphone', 'ipod', 'ipad', 'blackberry', 'windows ce', 'samsung', 'lg', 'mot', 'sonyericsson', 'nokia', 'opeara mini', 'opera mobi', 'webos', 'iemobile', 'kfapwi', 'rim', 'bb10'],
			filter = "win16|win32|win64|mac|macintel",
			uAgent = ua.toLowerCase(),
			deviceInfo_len = deviceInfo.length;

		var browser = win[global].browser = {},
			support = win[global].support = {},
			i = 0,
			version,
			device;

		for (i = 0; i < deviceInfo_len; i++) {
			if (uAgent.match(deviceInfo[i]) != null) {
				device = deviceInfo[i];
				break;
			}
		}
		
		browser.local = (/^http:\/\//).test(location.href);
		browser.firefox = (/firefox/i).test(ua);
		browser.webkit = (/applewebkit/i).test(ua);
		browser.chrome = (/chrome/i).test(ua);
		browser.opera = (/opera/i).test(ua);
		browser.ios = (/ip(ad|hone|od)/i).test(ua);
		browser.android = (/android/i).test(ua);
		browser.safari = browser.webkit && !browser.chrome;
		browser.app = ua.indexOf('appname') > -1 ? true : false;

		//touch, mobile 환경 구분
		support.touch = browser.ios || browser.android || (doc.ontouchstart !== undefined && doc.ontouchstart !== null);
		browser.mobile = support.touch && ( browser.ios || browser.android);
		//navigator.platform ? filter.indexOf(navigator.platform.toLowerCase()) < 0 ? browser.mobile = false : browser.mobile = true : '';
		
		//false 삭제
		// for (j in browser) {
		// 	if (!browser[j]) {
		// 		delete browser[j]
		// 	}
		// }
		
		//os 구분
		browser.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		browser.os = browser.os ? browser.os[1].toLowerCase() : '';

		//version 체크
		if (browser.ios || browser.android) {
			version = ua.match(/applewebkit\/([0-9.]+)/i);
			version && version.length > 1 ? browser.webkitversion = version[1] : '';
			if (browser.ios) {
				version = ua.match(/version\/([0-9.]+)/i);
				version && version.length > 1 ? browser.ios = version[1] : '';
			} else if (browser.android) {
				version = ua.match(/android ([0-9.]+)/i);
				version && version.length > 1 ? browser.android = parseInt(version[1].replace(/\./g, '')) : '';
			}
		}

		if (ie) {
			browser.ie = ie = parseInt( ie[1] || ie[2] );
			( 11 > ie ) ? support.pointerevents = false : '';
			( 9 > ie ) ? support.svgimage = false : '';
		} else {
			browser.ie = false;
		}

		var clsBrowser = browser.chrome ? 'chrome' : browser.firefox ? 'firefox' : browser.opera ? 'opera' : browser.safari ? 'safari' : browser.ie ? 'ie ie' + browser.ie : 'other';
		var clsMobileSystem = browser.ios ? "ios" : browser.android ? "android" : 'etc';
		var clsMobile = browser.mobile ? browser.app ? 'ui-a ui-m' : 'ui-m' : 'ui-d';

		//doc.querySelector('html').classList.add(browser.os, clsBrowser, clsMobileSystem, clsMobile);
		$('html').addClass(browser.os);
		$('html').addClass(clsBrowser);
		$('html').addClass(clsMobileSystem);
		$('html').addClass(clsMobile);

	})();

	/* ------------------------
	 * [base] selector type
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiSelectorType: function (v) {
			return createUiSelectorType(v);
		}
	});
	function createUiSelectorType(v) {
		var selector = $('body');
		if (v === null) {
			selector = $('body')
		} else {
			if (typeof v === 'string') {
				selector = $('#' + v);
			} else {
				selector = v;
			}
		}

		return selector;
	}


	/* ------------------------
	 * [base] Ajax
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiAjax: function (opt) {
			return createUiAjax(opt);
		}
	});
	win[global].uiAjax.option = {
		page: true,
		add: false,
		prepend: false,
		effect: false,
		loading:false,
		callback: false,
		errorCallback: false,

		type: 'GET',
		cache: false,
		async: true,
		contType: 'application/x-www-form-urlencoded',
		dataType: 'html'
	};
	function createUiAjax(opt) {
		if (opt === undefined) {
			return false;
		}

		var opt = opt === undefined ? {} : opt;
		var opt = $.extend(true, {}, win[global].uiAjax.option, opt);
		var $id = typeof opt.id === 'string' ? $('#' + opt.id) : typeof opt.id === 'object' ? opt.id : $('body');
		var loading = opt.loading;
		var effect = opt.effect;
		var callback = opt.callback === undefined ? false : opt.callback;
		var errorCallback = opt.errorCallback === undefined ? false : opt.errorCallback;

		if (loading) {
			win[global].uiLoading({
				visible: true
			});
		}

		if (effect) {
			$id.removeClass('changeover action');
			$id.addClass('changeover');
		}

		$.ajax({
			type: opt.type,
			url: opt.url,
			cache: opt.cache,
			async: opt.async,  
			headers: {
				"cache-control": "no-cache",
				"pragma": "no-cache"
			},
			error: function (request, status, err) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}
				//console.log(request, status, err);
				errorCallback ? errorCallback() : '';
			},
			success: function (v) {
				if (loading) {
					win[global].uiLoading({
						visible: false
					});
				}

				if (opt.page) {
					opt.add ? opt.prepend ? $id.prepend(v) : $id.append(v) : $id.html(v);
					callback && callback();
					effect && $id.addClass('action');
				} else {
					callback && callback(v);
				}
			},
			complete: function(v){
				//console.log(v);
			}
		});
	}


	/* ------------------------
	 * [base] scroll move
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiScroll: function (opt) {
			return createUiScroll(opt);
		}
	});
	win[global].uiScroll.option = {
		value: 0,
		speed: 0,
		callback: false,
		ps: 'top',
		addLeft: false,
		focus: false,
		target: 'html, body'
	};
	function createUiScroll(opt){
		if (opt === undefined) {
			return false;
		}

		var opt = $.extend(true, {}, win[global].uiScroll.option, opt),
			psVal = opt.value,
			s = opt.speed,
			c = opt.callback,
			p = opt.ps,
			addLeft = opt.addLeft,
			overlap = false,
			f = typeof opt.focus === 'string' ? $('#' + opt.focus) : opt.focus,
			$target = typeof opt.target === 'string' ? $(opt.target) : opt.target;
		
		if (p === 'top') {
			$target.stop().animate({ 
					scrollTop : psVal 
				}, { 
					duration: s,
					step: function(now) { 
					!!c && now !== 0 ? c({ scrolltop:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					if (overlap) {
						!!c ? c({ focus:f, complete:true }) : '';
						!!f ? f.attr('tabindex', 0).focus() : '';
					} else {
						overlap = true;
					}
				}
			});
		} else if (p === 'left') {
			$target.stop().animate({ 
					scrollLeft : psVal
				}, { 
					duration: s,
					step: function(now) { 
						!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		} else if (p === 'center') {
			var w = $target.outerWidth();

			$target.stop().animate({ 
				scrollLeft : psVal - (w / 2) + addLeft
			}, { 
				duration: s,
				step: function(now) { 
					!!c && now !== 0 ? c({ scrollleft:Math.ceil(now), complete:false }) : '';
				},
				complete: function(){
					!!c ? c({ focus:f, complete:true }) : '';
					!!f ? f.attr('tabindex', 0).focus() : '';
				}
			});
		}
	}

	/* ------------------------
	 * [base] loading
	 * date : 2020-06-09
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiLoading: function (opt) {
			return createUiLoading(opt);
		}
	});
	win[global].uiLoading.timerShow = {};
	win[global].uiLoading.timerHide = {};
	win[global].uiLoading.option = {
		id: null,
		visible: true,
		txt : null,
		styleClass : 'orbit' //time
	}
	function createUiLoading(opt) {
		var opt = $.extend(true, {}, win[global].uiLoading.option, opt);
		var id = opt.id;
		var styleClass = opt.styleClass;
		var loadingVisible = opt.visible;
		var txt = opt.txt;
		var	$selector = win[global].uiSelectorType(id);
		var htmlLoading = '';

		$('.ui-loading').not('.visible').remove();

		id === null ?
			htmlLoading += '<div class="ui-loading '+ styleClass +'">':
			htmlLoading += '<div class="ui-loading '+ styleClass +'" style="position:absolute">';
		htmlLoading += '<div class="ui-loading-wrap">';

		txt !== null ?
			htmlLoading += '<strong class="ui-loading-txt"><span>'+ txt +'</span></strong>':
			htmlLoading += '';

		htmlLoading += '</div>';
	
		htmlLoading += '</div>';

		if(loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			clearTimeout(win[global].uiLoading.timerHide);
			win[global].uiLoading.timerShow = setTimeout(function(){
				showLoading();
			},300);
			
		}
		if(!loadingVisible) {
			clearTimeout(win[global].uiLoading.timerShow);
			win[global].uiLoading.timerHide = setTimeout(function(){
				hideLoading();
			},300)
			
		}	

		function showLoading(){
			!$selector.find('.ui-loading').length && $selector.append(htmlLoading);	
			htmlLoading = '';		
			$selector.data('loading', true);
			$('.ui-loading').addClass('visible').removeClass('close');			
		}
		function hideLoading(){
			$selector.data('loading', false);
			$('.ui-loading').addClass('close');	
			setTimeout(function(){
				$('.ui-loading').removeClass('visible')
				$('.ui-loading').remove();
			},300);
		}
	}
	/* ------------------------
	 * [base] URL parameter
	 * date : 
	------------------------ */
	win[global] = win[global].uiNameSpace(namespace, {
		uiPara: function (v) {
			return createUiPara(v);
		}
	});
	function createUiPara(paraname){
		var _tempUrl = win.location.search.substring(1),
			_tempArray = _tempUrl.split('&'),
			_tempArray_len = _tempArray.length,
			_keyValue;

		for (var i = 0, len = _tempArray_len; i < len; i++) {
			_keyValue = _tempArray[i].split('=');

			if (_keyValue[0] === paraname) {
				return _keyValue[1];
			}
		}
	}


	/* ------------------------
	* name : tab
	* date : 2020-06-14
	------------------------ */	
	win[global] = win[global].uiNameSpace(namespace, {
		uiTab: function (opt) {
			return createUiTab(opt);
		},
		uiTabAction: function (opt) {
			return createuiTabAction(opt);
		}
	});
	win[global].uiTab.option = {
		current: 0,
		onePanel: false,
		callback: false,
		effect: false,
		align : 'center'
	};
	function createUiTab(opt) {
		var opt = opt === undefined ? {} : opt,
			opt = $.extend(true, {}, win[global].uiTab.option, opt),
			id = opt.id,
			effect = opt.effect,
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			callback = opt.callback,
			align = opt.align;
			
		var	$tab = $('#' + id),
			$btns = $tab.find('> .ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.find('> .ui-tab-pnls'),
			$pnl = $pnls.find('> .ui-tab-pnl');

		var	len = $btn.length,
			keys = win[global].option.keys;
			
		var	para = win[global].uiPara('tab'),
			paras,
			paraname;

		//set up
		if (!!para) {
			if (para.split('+').length > 1) {
				//2 or more : tab=exeAcco1*2+exeAcco2*3
				paras = para.split('+');

				for (var j = 0; j < paras.length; j++ ) {
					paraname = paras[j].split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				}
			} else {
				//only one : tab=1
			 	if (para.split('*').length > 1) {
					paraname = para.split('*');
					opt.id === paraname[0] ? current = Number(paraname[1]) : '';
				} else {
					current = Number(para);
				}
			}
		}

		//set up
		!!effect && $tab.addClass(effect);
		$tab.data('opt', opt);
		$btns.attr('role','tablist');
		$btn.attr('role','tab');
		$pnl.attr('role','tabpanel');
		
		var ps_l = [];

		for (var i = 0; i < len; i++) {
			var $btnN = $btn.eq(i);
			var $pnlN = $pnl.eq(i);
			
			if ($btnN.data('tabnum') === undefined ) {
				$btnN.attr('data-tabnum', i);
			}

			var tabN = Number($btnN.data('tabnum'));
			var isCurrent = current === tabN;
			var cls = isCurrent ? 'addClass' : 'removeClass';
			var attrs = isCurrent ? 'removeAttr' : 'attr';
			
			//make ID
			$btnN.attr('id') === undefined ? $btnN.attr('id', id + 'Btn' + tabN) : '';
			$pnlN.attr('id') === undefined ? $pnlN.attr('id', id + 'Pnl' + tabN) : '';
			
			var btnID = $btnN.attr('id');
			var pnlID = $pnlN.attr('id');

			if (!onePanel) {
				$btnN.attr('aria-controls', pnlID)[cls]('selected');
				$btnN.attr('aria-controls', $pnlN.attr('id'));
				$pnlN.attr('aria-labelledby', btnID).attr('aria-hidden', (current === tabN) ? false : true)[attrs]('tabindex', -1)[cls]('selected');
			} else {
				$btnN.attr('aria-controls', $pnl.eq(0).attr('id')).addClass('selected');
				isCurrent && $pnl.attr('aria-labelledby', btnID).addClass('selected');
			}

			if (isCurrent) {
				$btnN.attr('aria-selected', true).addClass('selected');
			} else {
				$btnN.attr('aria-selected', false).removeClass('selected');
			}
				
			ps_l.push(Math.ceil($btnN.position().left));

			i === 0 ? $btnN.attr('tab-first', true) : '';
			i === len - 1 ? $btnN.attr('tab-last', true) : ''
		}

		callback ? callback(opt) : '';
		$btn.data('psl', ps_l).data('len', len);

		win[global].uiScroll({ 
			value: ps_l[current], 
			target: $btns,
			speed: 0, 
			ps: align
		});

		//event
		$btn.off('click.uitab keydown.uitab')
			.on({
				'click.uitab': evtClick,
				'keydown.uitab': evtKeys
			});

		function evtClick() {
			win[global].uiTabAction({ 
				id: id, 
				current: $(this).index(), 
				align:align 
			}); 
		}
		function evtKeys(e) {
			var $this = $(this),
				n = $this.index(),
				m = Number($this.data('len'));

			switch(e.keyCode){
				case keys.up: upLeftKey(e);
				break;

				case keys.left: upLeftKey(e);
				break;

				case keys.down: downRightKey(e);
				break;

				case keys.right: downRightKey(e);
				break;

				case keys.end: endKey(e);
				break;

				case keys.home: homeKey(e);
				break;
			}

			function upLeftKey(e) {
				e.preventDefault();
				!$this.attr('tab-first') ? 
				win[global].uiTabAction({ id: id, current: n - 1, align:align }): 
				win[global].uiTabAction({ id: id, current: m - 1, align:align});
			}
			function downRightKey(e) {
				e.preventDefault();
				!$this.attr('tab-last') ? 
				win[global].uiTabAction({ id: id, current: n + 1, align:align }): 
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
			function endKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: m - 1, align:align });
			}
			function homeKey(e) {
				e.preventDefault();
				win[global].uiTabAction({ id: id, current: 0, align:align });
			}
		}
	}
	function createuiTabAction(opt) {
		var id = opt.id,
			$tab = $('#' + id),
			$btns = $tab.children('.ui-tab-btns'),
			$btn = $btns.find('.ui-tab-btn'),
			$pnls = $tab.children('.ui-tab-pnls'),
			$pnl = $pnls.children('.ui-tab-pnl'),
			$target = $btns;

		var ps_l = $btn.data('psl'),
			
			opt = $.extend(true, {}, $tab.data('opt'), opt),
			current = isNaN(opt.current) ? 0 : opt.current,
			onePanel = opt.onePanel,
			align = opt.align,
			callback = opt.callback;

		//$btn.eq(current).append('<b class="hide">선택됨</b>');

		var currentPnl = $btns.find('.ui-tab-btn[data-tabnum="'+ current +'"]').index();
		$btn.removeClass('selected').eq(current).addClass('selected').focus();

		var $btnN = $btn.eq(current),
			btnId = $btn.eq(currentPnl).attr('id');

		if ($btns.hasClass('ui-scrollbar')) {
			$target = $btns.find('> .ui-scrollbar-item');
		}

		win[global].uiScroll({ 
			value: ps_l[current], 
			addLeft : $btn.outerWidth(),
			target: $target, 
			speed: 300, 
			ps: align 
		});

		if (onePanel === false) {
			$pnl.attr('aria-hidden', true).removeClass('selected').attr('tabindex', '-1');
			$pnl.eq(current).addClass('selected').attr('aria-hidden', false).removeAttr('tabindex');
		} else {
			$pnl.attr('aria-labelledby', btnId);
		}

		!!callback ? callback(opt) : '';
	}   

})(jQuery, window, document);