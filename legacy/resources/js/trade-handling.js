/**
 * Trades and trade functions
 * 
 */

/**
 * USDT token coin has set decimal places, adjust to and from to standard currency
 */
function toCoin(val){
    return val * 10**App.usdt_details.decimals;
}
/**
 * USDT token coin has set decimal places, adjust to and from to standard currency
 */
function fromCoin(val){
    return val / 10**App.usdt_details.decimals;
}

 function showAlert(msg){
    alert("Created contract OK");
}

function errorAlert(msg){
    alert("Error "+msg);
}

/**
 * Make a crypto deposit to our contract
 * @param {*} ordId 
 */
function deposit(ordId){
    var ordNum = parseInt(ordId, 16);
    var sellerAddr = App.mytrades[ordId].sellerAddress;          
    var amtStr =  toCoin( (App.mytrades[ordId].cryptoVal ) ); //+ mytrades[ordId].cryptoFee
    var humanAmt = App.mytrades[ordId].cryptoVal.toFixed(App.usdt_details.decimals);
    var data = { from: sellerAddr };
    console.log("Escrow_addr:"+App.escrow_details.address+" sellerAddr:"+sellerAddr+ " USD coin:"+App.usdt_details.address+" amt:"+amtStr);
    console.log(App.usdt_details);
    // now create an approval for the Coin funds to be taken by Contract
    
    // check allowance first
    App.usdt_details.ctr.methods.allowance( sellerAddr, App.escrow_details.address ).call( data )
    .then(function(result){
        if (parseFloat(result) == 0){
                
            App.usdt_details.ctr.methods.approve( App.escrow_details.address, amtStr ).send( data )
            .then(function(app_res){
                 alert("Allowance set for USDT "+humanAmt)
                  setTimeout(() => {
                      postJWTJSON('v1/startcontract.json?oid='+ordId,"",alert("You Deposited funds USDT "+humanAmt));			 			 
                  }, 1000);			        
            });
        }else{				
            App.usdt_details.ctr.methods.approve( App.escrow_details.address, 0 ).send( data )
            .then(function(app_res){
                alert("Allowance was non zero ("+fromCoin(result).toFixed(App.usdt_details.decimals)+"), it has been reset, try again!!!")			         
            })
        }

    });
}

/**
 * 
 * Indicate to server that bank funds have been sent for this orde
 */
function goodsSent(ordId){
    // indicate to the server when the funds were sent
    postJWTJSON('v1/flagfundssent.json?oid='+ordId,"",alert("OK, Bank transfer recorded"));
    // start timer for 3 days then reverse the transaction
}
/**
 * Indicate to the server that bank funds have been received
 * @param  ordId 
 */
function goodsReceived(ordId){	
    var ordNum = parseInt(ordId, 16);
    var sellerAddr = App.mytrades[ordId].sellerAddress;
    var data = { from: sellerAddr ,gas: '2000000'};          
    console.log("Escrow_addr:"+App.escrow_details.address+" sellerAddr:"+sellerAddr+ " USD coin:"+App.usdt_details.address+" ordNum:"+ordNum);
    App.escrow_details.ctr.methods.releaseEscrow(ordNum).send(data)       
    .on('transactionHash',function(hash){
        postJWTJSON('v1/flagcomplete.json?oid='+ordId+"&txn="+hash,"",alert("OK, Bank transfer received"));
    })        

}
/**
 * Debug function to delete all trades, not for production!
 */
function deleteTrades(){
    ajaxPOST('debugDeleteTrades.json',"")
}

/**
 *  Get all user trades
 */
function showMyTrades(){		
    getJWTJSON('v1/mytrades.json',null, function(tradeList){
        console.log(tradeList);
        clearPanel();

        $('#myorders').empty();
        $('#posttrade').css("display", "block");
        //console.log(tradeList);
        tradeList.forEach( k=>{
                        // hard coding Kovan for this version was +App.BLOCK_NETWORK+
            var deposithashStr = (k.depositHash) ? '<p>Deposit txn: <a href="https://kovan.etherscan.io/tx/'+k.depositHash+'" target="_blank" class="card-text">'+k.depositHash+'</a></p>' : "";
            var completedHashStr = (k.completedHash) ? '<p>Completed txn: <a href="https://kovan.etherscan.io/tx/'+k.completedHash+'" target="_blank" class="card-text">'+k.completedHash+'</a></p>' : "";
            
            var isBuyer = (k.buyerId == App.usrid) // buyer is buying FIAT selling USDT
            var str;
            // check which ccy is crypt
            if (isBuyer){
                str = k.fromccy.ccyType==="ERC20" ? (k.fromAmount+' '+k.fromccy.name+' for '+k.toAmount+' '+k.toccy.name) : (k.toAmount+' '+k.toccy.name+' for '+k.fromAmount+' '+k.fromccy.name) ;
            }else{
                str = k.fromccy.ccyType==="ERC20" ? (k.toAmount+' '+k.toccy.name+' for '+k.fromAmount+' '+k.fromccy.name) :  (k.fromAmount+' '+k.fromccy.name+' for '+k.toAmount+' '+k.toccy.name);
            }
            var bankFundIndicator = k.bankfundflag ? '<span class="badge rounded-pill bg-primary">Bank funds sent '+moment(k.bankfundflag).fromNow()+'</span' : '';	
            var dealStarted = moment(k.created).fromNow();								
            
            $("#myorders").append(
            '<div class="card-body topCard zaraCard" id="'+k.id+'">' +			    			    	 
                 '<h5>'+k.fromccy.name+'/'+k.toccy.name+'<span style="float:right;" class="badge rounded-pill bg-primary" id="orderstatus_'+k.id+'"></span></h5>You are the '+(isBuyer ? 'buyer' : 'seller')+ '<span style="float:right;"> '+dealStarted+' ' + '</span></div>'+
               '<div class="card-body bottomCard zaraCard">'+		    	   
                'You will get '+ str + ' (less fees : '+k.cryptoFee.toFixed(2)+')'+
                     '<p class="card-text"> Order Id:'+k.orderId+' NUM:'+parseInt(k.orderId,16)+' <br/>Buyer:'+k.buyerAddress+'  seller:'+k.sellerAddress+'  </p>'+
                     '<p class="card-text">'+bankFundIndicator+'</p>'+
                      deposithashStr+
                      completedHashStr+
                     '<h6 class="card-title" id="userInfo_'+k.id+'"></h6><br/>'+    	  				
                     '<span id="orderbutton_'+k.id+'">..waiting.(connect your wallet)..</span>'+   	  			   
                   
                 '</div>'

            );
            
            App.mytrades[k.orderId] = k;
            
            App.escrow_details.ctr.methods.getState( parseInt(k.orderId, 16)).call().then(function(state){	
                 console.log(state)
                 var buysellDetails = getBuySellData(state,k.orderId);
                 var info = isBuyer ? buysellDetails.buyerInfo : buysellDetails.sellerInfo;		 			
                 if (completedHashStr==""){
                     var buttonArray = isBuyer ? buysellDetails.buyerButtons : buysellDetails.sellerButtons
                     var buttonPanelStr = "";
                     buttonArray.forEach(item=>{buttonPanelStr+=item})
                     //console.log(buttonArray)
                     $('#orderstatus_'+k.id).html( CTR_STATES[state] );			 		
                     $('#orderbutton_'+k.id).html( buttonPanelStr ); //getInstructions(isBuyer,state,k.orderId)
                     $('#userInfo_'+k.id).html( info );
                 }else{
                     $('#orderstatus_'+k.id).html( "Completed" );
                     $('#orderbutton_'+k.id).html( "" )
                 }
             });
                            
        })
        if (tradeList.length==0){
            $("#myorders").append(
            '<div class="container g-5" ">' +	
             '<div class="row row-cols row-cols-lg-2 g-12 g-lg-3">' +
             '<div class="card mb-3"><h5 class="card-header bg-info">You dont have any Trades</h5>'+
              '<div class="card-body">'+  	  			    
               ' Create an offer someone can accept'+
                  '</div>'+
                 '</div>'+
                '</div>'+	
                '</div>'   );
        }			
    }); 	
}
/**
 * Accepting an offer, we set up a trade and notify the server first
 */
function agree() {
    var attribExisting = {
            preamtbuy : 'number',
            preamtsell : 'number'
    }

    var postObject = validateForm(attribExisting);

    // check all fields
    //postObject.id = postObject.editid;	
    //delete postObject.editid;

    var usrpayid = -1;
    $.each($("input[name='selectedpay']:checked"), function() {
        usrpayid = $(this).val();
    });
    console.log(postObject);
    postObject.usrpayid = usrpayid;
    postObject.ordid = thisoffer.orderId;

    console.log(JSON.stringify(postObject));

    if (postObject.errorcount == 0) {
        postJWTJSON('v1/takeorder.json',postObject,
            function(data) {
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
                    }
                );
    }

}