;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){

			$plugins.uiAjax({ 
				id: $('.base-header'), 
				url:'./inc/header.html', 
				page:true, 
				callback:$plugins.common.header 
			});

			$plugins.uiAjax({ 
				id: $('.base-footer'), 
				url:'./inc/footer.html', 
				page:true, 
				callback:$plugins.common.footer 
			});

			$(document).on("touchstart", function(){ });

		},
		
		header: function(){
			var $header = $('.base-header');
			var $wrap = $header.find('.header-wrap');
			var $title = $header.find('.page-title');

			var pageid = $header.data('pageid');
			 
			console.log('header load: ' , pageid);

			switch (pageid) {
				case 99 : subTitle('가이드');
				break;
				case 0 : mainTitle();

				break;
				case 11 : subTitle('사업분야');
				break;
				case 12 : subTitle('GLOBAL MARKETPLACE');
				break;
				case 13 : subTitle('스마일시리즈');
				break;
				case 14 : subTitle('연혁');
				break;

				case 21 : subTitle('직무인터뷰');
				break;
				case 22 : subTitle('복리후생');
				break;
				case 23 : subTitle('OUR DNA');
				break;
				case 24 : subTitle('이베이 라이프');
				break;
				case 25 : subTitle('이베이 소식');
				break;

				case 31 : subTitle('채용절차');
				break;
				case 32 : subTitle('진행중인 공고');
				break;
				case 33 : subTitle('문의하기');
				break;
				case 34 : subTitle('인재풀 등록');
				break;

				case 41 : subTitle('지원서 작성');
				break;
				case 42 : subTitle('지원서 수정');
				break;
				case 43 : subTitle('지원서 조회');
				break;
				case 44 : subTitle('마이페이지');
				break;

				case 51 : subTitle('이메일무단수집거부');
				break;
				case 52 : subTitle('개인정보처리방침');
				break;
		
				default: subTitle('main');
				break;
			}

			function subTitle(v){
				$title.append('<h2>'+ v +'</h2>');
				$wrap.addClass('page-' + pageid);
			}

			function mainTitle(){
				var html = '<div class="hero-main">';
				html += '<div class="n1"><div class="hero-main-item"><strong>Global Marketplace<em>세상 모든 가치를 연결하는 이베이코리아</em></strong></div></div>';
				html += '<div class="n2"><div class="hero-main-item"><strong>Innovative<br>Commerce <em>혁신적인 기술 기반의 차별화 된 경험</em></strong></div></div>';
				html += '<div class="n3"><div class="hero-main-item"><strong>Opportunity<br>for all <em>모두를 위한 기회 창출 </em></strong></div></div>';
				html += '</div>'
				
				$title.append(html);
				$wrap.addClass('page-' + pageid);

				$('.hero-main').slick({
					dots: true,

					// autoplay: true,
					// autoplaySpeed: 2000,
				});
			}

			$wrap.find('.btn-nav').off('click.nav').on('click.nav', function(){
				var v = !!$('body.nav-open').length;
				$plugins.common.navOpen(v);
			});
			// $wrap.find('.btn-close').off('click.nav').on('click.nav', $plugins.common.navClose);
		},
		navOpen: function(v){
			var $body = $('body');

			v ? 
			$body.removeClass('nav-open') :
			$body.addClass('nav-open');

			$('.ebay-nav').scrollTop(0);
		},

		footer: function(){
			console.log('footer load');
		}
	};


	
})(jQuery, window, document);
