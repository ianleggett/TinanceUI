	web_schema = {
			  type: "object",
			  title: " ",
			  properties: {					  
				  vendorType : {
			    	title: "Ecommerce site type",
			    	type: "string",
			    	format: "select",
					uniqueItems: true,
					enum: ["WooCommerce","Magento"],			    	
			    },			   
			    webUrl: {
			    	title: "Web url, base host name and URL",
			    	type: "string",
			    	default : "https://yoursite.com",
			    },			    
			    webUserName: {
			    	title: "Username",
			    	type: "string",
			    	default : "-not-set-",
			    },
			    
			    webPwd: {
			    	title: "password",
			    	type: "string",
			    	default : "password",
			    }
			  }
	};
	
	crypto_schema ={			
			 type: "object",
			  title: " ",
			  properties: {
			    httpService: {
			    	title: "Url and port",
			    	type: "string",
			    	default : "http://",
			    },			    
			    escrowCtrAddr: {
			    	title: "Escrow Contract address on this network",
			    	type: "string",
			    	default : "-not-set-",
			    },			    
			    brokerPrivateKey: {
			    	title: "Broker Private key",
			    	type: "string",
			    	default : "-not-set-",
			    },
			    usdtcoinCtrAddr: {
			    	title: "USDT or Coin Address on this network",
			    	type: "string",
			    	default : "-not-set-",
			    },
			    sellerfeePct: {
			    	title: "Seller Fee for the transaction (%)",
			    	type: "number",
			    	default : 0.015,
					minimum : 0,
					maximum : 0.5					
			    },
			    buyerfeePct: {
			    	title: "Buyer Fee for the transaction (%)",
			    	type: "number",
			    	default : 0.015,
					minimum : 0,
					maximum : 0.5					
			    },	
	
			  }
	};
	
	
	display_schema = {
		  type: "object",
		  title: " ",
		  properties: {			    
			    tableScroll : {
			    	title: "Table paging (checked) Scrollable tables (uncheck)",
	                type: "boolean",
	                format: "checkbox",
	                propertyOrder : 10
	            },
	            fakeSendEmails : {
				  	title: "Simulate sending of emails but dont actually send",
		            type: "boolean",
		            format: "checkbox",
		            propertyOrder : 11
		        },
			    skuBarCodes : {
			    	title: "Add barcodes to SKU on factory print",
	                type: "boolean",
	                format: "checkbox",
	                propertyOrder : 12
	            },
	            emailOnStoragebin : {
			    	title: "If an order is put in a storage bin, send email Ready & Updates",
	                type: "boolean",
	                format: "checkbox",
	                propertyOrder : 13
	            },	            
	            emailOnPaymentMade : {
			    	title: "Send an email each time a payment is made",
	                type: "boolean",
	                format: "checkbox",
	                propertyOrder : 14
	            },
	            emailOrderPlaced : {
			    	title: "Send an email when the order is placed",
	                type: "boolean",
	                format: "checkbox",
	                propertyOrder : 15
	            },
	            emailOrderUpdate : {
			    	title: "Send an email when the order is changed",
	                type: "boolean",
	                format: "checkbox",
	                propertyOrder : 16
	            },			  
		    suggestedDeposit: {
		    	title: "Enter suggested deposit percentage e.g 10",
		    	type: "integer",
		    	default : 10,
	    		minimum : 0,
	    		maximum : 100,	
	    		propertyOrder: 102
		    },		 
		    // system settings		    
			curencySymbol:{
				title: "Currency Symbol",
				 type: "string",
				 format: "select",
				 uniqueItems: true,
				 enum: ["£","$"],
				 propertyOrder: 200
			},		
		    storageLocations: {
		    	title: "The number of storage locations available (must be sequential no gaps e.g. 1 to 100)",
		    	type: "integer",
		    	default : 100,
    			minimum : 1,
    			maximum : 1000,
    			propertyOrder: 205
		    },
		    ordersPerBin: {
		    	title: "Number of orders allowed in each storage bin.",
		    	type: "integer",
		    	default : 1,
    			minimum : 1,
    			maximum : 99,
    			propertyOrder: 206
		    },	
	        invoiceNumbering : {
	               title: "How do you want the invoices are numbered?",
	           	  type: "string",
	           	  enum:[
	           		"DATE_BASED",
	           		"SEQUENCE"
	 				]
	         },
	         invoiceStart: {
	 		    	title: "When invoice number is a sequence, this number is used",
	 		    	type: "integer",
	 		    	default : 10000,
	     			minimum : 0,
	     			maximum : 999999999
	 		 },		
		    archiveDays: {
		    	title: " [Completed & Cancelled] Number of Minutes Orders remain visible in order viewing (0=remove straight away)",
		    	type: "integer",
		    	default : 1,
    			minimum : 0,
    			maximum : 1440,
    			propertyOrder: 207
		    },	
		    procArchiveMins: {
		    	title: "Number of minutes a factory job [Completed] remains visible in the queue (0=remove straight away)",
		    	type: "integer",
		    	default : 30,
    			minimum : 0,
    			maximum : 2000,
    			propertyOrder: 208
		    },	
		    emailCheckMins: {
		    	title: "Number of minutes to check and send emails (0=disable sending emails)",
		    	type: "integer",
		    	default : 10,
    			minimum : 0,
    			maximum : 1440,
    			propertyOrder: 209
		    },
		    emailValidation: {
		    	title: "Regex format for email e.g ^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
                type: "string",
		    	default : "^\\\\d{10,15}$",
                minLength: 1
             },	
            phoneValidation: {
		    	title: "Regex format for phone numbers e.g ^[0-9]{10,15}$",
                type: "string",
            	default : "^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$",
                minLength: 1
            },
            emailCollectionDateTxt: {
		    	title: "Text to show on customer email collection date, leave blank to show collection date",
                type: "string",
		    	default : "",
                minLength: 0
             },	
		    globalDefaultLeadTime: {
		    	title: "Default Lead Time when no lead time is given (days) ",
		    	type: "integer",
		    	default : 0,
		    	minimum : 0,
		    	maximum : 99,
	            propertyOrder : 30	    	
		    	},
		    globalLeadTimeAddSub: {
		    	title: "Add for all lead Times to adjust for production speed (+days)",
		    	type: "integer",
		    	default : 0,
	    		minimum : 0,
	    		maximum : 50,
	            propertyOrder : 35		    	
		    },
		    highlightLeadDaysOver: {
		    	title: "When a lead time is over this number days, highlight it to staff/customer (days)",
		    	type: "integer",
		    	default : 20,
    			minimum : 0,
    			maximum : 99,
	            propertyOrder : 40
		    },
		    leadHighlightStyle : {
		    	title: "Style formatting used to highlight lead time",
		    	type: "string",
		    	default : "background-color: #ffe0e0;color: #ff1111;",		    	
	            propertyOrder : 100
		    },
		    inStockHighlightStyle : {
		    	title: "Style formatting used to highlight In stock Now",
		    	type: "string",
		    	default : "background-color: #e0ffe0;color: #11ff11;",
	            propertyOrder : 110
		    }
		  },
		  defaultProperties: ["globalDefaultLeadTime"]
}

staff_schema = {
	  	type : "array",
	  	title: " ",
	  	format: "table",
	      items : {
	      	type:"object",
	      	properties: {
	              id: {
		               type: "string",
		               format:"hidden", 
		               default: null
		              },		              	      		
	              username: {
	                type: "string",
	                minLength: 1
	              },		              
	              password: {
	                  type: "string",
	                  minLength: 1,
	                  format: "password"
	              }, 
	              email: {
		                type: "string",
		                minLength: 1
		          },
	              role : {
	            	  type: "string",
	            	  enum:["ROLE_GUEST",
	            		"ROLE_USER",	            		
	            		"ROLE_ADMIN",
	            		"ROLE_SUPER"]
	              },
	              enabled : {
	                  type: "boolean",
	                  format: "checkbox"
	              }
	              
	      	}
	      }
}
	venue_schema = {
			type : "array",
		  	title: " ",
		  	format: "table",
		      items : {
		      	type:"object",
		      	properties: {
			      		 id: {
				               type: "string",
				               format:"hidden", 				               
				               propertyOrder: 1
				              },
				         enabled : {
					           type: "boolean",
					           format: "checkbox",
					           propertyOrder: 2
					        },
					    venueName: {
					    	title: "Venue Name",
					    	type: "string",
					    	default : "-name-",
					    	propertyOrder: 3
					    },	
					    limitOrMarket:{
					    	title: "order type",
					    	type: "string",					    	
			            	enum:["limit",
			            		"market"],
			            	propertyOrder: 4
					    },					    
					    makerFee: {
					    	title: "Maker Fee (%)",
					    	type: "number",
					    	default : 0.0,
				    		minimum : 0,
				    		maximum : 50,	
				    		propertyOrder: 5
					    },
					    takerFee: {
					    	title: "Taker Fee (%)",
					    	type: "number",
					    	default : 0.0,
				    		minimum : 0,
				    		maximum : 50,	
				    		propertyOrder: 6
					    },					   
					    apiKey: {
					    	title: "API Key",
					    	type: "string",			    	
					    },
					    apiSecret: {
					    	title: "API secret",
					    	type: "string",	
					    	minLength: 1,
			                format: "password"
					    }, demo: {
					    	title: "demo-token (blank=production)",
					    	type: "string",
					    	default:""
					    },
			  }
		      }
	};
	
sym_schema = {
		  	type : "array",
		  	title: " ",
		  	format: "table",
		      items : {
		      	type:"object",
		      	properties: {
		      		symPair: {
		                type: "string",
		                minLength: 1
		              },		              		            
		              enable : {
		                  type: "boolean",
		                  format: "checkbox"
		              },
		              baseCcy: {
			                type: "string",
			                minLength: 1,
			                readonly: true
			              },
			          quoteCcy: {
				            type: "string",
				            minLength: 1,
				            readonly: true
				      }		              
		      	}
		      }
	}	