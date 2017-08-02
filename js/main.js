jQuery(document).ready(function(){
	
	//control the switching of tabs, when a user selects an li in the tabs class
	//I'm doing some event delegation since this is better for performance rather
	//than having a event for each element the event is on the parent and check to
	//see if a child is clicked
	$('.tabs').on('click','li',function(){
		var selectedTab = $(this);
		
		//get the index for the selected tab
		var tabIndex = selectedTab.index();
		
		//remove the active class from the "other" tabs
		//add the active class to the item clicked
		selectedTab.siblings().removeClass('active');
		selectedTab.addClass('active');
		
		//updated the mobile tabs in case the user switches views the mobile tab will be correct
		$('.mobile-tabs option').eq(tabIndex).attr('selected','selected');
		
		//switch the tab content
		changeTab(tabIndex);
	});
	
	//We're showing a different tab option for mobile
	$('.mobile-tabs').change(function(){
		var selectedTab = $(this).find(':selected');
		var allTabs = $('.tabs li');
		
		//get the index for the selected option
		var tabIndex = selectedTab.index();
		
		//update the non "select" style tab incase the user switches back
		allTabs.removeClass('active');
		allTabs.eq(tabIndex).addClass('active');
		
		//switch the tab content
		changeTab(tabIndex);
	});
	
	//trigger the form and the overlay when any item with the class "form-trigger"
	//is selected
	$('.form-trigger').on('click',function(e){
		//get the scroll position of the window
		var scrollTopPos = $(window).scrollTop();
		
		//show the overlay by adding the active class
		$('#overlay').addClass('active');
		
		//show the form container by adding the active class then place it into
		//the user user's view as they might have scrolled
		$('.form-container').addClass('active').css({'top':(scrollTopPos+40)+'px'});
		
		//if it's a link we need to stop it from working
		e.preventDefault();
	});
	
	//check for the overlay click to close everything
	$('#overlay').on('click',function(e){
		//run the function to close everything
		closeOverlay();
	});
	
	//check if the users presses the esc key to close everything
	$(document).keyup(function(e) {
	     if (e.keyCode == 27) {
		     
		    //run the function to close everything
	        closeOverlay();
	    }
	});
	
	//when the user submits the form
	$('#brochureForm').on('submit',function(e){
		
		//store a reference to the form itself, store the form data, and set validation values
		var form = $(this);
		var formData = form.serialize();
		var requiredPass = true;
		var validEmail = true;
		var noSend = $('.form-container .no-send');
		var thankYou = $('.form-container .thank-you');
		
		//reset error classes in case it errored last time
		$('.form-inputs input').removeClass('error');
		
		//make sure all required items are filled in
		$(this).find('.form-inputs .required').each(function(){
			//store the current input under review and that input's value
			var currentInput = $(this).find('input');
			var requiredValue =  currentInput.val();
			
			//if the current input is empty mark the error and fail the validation
			if(requiredValue == ""){
				currentInput.addClass('error');
				requiredPass = false;
			}
			
			//if the current input is an email but it's not valid mark the error and fail the validation
			if(currentInput.attr('type') == "email"){
				validEmail = validateEmail(requiredValue);
				if(!validEmail){
					currentInput.addClass('error');
				}
			}
		});
		
		//if anythng failed, don't process the form
		if(!requiredPass || !validEmail) {
			return false;
		}
		
		//make an ajax request to process the form
		$.post('process.php',formData,function(data){
			//if the email sent the file returns the number 1
			if(data == 1) {
				//since the email sent clear the inputs and show a thank you message
				$('.form-inputs input').val("");
				$('.form-container .thank-you').fadeIn(300);
				
			} else {
				//show a "sorry" message if the sending fails
				$('.form-container .no-send').fadeIn(300);
			}
		})
		
		//we need to prevent the form form sending traditionally
		e.preventDefault();
	});
		
	function closeOverlay() {
		//close the overlay and the form
		$('#overlay').removeClass('active');
		$('.form-container').removeClass('active');
		var noSend = $('.form-container .no-send');
		var thankYou = $('.form-container .thank-you');
		
		//hide any sending messages so all messages are fresh
		noSend.hide();
		thankYou.hide();
	}
	
	function changeTab(index){
		//remove the the active class from all targets and add the active class only on the selected one
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