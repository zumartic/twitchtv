$( document ).ready(function() {
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

	var twitchRequestTimeout = setTimeout(function(){
		$(".list-group").html('<li class="list-group-item notfound"><img src="dead_glitch.png" height="100px" width="100px" /><h3>Failed to get twitch resources</h3><p></p></li>');
	}, 8000);
	
	$.each(users, function ( index, value ) {
	$.getJSON('https://api.twitch.tv/kraken/streams/' + value + '?client_id=3xgtvi3b9bw5gulygar2gl74118btq8&callback=?', function(data) {
		console.log(data);
		if(data.stream){
			// User is online
			$(".list-group").append('<li class="list-group-item online"><img src="' + data.stream.channel.logo +'" height="100px" width="100px" /><h3><a href="' +data.stream.channel.url +'" target="_blank">' +data.stream.channel.display_name +'</a></h3><p>' +data.stream.channel.status +'</p></li>');
		} else if(!(data.error)){
				// User is offline
				$.getJSON('https://api.twitch.tv/kraken/users/' + value + '?client_id=3xgtvi3b9bw5gulygar2gl74118btq8&callback=?', function(data) {
				$(".list-group").append('<li class="list-group-item offline"><img src="' +data.logo +'" height="100px" width="100px" /><h3><a href="https://www.twitch.tv/' +data.name +'" target="_blank">' +data.display_name +'</a></h3><p>' +data.bio +'</p></li>');
				});
		} else {
			//User not found			
			$(".list-group").append('<li class="list-group-item notfound"><img src="dead_glitch.png" height="100px" width="100px" /><h3>' + data.error + '</h3><p>' + data.message + '</p></li>');
		}
		});
	});
	clearTimeout(twitchRequestTimeout);
	document.getElementById("all").checked=true;
	$(".text_input").val("");
});

// Filtering based on the online visibility
$("input[type='radio']").click(function(){
      if(document.getElementById("all").checked){
		  $( "li" ).removeClass("hiddenB");
	  }
	  
	  if(document.getElementById("online").checked){
		$( "li" ).addClass("hiddenB");
		$("li.online").removeClass("hiddenB");
	  }
	  
	  if(document.getElementById("offline").checked){
		$( "li" ).addClass("hiddenB");
		$("li.offline").removeClass("hiddenB");
	  }
});

// Filtering based on the search
$( ".text_input" ).keyup(function() {
	filter = $( this ).val();  //.toLowerCase();
	$( "li" ).addClass("hiddenF");
	$( "li > h3:Contains(" +filter +")").parent().removeClass("hiddenF"); 
});

// Case insensitive search
jQuery.expr[':'].Contains = function(a, i, m) {
  return jQuery(a).text().toUpperCase()
      .indexOf(m[3].toUpperCase()) >= 0;
};


