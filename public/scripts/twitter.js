$(document).ready(function() {


	console.log("started TWITTER script");

	$("#twitterButton").click (function(e){

		e.preventDefault();
		getTweets();
		
		
	});


});


function getTweets() {

	$.ajax({
        type:'GET',
        dataType:'jsonp',
        url:'http://api.twitter.com/1/statuses/user_timeline.json',
        data:{screen_name:'Alex__Salgado', include_rts:false}, //show retweets
        success:function(dataReceived) {
           console.log(dataReceived);
        },
        error:function(req, status, error) {
            alert('error: '+status);
        }
    });

}