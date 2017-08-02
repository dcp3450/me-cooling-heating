<?php
	
	//store all posted vars
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$companycity = $_POST['companycity'];
	$telephone = $_POST['telephone'];
	
	//set the from, to, and subject
	$from = "dcp3450@gmail.com";
	$to = $email;
	$subject = "Thank you - from Mitsubishi Electric";
	
	//define the message using a template
	$message = "
	Hello {$firstname},
	
	We have recived the following information about you and will be in touch shortly:
	
	Name: {$firstname} {$lastname}
	Company: {$company}
	Company City: {$companycity}
	Email Address: {$email}
	Contact Phone Number: {$telephone}
	
	Thank you for your time and we look forward to working with you.
	
	Sincerely,
	John Doe
	";
	$headers = "From:" . $from;
	
	//send the email and respond with a 1 if it sends.
	echo mail($to,$subject,$message, $headers);
	
	//always exit an ajax call after the function completes
	exit;
	
?>