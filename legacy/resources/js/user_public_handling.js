
/**
can only show the current user
**/
function showuserpublic(uid){		
	$.getJSON('getprofilepublic.json?uid='+uid, function(details){	    
	    // set up details
		var stars = "";		
        for(var x=1; x<=details.feedback;x++){
	        stars +='<i class="fas fa-star"></i>';
        }
		for(var x=details.feedback;x<5;x++){
		    stars +='<i class="far fa-star"></i>';
		}
       // console.log(details);
	    $("#username").html( details.username );
	    $("#blurb").html( details.blurb ? details.blurb : "no blurb yet" );
	    $("#feedback").html( stars );
	    $("#lastseen").html( moment(details.lastseen).fromNow() );
	    $("#tradecount").html( details.tradecount );       
	    $("#verified").html( details.verified );				
	}); 			
}

function showuserrecenttrades(uid){		
	$.getJSON('userTrades.json?uid='+uid, function(trades){	    
	    // set up details
		console.log(trades);
			trades.forEach( k=>{
				var res = moment(k.created).fromNow();
		    	$("#recenttrades").append(
		    	'<div class="container g-5" id="'+k.id+'">' +	
		    	 '<div class="row row-cols row-cols-lg-2 g-12 g-lg-3">' +
		    	 '<div class="card mb-3"><h5 class="card-header">'+k.fromccy.name+'/'+k.toccy.name+'</h5> ('+res+') ' + k.status +
		    	  '<div class="card-body">'+
   	  			    '<h5 class="card-title">'+k.fromAmount+' '+k.fromccy.name+'</h5>'+   	  			   
   	  			  '</div>'+
   	  			 '</div>'+
   	  			'</div>'+	
   	  			'</div>'   		
		    	);
		    })
		    if (trades.length==0){
		    	$("#recenttrades").append(		    	
		    	 '<div class="alert alert-warning" role="alert"> no trade history yet</div>'  );
		    }
	
	}); 			
}