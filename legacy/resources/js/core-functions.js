/**
 * Core JS functions
 * 
 */


 function saveAppData() {
	console.log('Saving app data');	
	localStorage.setItem(APP_DECL, JSON.stringify(App));
}

function getAppData() {
    if (localStorage) {			
		if (localStorage.getItem(APP_DECL) == "null"){			    	
			saveAppData();			
		}else{
			console.log('Loading app data ');	
		}
		App = JSON.parse(localStorage.getItem(APP_DECL));
		console.log(App);
    }else{
		alert("browser not supporting local storage");
	}
}

function clearData(){
	localStorage.setItem(APP_DECL,'null');
	App = APP_DEFAULT;
}

function showCacheData(){
	getAppData();
}

function getJWTJSON(shortUrl,jsondata,dataFunction){
	// if no auth set, try with auth header first
	header = { 	
		"accept": "application/json",
		"Access-Control-Allow-Origin":"*"
	  };
	  if (App.jwttoken!=null){
		   header["Authorization"]="Bearer "+App.jwttoken;	  
	  }
	$.ajax({
		crossDomain: true,		
		type: 'GET',				  
		contentType : "application/json",
		dataType : 'json',
		data : jsondata==null ? null : JSON.stringify(jsondata),
		url: WEBSERVER+shortUrl,
		headers: header,
		success: dataFunction,	
		fail : function(jqXHR, textStatus, errorThrown) {		
			$('#msgdetails').html(
				'<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
			$('#msgdialog').modal('show')
		},
	}).fail(function(msg) {
		/// report error

	});	  
}


function postJWTJSON(shortUrl,jsondata,dataFunction){
	header = { 	
		"accept": "application/json",
		"Access-Control-Allow-Origin":"*"
	  };
	  if (App.jwttoken!=null){
		   header["Authorization"]="Bearer "+App.jwttoken;	  
	  }
	$.ajax({
		type: 'POST',
		url: WEBSERVER+shortUrl,
		data:  jsondata==null ? null : JSON.stringify(jsondata),
		contentType: "application/json",
		dataType: 'json',
		headers: header,		
		success: dataFunction,
		fail: function(jqXHR, textStatus, errorThrown) {			
			$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');			
			$('#msgdialog').modal('show')
		},
	}).fail(function(){alert('error')});		
}

	function jwtlogin(){		
			var name = $('#username').val();
			var pwd = $('#password').val();
			var token = ''
			console.log("user "+name)
			$.ajax({			 
			  type: 'POST',
			  contentType : "application/json",
			  dataType : 'json',
			  url: WEBSERVER+'auth/signin',
			  data: JSON.stringify({ username: name , password: pwd }),
			  success: function(resultData){
				App.jwttoken = resultData.token;				
				getJWTJSON('v1/getuserdetails.json',null, function(usr){	
					console.log("got user data "+usr)	    	
					App.usrid = usr.id;	
					App.usrname = usr.username;						
					$('#loginmodal').modal('hide');					
					saveAppData();
				});
			  }
			});		
	}