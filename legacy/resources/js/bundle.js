
const WEBSERVER = "https://tinance.techiaz.com/";
const FEEPCT = 0.0015
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

const APP_DECL = 'app';
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

const APP_DEFAULT = {
	web3Provider: null,
	contracts : {},
	USR_WALLETS : null,	 	  	
	BLOCK_NETWORK : 'NOT-SET',
	ccydict : {},
	ccyMap : {},    // map of ISO name to ccy
	web3 : null,
	usdt_details : {address:"none",decimals:0,ctr:"none"},
	escrow_details : {address:"none",ctr:"none"},
	accounts : null,
	usrid : 0,
	usrname : "-none-",
	mytrades: {},
	jwttoken : null,
	web3Modal : null,
	provider : null,
	selectedAccount : null,
  };

var App = APP_DEFAULT;

function pageStart() {	
		
	getAppData();

	if (App.jwttoken != null){
		 $('#signinmenu').css("display", "none");
	}

	var ixy = $.getJSON(WEBSERVER+"ccycodes.json", {
		format: "json"
	})
	.done(function(data){						
		 $.each( data, function( i, item ) {
			 App.ccydict[item.id] = item;
			 App.ccyMap[item.name] = item;
		 });
		 //setCcySelect("coinid");
		 setCcyAll('fromccy',0);
		 setCcyAll('toccy',1);	
		 saveAppData( );	
	});				
	
	// if we are logged in....
	if (App.jwttoken!==null){
		getJWTJSON('v1/getuserdetails.json', function(usr){		    	
			App.usrid = usr.id;	
			App.usrname = usr.username;	
			saveAppData();	
		});
	}
	 const providerOptions = {
		walletconnect: {
		  package: WalletConnectProvider,
		  options: {		        
			 infuraId: "13ba69a445a244859517b9c014a5a297",
		  }
		},

		fortmatic: {
		  package: Fortmatic,
		  options: {
			// Mikko's TESTNET api key
	  //      key: "pk_test_391E26A3B43A3350"
		  }
		}
	  };

		App.web3Modal = new Web3Modal({
		cacheProvider: false, // optional
		providerOptions, // required
		disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.		
	  });
	
	browseOffers();
	document.querySelector("#btn-connect").addEventListener("click", onConnect);
	saveAppData();
}

	function clearPanel(){
		$("#mainDiv").empty();
		$('#newofferdiv1').css("display", "none");
		$('#newofferdiv2').css("display", "none");	
		$('#pretrade').css("display", "none");
		$('#posttrade').css("display", "none");		
	}hideMsgs();
	function clearBar(){
		$("#alertbar").empty();
	}

	function showlogin(){		
		$('#loginmodal').modal('show');
	}
	
	function hideMsgs(){
		$('#msgdialog').modal('hide');
	}
	
	function selccy(ccy,src){		
		if (src==0) 
			$('#dropdownCurr1').html(ccy)
		if (src==1)
			$('#dropdownCurr2').html(ccy)
	}
	
	function setPayTypes(divid){
	getJWTJSON('v1/public/paymenttypes.json',null, function(ptypes){	
		console.log("Payment Types: "+ptypes)	
		$('#'+divid).empty();
		var idx=1;
	    ptypes.forEach( item=>{
		    $('#'+divid).append(
				'<input type="checkbox" class="btn-check" name="paychk" value="'+item.name+'" id="btncheck'+idx+'" autocomplete="off">'+
				 '<label class="btn btn-sm btn-light" for="btncheck'+idx+'">'+item.name+'</label>'
			);
			idx++;
		});
	});
	}
	function getSelectedPayTypes(){
	 var favorite = [];
            $.each($("input[name='paychk']:checked"), function(){
                favorite.push($(this).val());
            });
    //console.log(favorite);
    return favorite;
	}
	
	function setOfferPayButtons(divid,paylist){	
		var idx=0;		
	    paylist.forEach( item=>{
		    $('#'+divid).append(			
			 '<input type="radio" id="payid_'+idx+'" class="btn-check" onclick="userpay('+idx+')" value="'+item.id+'" name="selectedpay" autocomplete="off" >'+
  			 '<label class="btn btn-outline-primary btn-sm" for="payid_'+idx+'">'+item.payType.name+'</label>'
			);			
			idx++;
		});
	}
	
	// PRE TRADE
	
	function userpay(clickid){
 		console.log(clickid);
  		console.log(thisoffer.paymentDetails)
  		$('#paydetail').html(thisoffer.paymentDetails[clickid].payDetails);
	}
	
/*


	function pretrade(ordid){
		clearPanel();
		getJWTJSON('v1/getoffer.json?oid=' + ordid,null, function(puboffer) {
			console.log(puboffer);
			$('#pretrade').css("display", "block");
			thisoffer = puboffer;
			showthisoffer(puboffer)
			showuserpublic(puboffer.userId);
			showuserrecenttrades(puboffer.userId);
			//setOfferPayButtons('paydetail', puboffer.paymentDetails);
			$('#amtsell').val(puboffer.fromAmount);	
			$('#amtbuy').val(puboffer.fromAmount);
		});		
	}
	*/
	function showuserpublic(uid){		
	  getJWTJSON('v1/public/getprofilepublic.json?uid='+uid,null, function(details){	    
	    // set up details
		console.log(JSON.stringify(details));
		var stars = "";		
        for(var x=1; x<=details.feedback;x++){
	        stars +='<i class="fas fa-star"></i>';
        }
		for(var x=details.feedback;x<5;x++){
		    stars +='<i class="far fa-star"></i>';
		}
       // console.log(details);
	    $("#uname").html( details.username );
	    $("#blurb").html( details.blurb ? details.blurb : "no blurb yet" );
	    $("#feedback").html( stars );
	    $("#lastseen").html( moment(details.lastseen).fromNow() );
	    $("#tradecount").html( details.tradecount );       
	    $("#verified").html( details.verified );				
	}); 			
	}
	
	function showuserrecenttrades(uid){		
		getJWTJSON('v1/public/userTrades.json?uid='+uid,null, function(trades){	    
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
		
	// NEW OFFER CREATION
	function newOffer(){
		clearPanel();
		clearBar();
		setPayTypes('paymethods');
		$('#newofferdiv1').css("display", "block");
		$('#newofferdiv2').css("display", "block");
	}


function initContractData(){
		getJWTJSON('v1/getnetworkconfig.json',null, function(netw){	
		console.log("Network : "+JSON.stringify(netw));
		App.BLOCK_NETWORK = netw.httpService;  // "http localhost or Mainnet address
		App.escrow_details.address = netw.escrowCtrAddr;  // Contract Address Escro
		App.usdt_details.address = netw.usdtcoinCtrAddr;		
		
		const web3 = new Web3(App.provider);
		
/*		
		if (typeof App.web3 !== 'undefined') {
			        App.web3 = new Web3(web3.currentProvider);
			      } else {
			        App.web3 = new Web3(new Web3.providers.HttpProvider(App.BLOCK_NETWORK));
		}
*/
		//console.log("network: "+App.BLOCK_NETWORK);	
		//provider = 	new Web3.providers.HttpProvider(BLOCK_NETWORK);
		//console.log(provider)
		//web3 = new Web3(provider);
		//console.log("Web 3 ver: "+web3.version);
		
		App.usdt_details.ctr = new web3.eth.Contract(minABI,App.usdt_details.address);   // the USD / JVM coin
		usdt_dec = App.usdt_details.ctr.methods.decimals().call( function(error, decimals){
			App.usdt_details.decimals = decimals;
		});		
    	 $.getJSON(WEBSERVER+'resources/contracts/TinanceEscrow.json', function(){
			 
		 })
		 .done(function(abi_data){	
			console.log(abi_data);						 
			App.escrow_details.ctr = new web3.eth.Contract(abi_data.abi, App.escrow_details.address);
			completeFunc();			
		 });
			
	});
}
	
/*
function initCoins(completeFunc){    
	var ixy = getJWTJSON("ccycodes.json", null, {
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
}
*/

function setCcyAll(targetdiv,from){
	//console.log('setCcyCrypto' +JSON.stringify(ccydict));
	var tdiv = $("#"+targetdiv);
	$.each( App.ccydict, function( k, v ) {
		tdiv.append('<button onclick="selccy(\''+v.name+'\','+from+')" type="button" class="dropdown-item" name="buySellCrypto" autocomplete="off">'+
					v.name+'</button>');
					// show coin image '<img src="/resources/images/'+v.name+'.png" style="width: 16px;"/> '		
	});
}



