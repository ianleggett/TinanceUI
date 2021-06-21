/**
 * Web3 & wallet handling
 * 
 */

/**
   This should set the user USDT coin
**/
function setUserWallet(usrwalletaddr){

    var usdtcoin = App.ccyMap['USDT'];
    var postObject = {coinid:usdtcoin.id,walletAddr:usrwalletaddr}	
    console.log(JSON.stringify(postObject));
    postJWTJSON('v1/setusercoin.json',postObject,function( data ){
      if (data.statusCode!=0){		    		
          $('#msgdetails').html('<button type="button" class="btn btn-danger">Failed '+data.msg+'</button>');		    		
      }		    	
    });	
  }
  
  function completeFunc(){
      
  }
  
  /**
   * Kick in the UI action after Web3modal dialog has chosen a provider
   */
  async function fetchAccountData() {
  
    // Get a Web3 instance for the wallet
    const web3 = new Web3(App.provider);
  
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
    App.selectedAccount = accounts[0];
  
    document.querySelector("#selected-account").textContent = App.selectedAccount;
  
    setUserWallet(App.selectedAccount);
    initContractData();
  
  
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
    await fetchAccountData(App.provider);
    //document.querySelector("#btn-connect").removeAttribute("disabled")
  
    App.web3 = new Web3(App.provider);
  
    $('#showwallet').modal('show')
  }
  
  
  /**
   * Connect wallet button pressed.
   */
  async function onConnect() {
     
    console.log("Opening a dialog", App.web3Modal);
    try {
      App.provider = await App.web3Modal.connect();
    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
  
    $('#btn-connect').html('disconnect')
    document.querySelector("#btn-connect").addEventListener("click", onDisconnect);
  
    // Subscribe to accounts change
    App.provider.on("accountsChanged", (accounts) => {
      fetchAccountData();
    });
  
    // Subscribe to chainId change
    App.provider.on("chainChanged", (chainId) => {
      fetchAccountData();
    });
  
    // Subscribe to networkId change
    App.provider.on("networkChanged", (networkId) => {
      fetchAccountData();
    });
  
    await refreshAccountData();
  }
  
  /**
   * Disconnect wallet button pressed.
   */
  async function onDisconnect() {
  
    console.log("Killing the wallet connection", App.provider);
  
    // TODO: Which providers have close method?
    if(App.provider.close) {
      await App.provider.close();
  
      // If the cached provider is not cleared,
      // WalletConnect will default to the existing session
      // and does not allow to re-scan the QR code with a new wallet.
      // Depending on your use case you may want or want not his behavir.
      await App.web3Modal.clearCachedProvider();
      App.provider = null;
    }
  
    App.selectedAccount = null;
  
    // Set the UI back to the initial state
    document.querySelector("#prepare").style.display = "block";
    document.querySelector("#connected").style.display = "none";
    
    $('#btn-connect').html('connect')
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
  }
  
  
  /**
   * Main entry point.
   */
  window.addEventListener('load', async () => {
    //init();
    document.querySelector("#btn-connect").addEventListener("click", onConnect);
  //  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
  });