;(function($, win, doc, undefined) {

	'use strict';
	
	$plugins.common = {
		init: function(){

			$plugins.uiAjax({ 
				id: $('.base-header'), 
				url:'/ebayJob/html/inc/header.html', 
				page:true, 
				callback:$plugins.common.header 
			});


			console.log('------------------------------------------------------')

			$plugins.uiCaption();
			$plugins.uiInputClear();


			

		},
		
		header: function(){
			var $header = $('.base-header');
			var $wrap = $header.find('.header-wrap');
			var $title = $header.find('.page-title');

			var pageid = $header.data('pageid');
			 
			console.log('header load: ' , pageid);

			switch (pageid) {
				case 99 :
					subTitle('가이드');
					break;
				case 0 :
					subTitle('main');
					break;
				case 1 :
					subTitle('사업분야');
					break;
				default:
					subTitle('main');
					break;
			}

			function subTitle(v){
				$title.append('<h2>'+ v +'</h2>');
				$wrap.addClass('page-' + pageid);
			}
		},
		navOpen: function(){
		
		},
		settingAside: function(){
			
		},
		pageInit: function(v){
			
		},
		menuAjax: function(){
		

			
		},
		footer: function(){
			console.log('footer load');
		}
	};

	//callback
	$plugins.callback = {
		modal: function(modalId){
			switch(modalId) {
				case 'modalID':
					break;  

					
			}
		}
	}
   
	
})(jQuery, window, document);
