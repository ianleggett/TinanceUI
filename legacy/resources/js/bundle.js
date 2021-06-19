Just put your skype id here::

// const WEBSERVER = "https://localhost:8443/";
const WEBSERVER = "https://tinance.techiaz.com/"
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

App = {
	web3Provider: null,
	contracts: {},
	USR_WALLETS: null,
	BLOCK_NETWORK: 'NOT-SET',
	ccydict: {},
	ccyMap: {},    // map of ISO name to ccy
	web3: null,
	usdt_details: { address: "none", decimals: 0, ctr: "none" },
	escrow_details: { address: "none", ctr: "none" },
	accounts: null,
	usrid: 0,
	mytrades: {},
	jwttoken: null
};

const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;
// Web3modal instance
let web3Modal
// Chosen wallet provider given by the dialog window
let provider;
// Address of the selected account
let selectedAccount;

/*********************************************************** init & reset ******************************** */
function pageStart() {
	var ixy = $.getJSON(WEBSERVER + "ccycodes.json", {
		format: "json"
	})
		.done(function (data) {
			$.each(data, function (i, item) {
				App.ccydict[item.id] = item;
				App.ccyMap[item.name] = item;
			});
			//setCcySelect("coinid");
			setCcyAll('fromccy', 0);
			setCcyAll('toccy', 1);
		});

	$.getJSON(WEBSERVER + 'getuserdetails.json', function (usr) {
		App.usrid = usr.id;
	});

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

	web3Modal = new Web3Modal({
		cacheProvider: false, // optional
		providerOptions, // required
		disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
	});

	document.querySelector("#btn-connect").addEventListener("click", onConnect);

	domByAuth();
}

function setCcyAll(targetdiv, from) {
	//console.log('setCcyCrypto' +JSON.stringify(ccydict));
	var tdiv = $("#" + targetdiv);
	$.each(App.ccydict, function (k, v) {
		tdiv.append('<button onclick="selccy(\'' + v.name + '\',' + from + ')" type="button" class="dropdown-item" name="buySellCrypto" autocomplete="off">' +
			v.name + '</button>');
		// show coin image '<img src="/resources/images/'+v.name+'.png" style="width: 16px;"/> '		
	});
}

function selccy(ccy, src) {
	if (src == 0)
		$('#dropdownCurr1').html(ccy)
	if (src == 1)
		$('#dropdownCurr2').html(ccy)
}

function domByAuth(){
	if(App.jwttoken){
		$('#btn-sign').text('Sign Out');
		$('#my-offers').css("display", "block")
		$('#my-trades').css("display", "block")
	}
	else{
		$('#btn-sign').text('Sign In');
		$('#my-offers').css("display", "none")
		$('#my-trades').css("display", "none")
	}
}

function hideMsgs() {
	$('#msgdialog').modal('hide');
}

function clearBar() {
	$("#alertbar").empty();
}

function clearPanel() {
	$("#mainDiv").empty();
	$('#newofferdiv1').css("display", "none");
	$('#newofferdiv2').css("display", "none");
	$('#pretrade').css("display", "none");
	$('#posttrade').css("display", "none");
}


/***************************************************** Test *********************************************** */
function testAuth() {
	getJWTJSON('v1/getUserCoins.json', "", (data) => {
		console.log(data);
	});
}
function getJWTJSON(shortUrl, jsondata, dataFunction, fail) {
	$.ajax({
		type: 'GET',
		contentType: "application/json",
		dataType: 'json',
		data: JSON.stringify(jsondata),
		url: WEBSERVER + shortUrl,
		headers: {
			"Authorization": "Bearer " + App.jwttoken,
			"accept": "application/json",
		},
		success: dataFunction,
	});
}


/*************************************************** Browse Offers ******************************************* */
function browseOffers() {
	var postFilter = { fromccy: 1, toccy: 1 }
	var filtStr = '?filt=' + encodeURI(JSON.stringify(postFilter));
	console.log('wrewerw', filtStr)
	$.getJSON(WEBSERVER + 'offers.json' + filtStr, function (offerList) {
		clearPanel();
		clearBar();

		console.log(offerList);
		offerList.forEach(k => {
			var payItems = "";
			k.paymentDetails.forEach(payitem => {
				payItems += '<div class="col-sm"><span style="text-align:centre" class="badge rounded-pill bg-primary">' + payitem.name + '</span></div>';
			});

			var res = moment(k.updated).fromNow();
			$("#mainDiv").append(
				'<div class="card-body topCard zaraCard" id="' + k.id + '">' +
				'<h5 class="card-header">' + k.fromccy.name + '/' + k.toccy.name + '<span style="float:right;" class="badge rounded-pill bg-info">' + k.user.username + '<span></h5> (' + res + ') ' + k.procStatus +
				'<div class="card-body">' +
				'<h5 class="card-title">' + k.fromAmount + ' ' + k.fromccy.name + ' => ' + k.toAmount + ' ' + k.toccy.name + '</h5>' +
				'</div>' +
				'</div>' +
				'<div class="card-body bottomCard zaraCard"> <div class="row">' +
				payItems + '<div class="col-sm"><button style="float:right;" class="btn btn-outline-success" onclick="pretrade(\'' + k.orderId + '\')" >take offer</button></div>' +
				'</div></div>'
			);
		})
		if (offerList.length == 0) {
			$("#mainDiv").append(
				'<div class="card-body zaraCardWhite" ">' +
				'<div class="card mb-3"><h5 class="card-header">No Offers available</h5>' +
				'<div class="card-body">' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});
}


/************************************************** Sign in/out ********************************************** */
function onSign() {
	if (!App.jwttoken) {
		$('#loginmodal').modal('show');
	}
	else {
		logout();
	}
}

function jwtlogin() {
	var name = $('#username').val();
	var pwd = $('#password').val();
	
	$.ajax({
		type: 'POST',
		contentType: "application/json",
		// dataType: 'json',
		url: WEBSERVER + 'auth/signin',
		data: JSON.stringify({ username: name, password: pwd }),
		success: function (resultData) {
			if (resultData.token) {//success
				App.jwttoken = resultData.token;
				// console.log("token " + App.jwttoken);
				$('#loginmodal').modal('hide');				
				domByAuth()
			}
			else {
				$('#form-error').html(resultData)
			}
			// $.ajax({
			//    //crossDomain: true,				   
			//    type: 'GET',				  
			//    contentType : "application/json",
			//    dataType : 'json',
			//    url: WEBSERVER+'v1/getUserCoins.json',
			//    headers: { "Authorization": "Bearer "+App.jwttoken,
			//       "accept": "application/json",
			// 	},
			//    success: function(data){
			//  	 console.log(data)
			//    }
			//  });
		}
	});
	return false
}

function logout() {
	$.ajax({
		type: 'POST',
		contentType: "application/json",
		// dataType: 'json',
		url: WEBSERVER + 'auth/signout',
		success: function (resultData) {
			if (resultData.msg === 'OK') {
				App.jwttoken = null;
				domByAuth()
			}
		}
	})
}



/************************************************* Connect Wallet ****************************************** */
async function onConnect() {

	$('#btn-connect').html('disconnect')
	document.querySelector("#btn-connect").addEventListener("click", onDisconnect);

	console.log("Opening a dialog", web3Modal);
	try {
		provider = await web3Modal.connect();
	} catch (e) {
		console.log("Could not get a wallet connection", e);
		return;
	}

	// Subscribe to accounts change
	provider.on("accountsChanged", (accounts) => {
		fetchAccountData();
	});

	// Subscribe to chainId change
	provider.on("chainChanged", (chainId) => {
		fetchAccountData();
	});

	// Subscribe to networkId change
	provider.on("networkChanged", (networkId) => {
		fetchAccountData();
	});

	await refreshAccountData();
}

/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
 async function fetchAccountData() {

	// Get a Web3 instance for the wallet
	const web3 = new Web3(provider);

	console.log("Web3 instance is", web3);

	// Get connected chain id from Ethereum node
	const chainId = await web3.eth.getChainId();
	// Load chain information over an HTTP API
	const chainData = evmChains.getChain(chainId);
	document.querySelector("#network-name").textContent = chainData.name;

	// Get list of accounts of the connected wallet
	const accounts = await web3.eth.getAccounts();
	// set user wallet/coin address to this   

	// MetaMask does not give you all accounts, only the selected account
	console.log("Got accounts", accounts);
	selectedAccount = accounts[0];

	document.querySelector("#selected-account").textContent = selectedAccount;

	setUserWallet(selectedAccount);

	// Get a handl
	const template = document.querySelector("#template-balance");
	const accountContainer = document.querySelector("#accounts");

	// Purge UI elements any previously loaded accounts
	accountContainer.innerHTML = '';

	// Go through all accounts and get their ETH balance
	const rowResolvers = accounts.map(async (address) => {
		const balance = await web3.eth.getBalance(address);
		// ethBalance is a BigNumber instance
		// https://github.com/indutny/bn.js/
		const ethBalance = web3.utils.fromWei(balance, "ether");
		const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
		// Fill in the templated row and put in the document
		const clone = template.content.cloneNode(true);
		clone.querySelector(".address").textContent = address;
		clone.querySelector(".balance").textContent = humanFriendlyBalance;
		accountContainer.appendChild(clone);
	});

	// Because rendering account does its own RPC commucation
	// with Ethereum node, we do not want to display any results
	// until data for all accounts is loaded
	await Promise.all(rowResolvers);

	// Display fully loaded UI for wallet data
	//document.querySelector("#prepare").style.display = "none";
	document.querySelector("#connected").style.display = "block";
}

/**
	 This should set the user USDT coin
**/
function setUserWallet(usrwalletaddr) {

	var usdtcoin = App.ccyMap['USDT'];
	var postObject = { coinid: usdtcoin.id, walletAddr: usrwalletaddr }
	console.log(JSON.stringify(postObject));
	$.ajax({
		type: 'POST',
		url: WEBSERVER + 'setusercoin.json',// + csrfname +'='+csrfvalue,
		data: JSON.stringify(postObject),
		contentType: "application/json",
		dataType: 'json',
		success: function (data) {
			if (data.statusCode != 0) {
				$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed ' + data.msg + '</button>');
			}
		},
		fail: function (jqXHR, textStatus, errorThrown) {
			$('#coinDialog').modal('hide');
			$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
		},
	}).fail(function () { alert('error set user coin') });
}


/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

	// If any current data is displayed when
	// the user is switching acounts in the wallet
	// immediate hide this data
	// document.querySelector("#connected").style.display = "none";
	//document.querySelector("#prepare").style.display = "block";

	// Disable button while UI is loading.
	// fetchAccountData() will take a while as it communicates
	// with Ethereum node via JSON-RPC and loads chain data
	// over an API call.
	// document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
	await fetchAccountData(provider);
	//document.querySelector("#btn-connect").removeAttribute("disabled")

	const web3 = new Web3(provider);

	$.getJSON(WEBSERVER + 'getnetworkconfig.json', function (netw) {
		//console.log("Network : "+JSON.stringify(netw));
		App.BLOCK_NETWORK = netw.httpService;  // "http localhost or Mainnet address
		App.escrow_details.address = netw.escrowCtrAddr;  // Contract Address Escro
		App.usdt_details.address = netw.usdtcoinCtrAddr;
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

		App.usdt_details.ctr = new web3.eth.Contract(minABI, App.usdt_details.address);   // the USD / JVM coin
		usdt_dec = App.usdt_details.ctr.methods.decimals().call(function (error, decimals) {
			App.usdt_details.decimals = decimals;
			//console.log("USDT : "+JSON.stringify(App.usdt_details));					
		});
		$.getJSON('resources/contracts/TinanceEscrow.json', function () {

		})
			.done(function (abi_data) {
				//console.log(abi_data);						 
				App.escrow_details.ctr = new web3.eth.Contract(abi_data.abi, App.escrow_details.address);
				completeFunc();
			});
	});

	$('#showwallet').modal('show')
}

function completeFunc() {

}

async function onDisconnect() {
	console.log("Killing the wallet connection", provider);

	// TODO: Which providers have close method?
	if (provider.close) {
		await provider.close();

		// If the cached provider is not cleared,
		// WalletConnect will default to the existing session
		// and does not allow to re-scan the QR code with a new wallet.
		// Depending on your use case you may want or want not his behavir.
		await web3Modal.clearCachedProvider();
		provider = null;
	}

	selectedAccount = null;

	// Set the UI back to the initial state
	document.querySelector("#prepare").style.display = "block";
	document.querySelector("#connected").style.display = "none";

	$('#btn-connect').html('connect')
	document.querySelector("#btn-connect").addEventListener("click", onConnect);
}



/********************************************************* Offer *********************************************/
function showMyOffers() {
	hideMsgs();
	var postFilter = { fromccy: 1, toccy: 1 }
	var filtStr = '?filt=' + encodeURI(JSON.stringify(postFilter))
	
	getJWTJSON('v1/public/offers.json' + filtStr, "", function (offerList) {
		clearPanel();
		clearBar();
		// create button
		$('#alertbar').html('<button class="btn btn-success" type="button" onclick="newOffer()"><i class="fas fa-plus"></i></button>');
		console.log(offerList);
		offerList.forEach(k => {
			var payTypes = "";
			k.paymentDetails.forEach(payItem => {
				payTypes += '<span class="badge bg-primary">' + payItem.name + '</span>';
			})

			var islive = '<div data-bs-toggle="tooltip" data-bs-placement="top" title="visibility" style="float: left;" class="form-check form-switch">' +
				'<input class="form-check-input" type="checkbox" onclick="setLive(' + k.id + ')" id="livecheck' + k.id + '" ' + (k.live ? 'checked' : '') + '>' +
				'</div>';
			var delbutton = '<button class="btn btn-sm btn-danger" style="float: right;" type="button" onclick="deleteOffer(' + k.id + ')"><i class="far fa-trash-alt"></i></button>';

			var res = moment(k.created).fromNow();
			$("#mainDiv").append(
				'<div class="card-body zaraCardWhite" id="' + k.id + '">' +
				'<div class="card mb-3"> <div class="card-header">' + islive + '<h5>' + k.fromccy.name + '/' + k.toccy.name + ' ' + delbutton + '</h5></div> (' + res + ') ' + k.status +
				'<div class="card-body">' +
				'<h5 class="card-title">' + k.fromAmount + ' ' + k.fromccy.name + ' => ' +
				k.toAmount + ' ' + k.toccy.name + '</h5>' +
				payTypes +
				'</div>' +
				'</div>' +
				'</div>'
			);
		})
		if (offerList.length == 0) {
			$("#mainDiv").append(
				'<div class="container g-5" ">' +
				'<div class="row row-cols row-cols-lg-2 g-12 g-lg-3">' +
				'<div class="card mb-3"><h5 class="card-header">You dont have any Offers</h5>' +
				'<div class="card-body">' +
				' Try creating one' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});
}

function setLive(kid) {
	var ischecked = $('input[id="livecheck' + kid + '"]').is(':checked');
	$.ajax({
		type: 'POST',
		url: WEBSERVER + 'toggleLive.json?kid=' + kid + '&v=' + ischecked,// + csrfname +'='+csrfvalue,
		data: JSON.stringify(""),
		contentType: "application/json",
		dataType: 'json',
		success: function (data) {
			console.log(data);
		},
		fail: function (jqXHR, textStatus, errorThrown) {
			$('#coinDialog').modal('hide');
			$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
		},
	}).fail(function () { alert('error') });
}

function showthisoffer(k) {
	console.log(k)
	$("#ccytypebuy").html(k.toccy.name)
	$("#ccytypesell").html(k.fromccy.name)

	var meBuyer = !k.buyer;  // if they are not the buyer, we are buyer
	var buySellStr = meBuyer ? 'Buyer' : 'Seller';
	$('#exchrate').html(k.exchRate);
	$("#thisoffer").empty();
	$("#thisoffer")
		.append(
			'You are the ' + buySellStr + '(exch rate:' + k.exchRate + ')'
			+ '<br/> Selling '
			+ k.toccy.name
			+ ' Buying '
			+ k.fromccy.name
			+ '   '
			+ '<button type="button" class="btn btn-info"  style="float: right;" class="btn btn-sm btn-primary font-weight-bold">'
			+ k.fromAmount + ' ' + k.fromccy.name
			+ ' available</button>');

	setOfferPayButtons('paydetail', k.paymentDetails);
	$('#preamtsell').val(k.toAmount);
	$('#preamtbuy').val(k.fromAmount);
}

function newOffer() {
	clearPanel();
	clearBar();
	$('#newofferdiv1').css("display", "block");
	$('#newofferdiv2').css("display", "block");
}

// NEW OFFER CREATION
function swapSides() {
	var curr1 = document.getElementById('dropdownCurr1').innerHTML;
	var amount1 = document.getElementById('amtsell').value;
	var curr2 = document.getElementById('dropdownCurr2').innerHTML;
	var amount2 = document.getElementById('amtbuy').value;
	document.getElementById('dropdownCurr1').innerHTML = curr2;
	document.getElementById('amtsell').value = amount2;
	document.getElementById('dropdownCurr2').innerHTML = curr1;
	document.getElementById('amtbuy').value = amount1;
}

function setOfferPayButtons(divid, paylist) {
	var idx = 0;
	paylist.forEach(item => {
		$('#' + divid).append(
			'<input type="radio" id="payid_' + idx + '" class="btn-check" onclick="userpay(' + idx + ')" value="' + item.id + '" name="selectedpay" autocomplete="off" >' +
			'<label class="btn btn-outline-primary btn-sm" for="payid_' + idx + '">' + item.name + '</label>'
		);
		idx++;
	});
}
function userpay(clickid) {
	console.log(clickid);
	console.log(thisoffer.paymentDetails)
	$('#paydetail').html(thisoffer.paymentDetails[clickid].payDetails);
}


function deleteOffer(kid) {
	if (confirm('Confirm delete offer?')) {
		$.ajax({
			type: 'POST',
			url: WEBSERVER + 'deleteoffer.json?kid=' + kid,// + csrfname +'='+csrfvalue,
			data: JSON.stringify(""),
			contentType: "application/json",
			dataType: 'json',
			success: function (data) {
				myOffers();
			},
			fail: function (jqXHR, textStatus, errorThrown) {
				$('#coinDialog').modal('hide');
				$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
			},
		}).fail(function () { alert('error') });
	}
}

function placeOrder() {
	var postObject = { fromccyid: 99, toccyid: 99, fromamt: $('#amtsell').val(), toamt: $('#amtbuy').val(), feevalue: $('#amtfee').val(), mintrade: $('#mintrade').val(), maxtrade: $('#maxtrade').val(), payTypes: [] }

	postObject.payTypes = getSelectedPayTypes();
	var crypt = getCryptBuySell();
	var fiat = getFiatSelected();

	console.log(JSON.stringify(crypt) + "  " + JSON.stringify(fiat));

	if (crypt.buy) {
		postObject.toccyid = crypt.ccy.id;
		postObject.fromccyid = fiat.ccy.id;
	} else {
		postObject.fromccyid = crypt.ccy.id;
		postObject.toccyid = fiat.ccy.id;
	}

	console.log(JSON.stringify(postObject));

	$.ajax({
		type: 'POST',
		url: WEBSERVER + 'addupdateorder.json',// + csrfname +'='+csrfvalue,
		data: JSON.stringify(postObject),
		contentType: "application/json",
		dataType: 'json',
		success: function (data) {
			$('#msgdialog').modal('show');
			$('#msgtitle').html('Offer Added');
			if (data.statusCode == 0) {
				$('#msgdetails').html('Success - Added Offer <button type="button" onclick="myOffers()" class="btn btn-success"><i class="fas fa-check"></i> OK</button>');
			} else {
				$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed ' + data.msg + '</button>');
			}
			//refreshView();
		},
		fail: function (jqXHR, textStatus, errorThrown) {
			$('#editjob').modal('hide');
			$('#msgdetails').html('<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
		},
	}).fail(function () { alert('error') });
}

function getSelectedPayTypes() {
	var favorite = [];
	$.each($("input[name='paychk']:checked"), function () {
		favorite.push($(this).val());
	});
	//console.log(favorite);
	return favorite;
}

function getCryptBuySell() {
	var res = {};
	var valFrom = $('#dropdownCurr1').text()
	var valTo = $('#dropdownCurr2').text()
	console.log("valfrom:" + valFrom + " valto:" + valTo);
	// collect the data from the form
	if (App.ccyMap[valFrom].ccyType === 'ERC20')
		res = { buy: false, ccy: App.ccyMap[valFrom] }
	else if (App.ccyMap[valTo].ccyType === 'ERC20')
		res = { buy: true, ccy: App.ccyMap[valTo] };
	return res;
}

function getFiatSelected() {
	var res = { found: false };
	var valFrom = $('#dropdownCurr1').text()
	var valTo = $('#dropdownCurr2').text()
	if (App.ccyMap[valFrom].ccyType === 'Fiat')
		res = { found: true, ccy: App.ccyMap[valFrom] }
	else if (App.ccyMap[valTo].ccyType === 'Fiat')
		res = { found: true, ccy: App.ccyMap[valTo] };
	return res;
}

function calcOfferDetails(obj) {
	//console.log("calc "+obj.name)		
	var crypt = getCryptBuySell();
	var fee = 0;
	var exchrate = parseFloat($('#amtbuy').val() / parseFloat($('#amtsell').val()));
	// fees are attached to USDT always!!!!					

	if (crypt.buy) {
		amt = parseFloat($('#amtsell').val());
		fee = FEEPCT * amt;
		$('#exchrate').html(exchrate);
		$('#amtfee').html(fee + 'USDT');
	} else {
		amt = parseFloat($('#amtbuy').val());
		fee = FEEPCT * amt;
		$('#exchrate').html(exchrate);
		$('#amtfee').html(fee + 'USDT');
	}

	$('#mintrade').val($('#amtsell').val() * 0.25) // 25% starting point
	$('#maxtrade').val($('#amtsell').val() * 0.75) // 75% starting point		
	$('#amtfee').val(fee);
}



/***************************************************** Trade **************************************************/
function pretrade(ordid) {
	clearPanel();
	$.getJSON(WEBSERVER + 'getoffer.json?oid=' + ordid, function (puboffer) {
		$('#pretrade').css("display", "block");
		thisoffer = puboffer;
		showthisoffer(puboffer)
		showuserpublic(puboffer.user.id);
		showuserrecenttrades(puboffer.user.id);
		//setOfferPayButtons('paydetail', puboffer.paymentDetails);
		$('#amtsell').val(puboffer.fromAmount);
		$('#amtbuy').val(puboffer.fromAmount);
	});
}

function showuserpublic(uid) {
	$.getJSON(WEBSERVER + 'getprofilepublic.json?uid=' + uid, function (details) {
		// set up details
		var stars = "";
		for (var x = 1; x <= details.feedback; x++) {
			stars += '<i class="fas fa-star"></i>';
		}
		for (var x = details.feedback; x < 5; x++) {
			stars += '<i class="far fa-star"></i>';
		}
		// console.log(details);
		$("#username").html(details.username);
		$("#blurb").html(details.blurb ? details.blurb : "no blurb yet");
		$("#feedback").html(stars);
		$("#lastseen").html(moment(details.lastseen).fromNow());
		$("#tradecount").html(details.tradecount);
		$("#verified").html(details.verified);
	});
}

function showuserrecenttrades(uid) {
	$.getJSON(WEBSERVER + 'userTrades.json?uid=' + uid, function (trades) {
		// set up details
		console.log(trades);
		trades.forEach(k => {
			var res = moment(k.created).fromNow();
			$("#recenttrades").append(
				'<div class="container g-5" id="' + k.id + '">' +
				'<div class="row row-cols row-cols-lg-2 g-12 g-lg-3">' +
				'<div class="card mb-3"><h5 class="card-header">' + k.fromccy.name + '/' + k.toccy.name + '</h5> (' + res + ') ' + k.status +
				'<div class="card-body">' +
				'<h5 class="card-title">' + k.fromAmount + ' ' + k.fromccy.name + '</h5>' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>'
			);
		})
		if (trades.length == 0) {
			$("#recenttrades").append(
				'<div class="alert alert-warning" role="alert"> no trade history yet</div>');
		}

	});
}

/**  Get user trades old and new  ContractMatch object  **/
function showMyTrades() {
	clearPanel();
	getJWTJSON('v1/public/userTrades.json', "", function (tradeList) {
		$('#mytrades').empty();
		$('#posttrade').css("display", "block");
		console.log(tradeList);
		tradeList.forEach(k => {
			// hard coding Kovan for this version was +App.BLOCK_NETWORK+
			var deposithashStr = (k.depositHash) ? '<p>Deposit txn: <a href="https://kovan.etherscan.io/tx/' + k.depositHash + '" target="_blank" class="card-text">' + k.depositHash + '</a></p>' : "";
			var completedHashStr = (k.completedHash) ? '<p>Completed txn: <a href="https://kovan.etherscan.io/tx/' + k.completedHash + '" target="_blank" class="card-text">' + k.completedHash + '</a></p>' : "";

			var isBuyer = (k.buyerId == App.usrid) // buyer is buying FIAT selling USDT
			var str;
			// check which ccy is crypt
			if (isBuyer) {
				str = k.fromccy.ccyType === "ERC20" ? (k.fromAmount + ' ' + k.fromccy.name + ' for ' + k.toAmount + ' ' + k.toccy.name) : (k.toAmount + ' ' + k.toccy.name + ' for ' + k.fromAmount + ' ' + k.fromccy.name);
			} else {
				str = k.fromccy.ccyType === "ERC20" ? (k.toAmount + ' ' + k.toccy.name + ' for ' + k.fromAmount + ' ' + k.fromccy.name) : (k.fromAmount + ' ' + k.fromccy.name + ' for ' + k.toAmount + ' ' + k.toccy.name);
			}
			var bankFundIndicator = k.bankfundflag ? '<span class="badge rounded-pill bg-primary">Bank funds sent ' + moment(k.bankfundflag).fromNow() + '</span' : '';
			var dealStarted = moment(k.created).fromNow();

			$("#mytrades").append(
				'<div class="card-body topCard zaraCard" id="' + k.id + '">' +
				'<h5>' + k.fromccy.name + '/' + k.toccy.name + '<span style="float:right;" class="badge rounded-pill bg-primary" id="orderstatus_' + k.id + '"></span></h5>You are the ' + (isBuyer ? 'buyer' : 'seller') + '<span style="float:right;"> ' + dealStarted + ' ' + '</span></div>' +
				'<div class="card-body bottomCard zaraCard">' +
				'You will get ' + str + ' (less fees : ' + k.cryptoFee.toFixed(2) + ')' +
				'<p class="card-text"> Order Id:' + k.orderId + ' NUM:' + parseInt(k.orderId, 16) + ' <br/>Buyer:' + k.buyerAddress + '  seller:' + k.sellerAddress + '  </p>' +
				'<p class="card-text">' + bankFundIndicator + '</p>' +
				deposithashStr +
				completedHashStr +
				'<h6 class="card-title" id="userInfo_' + k.id + '"></h6><br/>' +
				'<span id="orderbutton_' + k.id + '">..waiting.(connect your wallet)..</span>' +

				'</div>'

			);

			App.mytrades[k.orderId] = k;

			App.escrow_details.ctr.methods.getState(parseInt(k.orderId, 16)).call().then(function (state) {
				console.log(state)
				var buysellDetails = getBuySellData(state, k.orderId);
				var info = isBuyer ? buysellDetails.buyerInfo : buysellDetails.sellerInfo;
				if (completedHashStr == "") {
					var buttonArray = isBuyer ? buysellDetails.buyerButtons : buysellDetails.sellerButtons
					var buttonPanelStr = "";
					buttonArray.forEach(item => { buttonPanelStr += item })
					//console.log(buttonArray)
					$('#orderstatus_' + k.id).html(CTR_STATES[state]);
					$('#orderbutton_' + k.id).html(buttonPanelStr); //getInstructions(isBuyer,state,k.orderId)
					$('#userInfo_' + k.id).html(info);
				} else {
					$('#orderstatus_' + k.id).html("Completed");
					$('#orderbutton_' + k.id).html("")
				}
			});

		})
		if (tradeList.length == 0) {
			$("#mytrades").append(
				'<div class="container g-5" ">' +
				'<div class="row row-cols row-cols-lg-2 g-12 g-lg-3">' +
				'<div class="card mb-3"><h5 class="card-header bg-info">You dont have any Trades</h5>' +
				'<div class="card-body">' +
				' Create an offer someone can accept' +
				'</div>' +
				'</div>' +
				'</div>' +
				'</div>');
		}
	});
}

function deleteTrades() {
	ajaxPOST('debugDeleteTrades.json', "")
}

function calc(obj) {
	console.log("calc " + obj.name + " " + $('#exchrate').text())
	var rate = parseFloat($('#exchrate').text());

	if (obj.name === 'preamtsell') {
		$('#preamtbuy').val(parseFloat($('#preamtsell').val()) * rate)
	} else if (obj.name === 'preamtbuy') {
		$('#preamtsell').val(parseFloat($('#preamtbuy').val()) / rate)
	}
}

function agree() {
	var attribExisting = {
		preamtbuy: 'number',
		preamtsell: 'number'
	}

	var postObject = validateForm(attribExisting);

	// check all fields
	//postObject.id = postObject.editid;	
	//delete postObject.editid;

	var usrpayid = -1;
	$.each($("input[name='selectedpay']:checked"), function () {
		usrpayid = $(this).val();
	});
	console.log(postObject);
	postObject.usrpayid = usrpayid;
	postObject.ordid = thisoffer.orderId;

	console.log(JSON.stringify(postObject));

	if (postObject.errorcount == 0) {
		$
			.ajax(
				{
					type: 'POST',
					url: WEBSERVER + 'takeorder.json',// + csrfname +'='+csrfvalue,
					data: JSON.stringify(postObject),
					contentType: "application/json",
					dataType: 'json',
					success: function (data) {
						$('#editpaydetails').modal('hide');
						$('#msgdialog').modal('show');
						$('#msgtitle').html('Pay details Added');
						if (data.statusCode == 0) {
							$('#msgdetails')
								.html(
									'Success - Accepted Order <button onclick="showMyTrades()" type="button" class="btn btn-success"><i class="fas fa-check"></i> OK</button>');
						} else {
							$('#msgdetails').html(
								'<button type="button" class="btn btn-danger">Failed '
								+ data.msg
								+ '</button>');
						}
					},
					fail: function (jqXHR, textStatus, errorThrown) {
						$('#editpaydetails').modal('hide');
						$('#msgdetails')
							.html(
								'<button type="button" class="btn btn-danger">Failed - system is down please contact support desk</button>');
					},
				}).fail(function () {
					alert('You need to sign in !!')
				});
	}
}

/**
	function validateForm(){		
		var crypt = getCryptBuySell();
		var fiat = getFiatSelected();
		var payTypes = getSelectedPayTypes();
		var buyamt = parseFloat($('#amtbuy').val());
		var sellamt = parseFloat($('#amtsell').val()); 
		var exch = buyamt/sellamt;
		
		//console.log("validateForm "+buyamt+" "+sellamt+" "+exch+"  "+JSON.stringify(fiat))
		
		if (buyamt>0 && sellamt>0 && exch>0.0 && (crypt)&&(fiat.found)&&payTypes.length>0){		
			$('#offervalid').removeAttr('disabled')
		}else{
			$('#offervalid').attr('disabled',true)
		}
		//$('#details-tab').click();
	}
**/

function validateForm(attrib) {
	const regex = /^[0-9\.]+$/;
	var postObject = {};
	var errorcount = 0
	//var i = 0, len = attrib.length; i < len; i++
	for (const field in attrib) {
		var widget = $('#' + field);
		var widgetval = $('#' + field).val();
		widgetval = widgetval != undefined ? widgetval.trim() : "";
		console.log(field + " => " + widgetval + " " + attrib[field]);
		var fieldError = 0;
		postObject[field] = widgetval;
		switch (attrib[field]) {
			case 'string':
				if (widgetval == "") {
					fieldError += 1
				} break;
			case 'number':
				if (!widgetval.match(regex)) {
					fieldError += 1
				}
				break;
			case 'select':
				if (!widgetval.match(regex)) {
					fieldError += 1
				} else if (Number.parseInt(widgetval) <= 0) {
					fieldError += 1
				}
				break;
			case 'date':
				if (moment(widgetval, [DATE_TIME_FORMAT]).format() == INVALID_DATE) {
					fieldError += 1;
				}
				break;
			case 'checkbox':
				postObject[field] = widget.is(':checked')
				break;
		}
		if (fieldError > 0) {
			// mark in red	
			console.log('field ' + field + ' has problem ' + attrib[field])
			widget.addClass("is-invalid") //background-color:#fdb9bc;
			widget.removeClass("is-valid");
			errorcount += 1
		} else {
			widget.removeClass("is-invalid");
			widget.addClass("is-valid")
		}
	}
	postObject.errorcount = errorcount;
	return postObject;
}


/**************************************************** No Used ******************************* */
function goodsSent(ordId) {
	// indicate to the server when the funds were sent
	ajaxPOST(WEBSERVER + 'flagfundssent.json?oid=' + ordId, "", alert("OK, Bank transfer recorded"));
	// start timer for 3 days then reverse the transaction
}

function goodsReceived(ordId) {
	var ordNum = parseInt(ordId, 16);
	var sellerAddr = App.mytrades[ordId].sellerAddress;
	var data = { from: sellerAddr, gas: '2000000' };
	console.log("Escrow_addr:" + App.escrow_details.address + " sellerAddr:" + sellerAddr + " USD coin:" + App.usdt_details.address + " ordNum:" + ordNum);
	App.escrow_details.ctr.methods.releaseEscrow(ordNum).send(data)
		.on('transactionHash', function (hash) {
			ajaxPOST('flagcomplete.json?oid=' + ordId + "&txn=" + hash, "", alert("OK, Bank transfer received"));
		})
}

function setPayTypes(divid) {
	$.getJSON(WEBSERVER + 'paymenttypes.json', function (ptypes) {
		var idx = 1;
		ptypes.forEach(item => {
			$('#paymethods').append(
				'<input type="checkbox" class="btn-check" name="paychk" value="' + item.name + '" id="btncheck' + idx + '" autocomplete="off">' +
				'<label class="btn btn-sm btn-light" for="btncheck' + idx + '">' + item.name + '</label>'
			);
			idx++;
		});
	});
}

function deposit(ordId) {
	var ordNum = parseInt(ordId, 16);
	var sellerAddr = App.mytrades[ordId].sellerAddress;
	var amtStr = toCoin((App.mytrades[ordId].cryptoVal)); //+ mytrades[ordId].cryptoFee
	var humanAmt = App.mytrades[ordId].cryptoVal.toFixed(App.usdt_details.decimals);
	var data = { from: sellerAddr };
	console.log("Escrow_addr:" + App.escrow_details.address + " sellerAddr:" + sellerAddr + " USD coin:" + App.usdt_details.address + " amt:" + amtStr);
	console.log(App.usdt_details);
	// now create an approval for the Coin funds to be taken by Contract

	// check allowance first
	App.usdt_details.ctr.methods.allowance(sellerAddr, App.escrow_details.address).call(data)
		.then(function (result) {
			if (parseFloat(result) == 0) {

				App.usdt_details.ctr.methods.approve(App.escrow_details.address, amtStr).send(data)
					.then(function (app_res) {
						alert("Allowance set for USDT " + humanAmt)
						setTimeout(() => {
							ajaxPOST(WEBSERVER + 'startcontract.json?oid=' + ordId, "", alert("You Deposited funds USDT " + humanAmt));
						}, 1000);
					});
			} else {
				App.usdt_details.ctr.methods.approve(App.escrow_details.address, 0).send(data)
					.then(function (app_res) {
						alert("Allowance was non zero (" + fromCoin(result).toFixed(App.usdt_details.decimals) + "), it has been reset, try again!!!")
					})
			}
		});
}


/************************************************ Coin process **************************************** */
function initCoins(completeFunc) {
	var ixy = $.getJSON(WEBSERVER + "ccycodes.json", {
		format: "json"
	})
		.done(function (data) {
			$.each(data, function (i, item) {
				ccydict[item.id] = item;
			});
			setCcySelect("coinid");
			setCcyCrypto('buycrypto');
			setCcyCrypto('sellcrypto');
			setCcyFiat('fiatexchange');
		});
	/***	
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
		
		**/
}

function toCoin(val) {
	return val * 10 ** App.usdt_details.decimals;
}

function fromCoin(val) {
	return val / 10 ** App.usdt_details.decimals;
}
