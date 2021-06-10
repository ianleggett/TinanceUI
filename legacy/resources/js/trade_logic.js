

const CTR_STATES = {0:"Deposit"/*Unknown*/, 1:"Funded", 2:"TokenApproved", 3:"FiatReceived", 4:"Completed", 5:"RequestCancel", 
                    6:"CancelAgreed", 7:"Refunded", 8:"Arbitration", 9:"Error"};
 
const DEPOSIT = 0;
const BANKSENT = 4;
const BANKRECEIVED = 5;
const COMPLETE = 6;

const OPT_CANCEL = '<button class="btn btn-sm btn-outline-danger" onclick="cancel(\'ordid\')">Cancel transaction</button>';
const OPT_DEPOSIT = '<button class="btn btn-sm btn-outline-warning" onclick="deposit(\'ordid\')">Deposit</button>';
const OPT_SEND_BANK = '<button class="btn btn-sm btn-outline-info" onclick="goodsSent(\'ordid\')">I have sent bank funds</button>';
const OPT_RECIEVEDBANK = '<button class="btn btn-sm btn-outline-info" onclick="goodsReceived(\'ordid\')">I have received bank funds</button>';
const OPT_RELEASEFUNDS = '<button class="btn btn-sm btn-outline-success" onclick="paySeller(\'ordid\')">Release funds</button>';
const STATE = {		
		Deposit : { buyerButtons: [OPT_CANCEL],
 					 buyerInfo: 'Waiting for seller to deposit funds',
  					 sellerButtons:  [OPT_DEPOSIT,OPT_CANCEL],
		 			 sellerInfo: 'Great, please deposit the funds',
                     classname: "light"},
		Funded : { buyerButtons:  [OPT_SEND_BANK,OPT_CANCEL],
					 buyerInfo: 'The seller has sent funds, please send bank funds now',
  					 sellerButtons:  [OPT_RECIEVEDBANK],
					 sellerInfo: 'The buyer is sending the bank funds, please check your bank',
                     classname: "light"},
  TokenApproved : { buyerButtons: [OPT_SEND_BANK,OPT_CANCEL],
 					 buyerInfo: 'Please send the bank funds',
  					 sellerButtons:  [OPT_RECIEVEDBANK],
					 sellerInfo: 'The buyer is sending the bank funds, please check your bank',
                     classname: "light"},
    FiatReceived : { buyerButtons:  [],
					 buyerInfo: 'Transfer successful, we will release funds to the seller',
  					 sellerButtons: [OPT_RELEASEFUNDS],
		             sellerInfo: 'The buyer has confimred bank funds',
                     classname: "light"},
        Completed : { buyerButtons:  [],
					 buyerInfo: 'Transfer successful, we have released funds to the seller',
  					 sellerButtons: [],
		             sellerInfo: 'Success! the funds have been transfered',
                     classname: "success"},
		 };
	
// returns a buysell object
function getBuySellData(stateNum, orderid){	
	//console.log(stateNum);
	//console.log(CTR_STATES[stateNum]);
	var obj = Object.assign({}, STATE[ CTR_STATES[stateNum]] );
	// modify the strings to fit the orderid
	buybutt=[];
	sellbutt=[];
	obj.buyerButtons.forEach( item => { buybutt.push(item.replace('ordid',orderid)); });
	obj.sellerButtons.forEach(item=>{sellbutt.push(item.replace('ordid',orderid)); });
	obj.buyerButtons = buybutt;
	obj.sellerButtons = sellbutt;
	//console.log(JSON.stringify(obj))
	return obj;
}	
	
