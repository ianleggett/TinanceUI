/**
 * Offer / Offer handling
 * 
 */
/**
 * Create new offer, Display page function
 */
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

/**
 * When showing user offers, each offer can be set to live or off
 */
 function setLive(kid){ 	
     var ischecked=$('input[id="livecheck'+kid+'"]').is(':checked');
    postJWTJSON('v1/toggleLive.json?kid='+kid+'&v='+ischecked,null,function(data){
        console.log(data);
    });
 }

 /**
 * When showing user offers, any offer can be deleted
 */
 function deleteOffer(kid){
     if (confirm('Confirm delete offer?')){
        postJWTJSON('v1/deleteoffer.json?kid='+kid,null,function(data) {
            myOffers();
        }); 		
     }
 }
 /**
 * When showing user offers, any offer that has expired can be extended
 */
 function extendOffer(kid){		
       postJWTJSON('v1/extendoffer.json?kid='+kid,null,function(data) {
           myOffers();
       }); 			
}

 /**
 * Showing user offers
 */
 function myOffers(){		
    hideMsgs();
    var postFilter = {fromccy:1,toccy:1}
    var filtStr = '?filt=';//+encodeURI( JSON.stringify(postFilter) )
    getJWTJSON('v1/myoffers.json',null, (offerList) => {
        console.log(offerList);
        clearPanel();
        clearBar();
        // create button
        $('#alertbar').html('<button class="btn btn-success" type="button" onclick="newOffer()"><i class="fas fa-plus"></i></button>');
        console.log(offerList);
        offerList.forEach( k=>{
            var payTypes = "";
            k.paymentDetails.forEach( payItem =>{
                payTypes += '<span class="badge bg-primary">'+payItem.payType.name+'</span>';
            })
            
            var islive = '<div data-bs-toggle="tooltip" data-bs-placement="top" title="visibility" style="float: left;" class="form-check form-switch">'+
              '<input class="form-check-input" type="checkbox" onclick="setLive('+k.id+')" id="livecheck'+k.id+'" '+(k.live?'checked':'')+'>'+				 
              '</div>';
            var delbutton = '<button class="btn btn-sm btn-danger" style="float: right;" type="button" onclick="deleteOffer('+k.id+')"><i class="far fa-trash-alt"></i></button>';
                    
            var statusActions = '<div class="row><button class="btn btn-sm btn-info" disable type="button">'+ k.procStatus +'</button>';
            statusActions += k.procStatus=="EXPIRED" ? '<button class="btn btn-sm btn-info" onclick="extendOffer('+k.id+')" type="button">Extend 1h</button>': '';
            statusActions += '</div>';

            var res = moment(k.created).fromNow();
            $("#mainDiv").append(		    			
            '<div class="card-body zaraCardWhite" id="'+k.id+'">' +			    	
             '<div class="card mb-3"> <div class="card-header">'+islive + '<h5>'+k.fromccy.name+'/'+k.toccy.name+' '+delbutton+'</h5></div> ('+res+') ' + statusActions +
              '<div class="card-body">'+
                     '<h5 class="card-title">'+k.fromAmount+' '+k.fromccy.name+' => '+   
                     k.toAmount+' '+k.toccy.name+'</h5>'+
                      payTypes +
                   '</div>'+   	  			 
                 '</div>'+	
                 '</div>'   		
            );
            })
        if (offerList.length==0){
            $("#mainDiv").append(
            '<div class="container g-5" ">' +	
             '<div class="row row-cols row-cols-lg-2 g-12 g-lg-3">' +
             '<div class="card mb-3"><h5 class="card-header">You dont have any Offers</h5>'+
              '<div class="card-body">'+  	  			    
               ' Try creating one'+
                  '</div>'+
                 '</div>'+
                '</div>'+	
                '</div>'   );
        }
    }); 	
}

/**
 * Show all public
 */
function browseOffers(){
    var postFilter = {fromccy:1,toccy:1}
    var filtStr = '?filt=';//+encodeURI( JSON.stringify(postFilter) );
        getJWTJSON('v1/public/offers.json',null, (offerList) => {
        clearPanel();
        clearBar();	
    
        console.log(offerList);
        offerList.forEach( k=>{
            var payItems="";
              k.paymentDetails.forEach( payitem => {
                  payItems += '<div class="col-sm"><span style="text-align:centre" class="badge rounded-pill bg-primary">'+payitem.payType.name+'</span></div>';    	 
                 });

            var res = moment(k.updated).fromNow();
            $("#mainDiv").append(
            '<div class="card-body topCard zaraCard" id="'+k.id+'">' +			    	
             '<h5 class="card-header">'+k.fromccy.name+'/'+k.toccy.name+'<span style="float:right;" class="badge rounded-pill bg-info">'+k.userName+'<span></h5> ('+res+') ' + k.procStatus +
              '<div class="card-body">'+
                     '<h5 class="card-title">'+k.fromAmount+' '+k.fromccy.name+' => '+k.toAmount+' '+k.toccy.name+'</h5>'+
                 '</div>'+	
                 '</div>'+
               '<div class="card-body bottomCard zaraCard"> <div class="row">'+  	  			  
                      payItems + '<div class="col-sm"><button style="float:right;" class="btn btn-outline-success" onclick="pretrade(\''+k.orderId+'\')" >take offer</button></div>'+	
            '</div></div>'
            );
        })
        if (offerList.length==0){
            $("#mainDiv").append(
            '<div class="card-body zaraCardWhite" ">' +			    	
             '<div class="card mb-3"><h5 class="card-header">No Offers available</h5>'+
              '<div class="card-body">'+  	  			    
                  '</div>'+  	  			 
                '</div>'+	
                '</div>');
        }
    }); 	
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
                    '<button type="button" class="btn btn-info"  style="float: right; margin-left: 50px;" class="btn btn-sm btn-primary font-weight-bold">'
                    + k.fromAmount + ' ' + k.fromccy.name
                    + '<br>available</button>'
                    +'You are the '+buySellStr+' (rate:'+k.exchRate+')'
                    +'<br/> Selling '
                            + k.toccy.name
                            + ' Buying '
                            + k.fromccy.name );

    setOfferPayButtons('paydetail', k.paymentDetails);	
    $('#preamtsell').val( k.toAmount );	
    $('#preamtbuy').val( k.fromAmount );
}

function calc(obj){
    console.log("calc "+obj.name +" "+$('#exchrate').text())
    var rate = parseFloat($('#exchrate').text());		
    
    if(obj.name==='preamtsell'){			
        $('#preamtbuy').val( parseFloat($('#preamtsell').val()) *  rate)
    }else if(obj.name==='preamtbuy'){
        $('#preamtsell').val( parseFloat($('#preamtbuy').val()) / rate)
    }		
}

function placeOrder(){

    var postObject = {fromccyid:99, toccyid:99, fromamt: $('#amtsell').val(), toamt: $('#amtbuy').val(), 
    feevalue: $('#amtfee').val(), expiry : $('#expiry').val(), expUnit: $('#expUnit').val(), payTypes:[] }	
    
    postObject.payTypes = getSelectedPayTypes();
    var crypt = getCryptBuySell();
    var fiat = getFiatSelected();
    
    console.log(JSON.stringify(crypt) + "  " + JSON.stringify(fiat));		
    
    if (crypt.buy){
        postObject.toccyid = crypt.ccy.id;
        postObject.fromccyid = fiat.ccy.id;
    }else{
        postObject.fromccyid = crypt.ccy.id;
        postObject.toccyid = fiat.ccy.id;		
    }	
        
        console.log(JSON.stringify(postObject));
        postJWTJSON('v1/addupdateorder.json',postObject,function(data) {			    	
            $('#msgdialog').modal('show');
            $('#msgtitle').html('Offer Added');
            if (data.statusCode==0){
                $('#msgdetails').html('Success - Added Offer <button type="button" onclick="myOffers()" class="btn btn-success"><i class="fas fa-check"></i> OK</button>');
            }else{		    		
                $('#msgdetails').html('<button type="button" class="btn btn-danger">Failed '+data.msg+'</button>');		    		
            }		    	
            //refreshView();
        });	    
}

function calcOfferDetails(obj){
    //console.log("calc "+obj.name)		
    var crypt = getCryptBuySell();
    var fee = 0;
    var exchrate = parseFloat($('#amtbuy').val() / parseFloat($('#amtsell').val()));
    // fees are attached to USDT always!!!!					

    if (crypt.buy){						
            amt = parseFloat($('#amtbuy').val()); 
            fee = FEEPCT * amt;
            $('#exchrate').html( exchrate );
            $('#amtfee').html( fee + ' USDT' ); 
    }else{			
            amt = parseFloat($('#amtsell').val()); 
            fee = FEEPCT * amt;				
            $('#exchrate').html( exchrate );
            $('#amtfee').html( fee + ' USDT' ); 
    }			
    $('#amtfee').val( fee );
}

function getCryptBuySell(){
    var res={};
    var valFrom = $('#dropdownCurr1').text()
    var valTo = $('#dropdownCurr2').text()
    console.log("valfrom:"+valFrom+" valto:"+valTo);
    // collect the data from the form
    if (App.ccyMap[valFrom].ccyType==='ERC20')
        res = {buy:false, ccy: App.ccyMap[valFrom] } 
    else if (App.ccyMap[valTo].ccyType==='ERC20')	
        res = {buy:true, ccy: App.ccyMap[valTo] }; 
    return res;
}

function getFiatSelected(){
    var res={found:false};
    var valFrom = $('#dropdownCurr1').text()
    var valTo = $('#dropdownCurr2').text()
    if (App.ccyMap[valFrom].ccyType==='Fiat')
        res = {found:true, ccy: App.ccyMap[valFrom] } 
    else if (App.ccyMap[valTo].ccyType==='Fiat')	
        res = {found:true, ccy: App.ccyMap[valTo] }; 
    return res;
}

function validateForm(attrib){
const regex=/^[0-9\.]+$/;
var postObject={};
 var errorcount = 0
 //var i = 0, len = attrib.length; i < len; i++
for (const field in attrib) {
    var widget = $('#'+field );
    var widgetval = $('#'+field ).val();
    widgetval = widgetval!=undefined ? widgetval.trim() : "";
    console.log(field + " => " + widgetval + " " + attrib[field]);
    var fieldError = 0;
    postObject[field] = widgetval;				
    switch(attrib[field]){
        case 'string':				
            if (widgetval==""){
                fieldError += 1
            } break;
        case 'number':				
            if (!widgetval.match(regex)){		  	    
                fieldError += 1
            } 
              break;
          case 'select':				
            if (!widgetval.match(regex)){		  	    
                fieldError += 1
            }else if (Number.parseInt(widgetval) <= 0){
                fieldError += 1
            }
              break;
        case 'date': 				
            if (moment( widgetval, [DATE_TIME_FORMAT]).format() == INVALID_DATE){
                fieldError += 1;
            }
            break;
        case 'checkbox':
            postObject[field] = widget.is(':checked')
            break;
        }			     
    if (fieldError>0){
        // mark in red	
        console.log('field '+field+' has problem ' + attrib[field])
        widget.addClass("is-invalid") //background-color:#fdb9bc;
        widget.removeClass("is-valid");
        errorcount += 1			
    }else{
        widget.removeClass("is-invalid");
        widget.addClass("is-valid")
    }
}
postObject.errorcount = errorcount;
return postObject;
}