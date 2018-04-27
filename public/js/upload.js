$(document).ready(function() {

	console.log("UPLOAD SCRIPT WAS LOADED");

	$("#analizar").click (function(e){

		e.preventDefault();
		console.log("ANALIZAR BUTTON WAS CLICKED");
		sendInfo();
		
	});


});


function sendInfo(){

	var text = $("#textarea2").val();
	//console.log("value of the textarea: " + text);
	
	/*
	var jsonToSend = {
			"userText" : text
	};*/

	$.ajax({

			url: "/PIService",
			cache : false,
		    type : "POST",
		    crossDomain: true,
			data : text,
			ContentType : "text/plain",
			dataType : "json",

			error : function(errorMessage, textStatus, errorThrown) {
		        console.log(errorMessage);
		        console.log(textStatus);
		        console.log(errorThrown);
			},

			success: function(dataReceived){

					console.log("Data that was received from the server: " + dataReceived.personality[0].name);
			
			}

		});




}