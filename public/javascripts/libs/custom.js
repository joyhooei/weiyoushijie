
$(document).ready(function(){
	$("#username").focus(function() {
		
		$(this).parent(".input-prepend").addClass("input-prepend-focus");
	
	});
	
	$("#username").focusout(function() {
		
		$(this).parent(".input-prepend").removeClass("input-prepend-focus");
	
	});
	
	$("#password").focus(function() {
		
		$(this).parent(".input-prepend").addClass("input-prepend-focus");
	
	});
	
	$("#password").focusout(function() {
		
		$(this).parent(".input-prepend").removeClass("input-prepend-focus");
	
	});
	
				
	/* ---------- Add class .active to current link  ---------- */
	$('ul.main-menu li a').each(function(){
			if($($(this))[0].href==String(window.location)) {
				
				$(this).parent().addClass('active');
			}
	});
	
	$('ul.main-menu li ul li a').each(function(){
			if($($(this))[0].href==String(window.location)) {
				$(this).parent().addClass('active');
				$(this).parent().parent().show();
			}
	});
	
	/* ---------- Submenu  ---------- */
	$('.dropmenu').click(function(e){

		e.preventDefault();

		$(this).parent().find('ul').slideToggle();
	
	});
	
	$(".rest").restfulizer();
	
	/* ---------- Datapicker ---------- */
	$('.datepicker').datepicker();
	$('input[type="datetime"]').datetimepicker();
	
	/* ---------- Notifications ---------- */
	$('.noty').click(function(e){
		e.preventDefault();
		var options = $.parseJSON($(this).attr('data-noty-options'));
		noty(options);
	});


	/* ---------- Makes elements soratble, elements that sort need to have id attribute to save the result ---------- */
	$('.sortable').sortable({
		revert:true,
		cancel:'.btn,.box-content,.nav-header',
		update:function(event,ui){
			//line below gives the ids of elements, you can make ajax call here to save it to the database
			//console.log($(this).sortable('toArray'));
		}
	});

	/* ---------- Tooltip ---------- */
	$('[rel="tooltip"],[data-rel="tooltip"]').tooltip({"placement":"bottom",delay: { show: 400, hide: 200 }});

	/* ---------- Datable ---------- */
	$('.datatable').dataTable({
        "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Chinese.json"
        }
    });
    
    $("form").validationEngine();
});
