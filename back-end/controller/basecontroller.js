const USERS = require("../models/users_model");
const USERMODEL = require("../models/users_model").users;
const playersUser = USERS.GamePlay;
const session_model = USERS.sessionmodel;
const JWTTOEKN = require("../router/token");
const adminUser = USERS.adminUser;
const CryptoJS = require('crypto-js');
const nodemailer = require('nodemailer');

const public_key = "ADJF8792343DZDFDFDFDS"
const private_key = "ZZDKDF77676DFDFDF87D"

exports.sendnotification = (req,res,next) =>{
	
}


exports.email_verify = async (email) => {
    var data = null;
    var user =  await this.BfindOne(USERMODEL,{ email : email });
    if(!user){
        data = false;            
    }else{
        data = true
    }
    return data;
}

exports.username_verify = async (username) => {
    var data = null;
    var user =  await this.BfindOne(USERMODEL,{ username : username });
    if(!user){
        data = false;            
    }else{
        data = true
    }
    return data;
}

exports.confirm_password = async (password, cpassword) => {
    var data = null;
    if(password == cpassword){
        data = true;            
    }else{
        data = false
    }
    return data;
}

exports.password_verify = async (password) => {
    var data = null;
    var user = await this.BfindOne(USERMODEL,{password : password });
    if(!user){
        data = false;
    }else{
        data = user;
    }
    return data;
}

exports.allowed_verify = async (email) => {
    var data = null;
    var user = await this.BfindOne(USERMODEL,{email : email });
    if(!user.allowed){
        data = false;
    }else{
        data = user;
    }
    return data;
}

exports.sendEmail = async (to, html, subject) => {
	var transporter = nodemailer.createTransport({
        host: "cpanel.europe-west1-b.c.cpanel-girohosting.internal",
        port: 465,
        secure: true,
        auth: {
            user: "info@timeclick360.com",
            pass: "5HT{fEoeFd3E"
        }
	});
      
    var mailOptions = {
        from: "info@timeclick360.com",
        to: to,
        subject: 'TimeClick360 - ' + subject,
        html: html,
        // attachments: [
        //     {path: file}
        // ]
    };
    return new Promise((resolve,reject)=>{
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log('Email ERROR: ', error);
            resolve(false)
        } else {
            console.log('Email sent: ' + info.response);
            resolve(true)
        }
        });
    })
}

var sendNotification = function(data) {
	var headers = {
	  "Content-Type": "application/json; charset=utf-8",
	  "Authorization": "Basic NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj"
	};
	
	var options = {
	  host: "onesignal.com",
	  port: 443,
	  path: "/api/v1/notifications",
	  method: "POST",
	  headers: headers
	};
	
	var https = require('https');
	var req = https.request(options, function(res) {  
	  res.on('data', function(data) {
		console.log("Response:");
		console.log(JSON.parse(data));
	  });
	});
	
	req.on('error', function(e) {
	  console.log("ERROR:");
	  console.log(e);
	});
	
	req.write(JSON.stringify(data));
	req.end();
  };
  
	var message = {
		app_id: "5eb5a37e-b458-11e3-ac11-000c2940e62c",
		contents: {"en": "English Message"},
		filters: [
			{"field": "tagv", "key": "level", "relation": "=", "value": "10"}, 
			{"operator": "OR"}, {"field": "amount_spent", "relation": ">", "value": "0"}
		]
	};

exports.get_accessPassword = (privatekey,parameter) =>{
    var str = privatekey;
    for(var i in parameter){
        str+= i + "=" + parameter[i] + "&";
    }
    str = str.slice(0,str.length-1);
    var md5str = get_md5string(str);
    var md5 = md5str.toLocaleUpperCase()
    return md5;
}

exports.get_useritem_fromid = async req =>{
	var id = req.headers.session;
    var useritem = await this.BfindOne(adminUser,{_id : id});
    return useritem;
}

exports.Bfind = async (model,condition = {})=>{
	try{
		var findhandle = null;
		await model.find(condition).then(rdata=>{
			findhandle = rdata;
		});
		if(!findhandle){
			return false;
		}else{
			return findhandle;
		}
	}catch(e){
		return false;
	}
}

exports.BfindSort = async (model,condition = {}) =>{
	try{
		var outdata = null;
		await model.find(condition).sort({order : 1}).then(rdata=>{
			if(!rdata){
				outdata = false;
			}else{
				outdata = rdata;
			}
		});
		return outdata;
	}catch(e){
		return false;
	}
}

exports.get_date = ()=>{
	var d = new Date();
    var year = d.getFullYear();
    var month = parseInt(d.getMonth()) + 1;
    var mh = month > 9 ? month : "0" + month;
	var datestring = year + "-"+mh;
    return datestring;
}

exports.md5convert = (string)=>{
	var aa = get_md5string(string); 
	return aa;
}

exports.headers = () =>{
    return  {'Content-Type': 'application/x-www-form-urlencoded'};
}

exports.cv_ebase64=(rstring) =>{
    let buff = new Buffer(rstring);
    let base64data = buff.toString('base64');
    return base64data
}

 exports.cv_dbase64=(rstring) =>{
    let buff = new Buffer(rstring, 'base64');
    let text = buff.toString('ascii');
    return text;
}

 exports.data_save =async (indata,model)=>{
	// try{
		var handle = null;
		var savehandle = new model(indata);
		await savehandle.save().then(rdata=>{
			if(!rdata){
				handle = false;
			}else{
				handle = rdata;
			}
		});
		return handle;
	// }catch(e){
	// 	return false;
	// }
}

exports.BSortfind = async (modal,condition = {},sortcondition = {})=>{
	try{
		var data;
		await modal.find(condition).sort(sortcondition).then( rdata => { 
			data = rdata;
		});
		if(!data){
			return false;
		}else{
			return data;
		}
	}catch(e){
		return false;
	}
}

exports.jwt_encode = async function(string){
	var token = await JWTTOEKN.jwt_encode(string);
    return token;
}


function get_md5string(string){
	function RotateLeft(lValue, iShiftBits) {
			return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}
	function AddUnsigned(lX,lY) {
			var lX4,lY4,lX8,lY8,lResult;
			lX8 = (lX & 0x80000000);
			lY8 = (lY & 0x80000000);
			lX4 = (lX & 0x40000000);
			lY4 = (lY & 0x40000000);
			lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
			if (lX4 & lY4) {
					return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
			}
			if (lX4 | lY4) {
					if (lResult & 0x40000000) {
							return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
					} else {
							return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
					}
			} else {
					return (lResult ^ lX8 ^ lY8);
			}
	}

	function F(x,y,z) { return (x & y) | ((~x) & z); }
	function G(x,y,z) { return (x & z) | (y & (~z)); }
	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
			a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
			return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
			var lWordCount;
			var lMessageLength = string.length;
			var lNumberOfWords_temp1=lMessageLength + 8;
			var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
			var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
			var lWordArray=Array(lNumberOfWords-1);
			var lBytePosition = 0;
			var lByteCount = 0;
			while ( lByteCount < lMessageLength ) {
					lWordCount = (lByteCount-(lByteCount % 4))/4;
					lBytePosition = (lByteCount % 4)*8;
					lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
					lByteCount++;
			}
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
			lWordArray[lNumberOfWords-2] = lMessageLength<<3;
			lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
			return lWordArray;
	};

	function WordToHex(lValue) {
			var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
			for (lCount = 0;lCount<=3;lCount++) {
					lByte = (lValue>>>(lCount*8)) & 255;
					WordToHexValue_temp = "0" + lByte.toString(16);
					WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
			}
			return WordToHexValue;
	};

	function Utf8Encode(string) {
			string = string.replace(/\r\n/g,"\n");
			var utftext = "";

			for (var n = 0; n < string.length; n++) {

					var c = string.charCodeAt(n);

					if (c < 128) {
							utftext += String.fromCharCode(c);
					}
					else if((c > 127) && (c < 2048)) {
							utftext += String.fromCharCode((c >> 6) | 192);
							utftext += String.fromCharCode((c & 63) | 128);
					}
					else {
							utftext += String.fromCharCode((c >> 12) | 224);
							utftext += String.fromCharCode(((c >> 6) & 63) | 128);
							utftext += String.fromCharCode((c & 63) | 128);
					}

			}

			return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
			AA=a; BB=b; CC=c; DD=d;
			a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
			d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
			c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
			b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
			a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
			d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
			c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
			b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
			a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
			d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
			c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
			b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
			a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
			d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
			c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
			b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
			a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
			d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
			c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
			b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
			a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
			d=GG(d,a,b,c,x[k+10],S22,0x2441453);
			c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
			b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
			a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
			d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
			c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
			b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
			a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
			d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
			c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
			b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
			a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
			d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
			c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
			b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
			a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
			d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
			c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
			b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
			a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
			d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
			c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
			b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
			a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
			d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
			c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
			b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
			a=II(a,b,c,d,x[k+0], S41,0xF4292244);
			d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
			c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
			b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
			a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
			d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
			c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
			b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
			a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
			d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
			c=II(c,d,a,b,x[k+6], S43,0xA3014314);
			b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
			a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
			d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
			c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
			b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
			a=AddUnsigned(a,AA);
			b=AddUnsigned(b,BB);
			c=AddUnsigned(c,CC);
			d=AddUnsigned(d,DD);
			}

		var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
		
		return temp.toLowerCase();
}

exports.sesssion_update_token =async (token)=>{
	var uphandle =  await this.BfindOneAndUpdate(session_model,{token : token},{intimestamp : this.get_timestamp()});
	if(uphandle){
		return true
	}else{
		return false
	}
}

exports.BfindOne = async (model,condition = {})=>{
	try{
		var outdata = null; 
		await model.findOne(condition).then(rdata=>{
			if(!rdata){
				outdata = false;
			}else{
				outdata = rdata;
			}
		});
		return outdata;
	}catch(e){
		return false;
	}
}

exports.BfindOneAndUpdate = async (model,condition = {},data) =>{
	try{
		var updatehandle = null;
		await model.findOneAndUpdate(condition,data).then(rdata=>{
			updatehandle = rdata;
		});
		if(!updatehandle){
			return false
		}else{
			var findhandle =  await this.BfindOne(model,condition);
			if(!findhandle){
				return false;
			}else{
				return findhandle;
			}
		}
	}catch(e){
		return false;
	}
}

exports.BfindOneAndDelete =async (model,condition)=>{
	try{
		var deletehandle = null;
		await model.findOneAndDelete(condition).then(rdata=>{
			deletehandle = rdata;
		});
		if(!deletehandle){
			return false;
		}else{
			return deletehandle;
		}
	}catch(e){
		return false;
	}
}

exports.get_timestamp = ()=>{
	return (new Date()).valueOf();
}

exports.player_balanceupdatein_Username = async(amount,username)=>{
	var outdata = null;
    await playersUser.findOneAndUpdate({username :username },{$inc : {balance : amount}}).then((rdata)=>{
        outdata = rdata;
    });
    if(!outdata){
        return false;
    }else{
        return outdata.balance + amount;
    }
}

exports.player_Bonusupdatein_Username = async(amount,username)=>{
	var outdata = null;
    await playersUser.findOneAndUpdate({username :username },{$inc : {bonusbalance : amount}}).then((rdata)=>{
        outdata = rdata;
    });
    if(!outdata){
        return false;
    }else{
        return outdata.balance + amount;
    }
}

exports.email_balanceupdate =async(email,amount)=>{
	var outdata = null;
	await playersUser.findOneAndUpdate({email :email },{$inc : {balance : amount}}).then((rdata)=>{
        outdata = rdata;
    });
    if(!outdata){
        return false;
    }else{
        return outdata.balance + amount;
    }
}

exports.email_balanceandbonusupdate =async(email,amount,bonusamount)=>{
	var outdata = null;
	await playersUser.findOneAndUpdate({email :email },{$inc : {balance : amount,bonusbalance : bonusamount}}).then((rdata)=>{
        outdata = rdata;
    });
    if(!outdata){
        return false;
    }else{
        return outdata.balance + amount;
    }
}

exports.array_sort = (data,handle) =>{
	var rows = [];
	for(var i = 0 ; i < data.length ; i++){
		data[i][handle] = i + 1;
		rows.push(data[i]);
	}
	return rows;
}

const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')

exports.AesEncrypt = (text) => {
	// var base64Iv = public_key;
	// var key = CryptoJS.enc.Base64.parse(private_key);
	// var iv = CryptoJS.enc.Utf8.parse(base64Iv);
	// var encrypted = CryptoJS.AES.encrypt(text, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});    
	// var decryptedData = encrypted.toString();
	// return utf8ToHex(decryptedData);
	var encrypted = CryptoJS.AES.encrypt(text, "my-secret");
	return encrypted.toString();
}

exports.AesDecrypt = (text) => {
	// text = hexToUtf8(text);
    // var base64Iv = public_key;
    // var key = CryptoJS.enc.Base64.parse(private_key);
    // var iv = CryptoJS.enc.Utf8.parse(base64Iv);
    // var decrypted = CryptoJS.AES.decrypt(text, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
	// var decryptedData = decrypted.toString();
	// return decryptedData;
	var decrypted = CryptoJS.AES.decrypt(text, "my-secret");
	return decrypted.toString(CryptoJS.enc.Utf8);
}