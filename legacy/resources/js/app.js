

App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
   // $.getJSON('../pets.json', function(data) {
   //   var petsRow = $('#petsRow');
   //   var petTemplate = $('#petTemplate');

//    });
    return await App.initWeb3();
  },

  initWeb3: async function() {

	    // Modern dapp browsers...
	if (window.ethereum) {
	  App.web3Provider = window.ethereum;
	  try {
	    // Request account access
	    await window.ethereum.enable();
	  } catch (error) {
	    // User denied account access...
	    console.error("User denied account access")
	  }
	}
	// Legacy dapp browsers...
	else if (window.web3) {
	  App.web3Provider = window.web3.currentProvider;
	}
	// If no injected web3 instance is detected, fall back to Ganache
	else {
		console.log("Using local ganache");
	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
	}
	web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
	  
      web3.eth.defaultAccount = USR_WALLET;//'0x868c016dAe0105e4a93C311620Cb27cf5A976fA0';	 
	
      $.getJSON('resources/contracts/Escrow.json', function(abi_data) {
		  // Get the necessary contract artifact file and instantiate it with @truffle/contract		  
		   //var EscrowCTR = web3.eth.contract(abi_data);
           //App.contracts.Escrow = EscrowCTR.at('0x5469cF210BC7Af05a5094dC3C7D4e4051b2E274e');
		  App.contracts.EscrowCTR = TruffleContract(abi_data);
		  // Set the provider for our contract
		  App.contracts.EscrowCTR.setProvider(App.web3Provider);
			
		  App.contracts.EscrowCTR.at(ESCROW_CTR).then(function(res){  //'0x5469cF210BC7Af05a5094dC3C7D4e4051b2E274e'
		  //console.log(JSON.stringify(App.contracts.EscrowCTR));	
		  res.currency().then(function(res){
				console.log(res);		
			});
			/*
		  res.createPayment(123,'0x868c016dAe0105e4a93C311620Cb27cf5A976fA0','0xC2262fEFf72EfCbcbc86ab5713102fb759346172',321)
			.then(function(result){
				console.log(result);
			});
			*/
		});
			
		  // Use our contract to retrieve and mark the adopted pets
		 // return App.markAdopted();
	 });

    return App.bindEvents();
  },

  bindEvents: function() {
  //  $(document).on('click', '.btn-adopt', App.handleAdopt);
  }
};


