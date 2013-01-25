;(function($) {
	  $(function () {
	  	// Enable tooltips
	 $('[rel=tooltip]').tooltip();
	 $('.bar_1').sparkline( [3,4,8,5,3,6,3,2,3,5], {type:"bar", barColor:"#fff" });
	 $('.bar_2').sparkline( [5,3,9,6,5,9,7,3,5,2], {type:"bar", barColor:"#fff", });
	 $('.bar_3').sparkline( [6, 9, 3,5,3,5,2,8,9,6,3], {type:"bar", barColor:"#fff", });

     if (Modernizr.canvas) {

	      $(".bar1").peity("bar", {
	        colour: "#4da74d",
	        width: 30,
	        height: 17
	      }).fadeIn();
	      $(".bar2").peity("bar", {
	        colour: "#cb4b4b",
	        width: 30,
	        height: 17
	      }).fadeIn();
	      $(".line").peity("line").fadeIn();
	    };
    });
	  


    $(function() {
    	$('#sidebar_menu a.accordion-toggle').on('click',function(){
    		var $current = $(this);
    		var hasClassOpened = $current.closest('li').hasClass('opened');
    		$current.closest('ul').find('li.opened').removeClass('opened');
    		if(!hasClassOpened) {
    			$current.closest('li').addClass('opened');
    		}
    	});
    	//UL & LI to Select
    	   $('#github').Touchdown();
		// Dropdowns
		$('select1').each(function(i,e) {

			if ( !($(e).data('convert') == 'no') ) {

				var select = $(e).hide(),
					label = select.children('option:selected').text(),
					color = select.children('option:selected').data('icon-color'),
					options = select.children('option'),
					labeled = select.data('labeled'),
					className = select.attr('class'),
					labelIcon = null;

				var dropdown = $('<div class="btn-group" id="select-group-' + i + '">').insertAfter(select),
					current = select.val() ? select.val() : '&nbsp;',
					li = null;

				labelIcon = (labeled) ? '<i class="icon-sign-blank ' + color + '"></i>' : '';

				$('<a class="btn dropdown-toggle ' + className + '" data-toggle="dropdown" href="#">' +	labelIcon + label + '<span class="icon-sort"></span></a>' +	'<ul class="dropdown-menu"></ul>')
					.appendTo(dropdown);

				options.each(function(o,q) {
					var iconColor = $(q).data('icon-color');

					if (typeof iconColor === 'undefined') {
						iconColor = ' color' + (o+1);
					} else {
						iconColor = ' ' + iconColor;
					}

					if (labeled) {
						labelIcon = '<i class="icon-sign-blank '+ iconColor+'"></i>';
					} else {
						labelIcon = '';
					}

					li = $('<li><a tabindex="-1" href="#" " data-value="' + $(q).attr('value') + '">'+ labelIcon + q.text +'</a></li>');

					dropdown
						.find('.dropdown-menu')
						.append(li);

					if ( $(q).attr('selected') ) {
						dropdown.find('.dropdown-menu li:eq(' + o + ')').click();
					}
				});

		        dropdown.find('.dropdown-menu a').click(function(e) {
		        	var self = $(this);
		        	e.preventDefault();
		            dropdown.find('.btn:eq(0)').html(self.html() + '<span class="icon-sort"></span>');
		            select.find('[selected]').removeAttr('selected');
		            select.find('[value="'+self.data('value')+'"]').attr('selected', 'selected');
		            select.change();
		        });
			}
		});

		// Change Dropdown expanding on hover for navbar and set links back
		$('.navbar').on('hover', ' .dropdown', function() {
			$(this).children('.dropdown-toggle').click();
		});

		// File Input
		$('.fileinput').customFileInput({
	        button_position : 'right'
	    });
	    
	    // Datepicker
		$( ".datepicker" ).datepicker();

		
		// Toggle

		var off = false;

		var toggle = $('.toggle');

		toggle.siblings().hide();
		toggle.show();

		if (toggle.siblings().find(':checked').val() == "on") {
			toggle.removeClass('off').addClass('on');
		} else {
			toggle.removeClass('on').addClass('off');
		};

		$('.content').on('click', '.toggle', function() {
			var self = $(this);

			if (self.hasClass('on')) {
				self.siblings('.off').click();
				self.removeClass('on').addClass('off');
			} else {
				self.siblings('.on').click();
				self.removeClass('off').addClass('on');
			}
		});

	});

})(jQuery);