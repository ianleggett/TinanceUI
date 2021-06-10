

// minABI is defined at the bottom of this file

var USR_WALLETS = {};	 	  	
var BLOCK_NETWORK ='NOT-SET';
var ccydict = {};
var web3; 
var usdt_details = {address:"none",decimals:0,ctr:"none"}
var escrow_details = {address:"none",ctr:"none"}

 function toCoin(val){
	 return val * 10**usdt_details.decimals;
 }
 
 function fromCoin(val){
	 return val / 10**usdt_details.decimals;
 }

function refreshView(){
	$('#msgdialog').modal('hide');
	location.reload();
}

function resetCoinForm(){
	$('#coin_form')[0].reset()	
}

function initCoins(completeFunc){    
	var ixy = $.getJSON("ccycodes.json", {
		format: "json"
	})
	.done(function(data){			
		 $.each( data, function( i, item ) {
			 ccydict[item.id] = item;
		 });
		 setCcySelect("coinid");
	setCcyCrypto('buycrypto');
	setCcyCrypto('sellcrypto');
	setCcyFiat('fiatexchange');
	});	
	
	$.getJSON('getnetworkconfig.json', function(netw){			
		BLOCK_NETWORK = netw.httpService;  // "http localhost or Mainnet address
		escrow_details.address = netw.escrowCtrAddr;  // Contract Address Escro
		usdt_details.address = netw.usdtcoinCtrAddr;		
		
		if (typeof web3 !== 'undefined') {
			        web3 = new Web3(web3.currentProvider);
			      } else {
			        web3 = new Web3(new Web3.providers.HttpProvider(BLOCK_NETWORK));
		}
		
		console.log("network: "+BLOCK_NETWORK);	
		//provider = 	new Web3.providers.HttpProvider(BLOCK_NETWORK);
		//console.log(provider)
		//web3 = new Web3(provider);
		console.log("Web 3 ver: "+web3.version);		
		usdt_details.ctr = new web3.eth.Contract(minABI,usdt_details.address);   // the USD / JVM coin
		usdt_dec = usdt_details.ctr.methods.decimals().call( function(error, decimals){
			usdt_details.decimals = decimals;
				//console.log("USDT : "+JSON.stringify(usdt_details));					
		});		
    	 $.getJSON('resources/contracts/TinanceEscrow.json', function(){
			 
		 })
		 .done(function(abi_data){	
			 //console.log(abi_data);						 
			 escrow_details.ctr = new web3.eth.Contract(abi_data.abi, escrow_details.address);
			completeFunc();		 
		 });
			
	});	
}

function setCcyAll(targetdiv,from){
	//console.log('setCcyCrypto' +JSON.stringify(ccydict));
	var tdiv = $("#"+targetdiv);
	$.each( ccydict, function( k, v ) {
		tdiv.append('<button onclick="selccy(\''+v.name+'\','+from+')" type="button" class="dropdown-item" name="buySellCrypto" autocomplete="off">'+
					v.name+'</button>');
					// show coin image '<img src="/resources/images/'+v.name+'.png" style="width: 16px;"/> '		
	});
}

function setCcyCrypto(targetdiv){
	//console.log('setCcyCrypto' +JSON.stringify(ccydict));
	var tdiv = $("#"+targetdiv);
	$.each( ccydict, function( k, v ) {
		//console.log(v);
		if ((v.ccyType==='ERC20'))
		tdiv.append('<input onchange="recalc()" type="radio" class="btn-check" name="buySellCrypto" id="'+targetdiv+'_'+v.name+'" autocomplete="off">'+
					'<label class="btn btn-light" for="'+targetdiv+'_'+v.name+'"><img src="/resources/images/'+v.name+'.png" style="width: 16px;"/> '+v.name+'</label>');		
	});
}

function setCcyFiat(targetdiv){
	//	console.log('setCcyCrypto' +JSON.stringify(ccydict));
	var tdiv = $("#"+targetdiv);
	$.each( ccydict, function( k, v ) {
		//console.log(v);
		if ((v.ccyType==='Fiat'))
		tdiv.append('<input type="radio" onchange="recalc()" class="btn-check" name="exchangeFiat" id="'+targetdiv+'_'+v.name+'" autocomplete="off">'+
					'<label class="btn btn-light" for="'+targetdiv+'_'+v.name+'">'+v.name+'</label>');		
	});
}

function setCcySelect(targetcombo){	
	var tcombo = "#"+targetcombo;	
	$( tcombo ).empty();
	$( "<option>" ).attr("value","0").html(NONE_JOB).appendTo( tcombo );	
	$.each( ccydict, function( k, v ) {	
		if (v.ccyType==='ERC20'){					
		   $( "<option>" ).attr("value",v.id).html(v.name).appendTo( tcombo );		   
		}		
	});
	// set the last one selected
	$(tcombo).val(10); 
}

/**
can only show the current user
**/
function showCoins(){
	$.getJSON('getUserCoins.json', function(coins){
    coins.forEach( k=>{
	    	$("#cointable").append(
		'<tr><td><div class="input-group mb-2 mb-sm-0">'+
		'<div class="input-group-addon">'+k.coinType.name+'</div>' +
		'</div></td>'+
		'<td>'+k.walletAddress+
		'</div></td>'+
		'<td id="coin_'+k.id+'"></td><td><button id="update" class="btn btn-sm btn-danger" type="button" onclick="deleteUserCoin('+k.id+')" > <i class="far fa-trash-alt"></i></button></td></div>'+				
		'</tr>');
		 		 
	   	 balance = usdt_details.ctr.methods.balanceOf( k.walletAddress ).call(function(error, result){
				if (error){
					showMessage("Error "+error);
				}				
				console.log("res:"+JSON.stringify(result));					   			
	   			var balance = fromCoin( parseFloat(result) );	   			
			   $('#coin_'+k.id).html(balance.toFixed(2).toString());
	   	});     
			
	    })	

	}); 	
	
}

function deleteUserCoin(coinid){		
		
		$.ajax({
		    type: 'POST',
		    url: 'deleteusercoin.json?cid='+coinid,// + csrfname +'='+csrfvalue,
		    data: JSON.stringify(""),
		    contentType: "application/json",
		    dataType: 'json',
		    success: function(data) {		    	
		    	$('#msgdialog').modal('show');
		    	$('#msgtitle').html('Coin delete');
		    	if (data.statusCode==0){		    		
		    		$('#msgdetails').html('Success - coin removed <button onclick="refreshView();" type="button" class="btn btn-success"><i class="fas fa-check"></i> OK</button>');
		    	}else{		    		
		    		$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed '+data.msg+'</button>');		    		
		    	}
		    },	
		    fail: function(jqXHR, textStatus, errorThrown) {
		    	$('#coinDialog').modal('hide');
		    	$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
		    },
		}).fail(function(){alert('error')});		
    
}

function addUpdateCoin(){
	
	// is this a new order or existing edit?
	var isNew = ($("#coinid").val()==0);
	
	var attribNew = {coinid:'nocheck',walletAddr:'string', coinprecision:'nocheck'}
	
	var attribExisting = {coinid:'number',walletAddr:'string', coinprecision:'nocheck'}
	
	var postObject = validateForm( isNew ? attribNew : attribExisting );	
		
	// check all fields
	postObject.id = postObject.editid;	
	delete postObject.editid;
	postObject.notes = postObject.newlinenote;
	delete postObject.newlinenote;
		
	//postObject.errorcount=0;  // ICL override for testing
	
	console.log(JSON.stringify(postObject));
	
	if (postObject.errorcount==0){		
		//console.log(JSON.stringify(postObject));
		$.ajax({
		    type: 'POST',
		    url: 'addupdatecoin.json',// + csrfname +'='+csrfvalue,
		    data: JSON.stringify(postObject),
		    contentType: "application/json",
		    dataType: 'json',
		    success: function(data) {
		    	$('#editjob').modal('hide');
		    	$('#msgdialog').modal('show');
		    	$('#msgtitle').html('Job Added');
		    	if (data.statusCode==0){		    		
		    		$('#msgdetails').html('Success - Added Order <button onclick="refreshView();" type="button" class="btn btn-success"><i class="fas fa-check"></i> OK</button>');
		    	}else{		    		
		    		$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed '+data.msg+'</button>');		    		
		    	}
		    	$('#coinDialog').modal('hide');		    	
		    },	
		    fail: function(jqXHR, textStatus, errorThrown) {
		    	$('#coinDialog').modal('hide');
		    	$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
		    },
		}).fail(function(){alert('error')});		
    }
}


function newCoin(){
	resetCoinForm();
	//$("#coinid").val( 0 );
	
	$('#coinDialog').modal('show');
}

const minABI = [
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "payable": true,
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    }
];