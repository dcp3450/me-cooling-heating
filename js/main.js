jQuery(document).ready(function(){
	
	$('.tabs').on('click','li',function(){
		var selectedTab = $(this);
		var tabIndex = selectedTab.index();
		
		selectedTab.siblings().removeClass('active');
		selectedTab.addClass('active');
		$('.mobile-tabs option').eq(tabIndex).attr('selected','selected');
		
		changeTab(tabIndex);
	});
	
	$('.mobile-tabs').change(function(){
		var selectedTab = $(this).find(':selected');
		var tabIndex = selectedTab.index();
		
		$('.tabs li').removeClass('active');
		$('.tabs li').eq(tabIndex).addClass('active');
		
		changeTab(tabIndex);
	});
	
	$('.form-trigger').on('click',function(e){
		var scrollTopPos = $(window).scrollTop();
		
		$('#overlay').addClass('active');
		$('.form-container').addClass('active').css({'top':(scrollTopPos+40)+'px'});
		//$('body').css({'overflow':'hidden'});
		
		e.preventDefault();
	});
	
	$('#overlay').on('click',function(e){
		closeOverlay();
	});
	
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) {
	        closeOverlay();
	    }
	});
	
	$('#brochureForm').on('submit',function(e){
		
		var form = $(this);
		var formData = form.serialize();
		var requiredPass = true;
		var validEmail = true;
		
		$('.form-inputs input').removeClass('error');
		
		//make sure all required items are filled in
		$(this).find('.form-inputs .required').each(function(){
			var currentInput = $(this).find('input');
			var requiredValue =  currentInput.val();
			
			if(requiredValue == ""){
				currentInput.addClass('error');
				requiredPass = false;
			}
			
			if(currentInput.attr('type') == "email"){
				validEmail = validateEmail(requiredValue);
				if(!validEmail){
					currentInput.addClass('error');
				}
			}
		});
		
		if(!requiredPass || !validEmail) {
			return false;
		}
		
		
		$.post('process.php',formData,function(data){
			if(data == 1) {
				$('.form-inputs input').val("");
				$('.form-container .thank-you').fadeIn(300);
				
			} else {
				alert('boom');
			}
		})
		
		e.preventDefault();
	});
	
	//get the scroll position to display the popup to the user at the correct location (not too high).
	//only get it if the popup is closed and throttle for better performance
	
	var scrollTimer;
	
	function scrollActions(){
		var scrollTopPos = $(window).scrollTop();
		
		$('.form-container').css({'top':'100px'});		
	}
		
	function closeOverlay() {
		$('#overlay').removeClass('active');
		$('.form-container').removeClass('active');
		$('body').css({'overflow':'auto'});
	}
	
	function changeTab(index){
		$('.tab-target .target').removeClass('active').eq(index).addClass('active');
	}
	
});

function validateEmail(email){
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				
	if (!filter.test(email)) {
		return false;
	} else {
		return true;
	}
}