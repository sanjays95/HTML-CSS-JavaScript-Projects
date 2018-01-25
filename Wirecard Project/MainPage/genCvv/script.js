function generateRandomKeys(){
	var array = new Uint32Array(2);
	window.crypto.getRandomValues(array);

	var rand = array[0].toString(16)+array[1].toString(16)
	return rand;
}

function pad(str, size){
        while(size<32){
            str = str + "0";
            size++; 
        } 
        return str;
}

function XOR_hex(a, b) {
    var res = ""; var temp=0;
        i = a.length,
        j = b.length;
		while(i<j){
			a= "0"+a;
			i++;
		}
		console.log(a);
		while(j<i){
			b="0"+b;
			j++;
		}
		console.log(b);
		//res = (parseInt(a.charAt(1), 16) ^ parseInt(b.charAt(1), 16)).toString(16) + res;
    while (temp<a.length){
        res =  res+(parseInt(a.charAt(temp), 16) ^ parseInt(b.charAt(temp), 16)).toString(16) ;
		temp++;
		}
    return res;
}

function extractNumber(string){
 var res = ""
 var patt = /\d/ ;
 var len = string.length; 
 console.log(len);
 for(var i=0 ; i<len ; i++){
	if (patt.test(string[i])) 
		res += string[i];
	}
 return res;	
}

function extractHex(string){
 var res = ""
 var patt = /\D/ ;
 var len = string.length; 
 for(var i=0 ; i<len ; i++){
	if (patt.test(string[i])) 
		res += string[i];
	}
 return res;	
}

function hexTonumeric(string){
	var res = "";
	var len = string.length;
	for(var i=0 ; i<len ; i++){
		 temp = parseInt(string[i],16)
		 temp -= 10 ;
		 res+=temp;
		 }
	return res;
	 
}

function validateForm() {
    var u = document.forms["cvvForm"]["pan"].value;
	var v = document.forms["cvvForm"]["expireMM"].value;
	var w = document.forms["cvvForm"]["expireYY"].value;
	var x = document.forms["cvvForm"]["scode"].value;
	console.log(u+v+w+x);
    if (u == "") {
        alert("PAN number must be filled out");
        return false;
    }else if(u.length<16 || u.length >16){
    	alert("Please enter a 16 digit PAN")
    	return false
    } 
    else if (v+w == "") {
    	alert("Expiry Date must be filled out");
    	return false;
    } else if (x == "") {
    	alert("Please enter the service code")
    	return false;
    }
    else { 
	console.log("true");
	return true; }
}
	
var but = document.querySelector('button');
var but2 = document.querySelector('button:nth-child(2)');
var textCvv = document.getElementById('cvv')
var insp = document.getElementsByClassName('inspect')[0];

but.addEventListener("click",function(){
	var temp = validateForm();
	if(temp){
		var pAcctNumber = document.getElementById("pan").value;
		var mm = document.getElementById('expireMM').value;
		var yy = document.getElementById('expireYY').value;


		var expDate = mm + yy ;
		var serviceCode = document.getElementById('scode').value ;

		var join = pAcctNumber.concat(expDate,serviceCode);

		console.log("Concatenation of PAN,Exp,SerCode :" + join);

		var padZeroes = pad(join,join.length);

		console.log("PAdding with zeroes: " + padZeroes);

		var block1 = padZeroes.slice(0,16);
		var block2 = padZeroes.slice(16);


		var keyA = generateRandomKeys();//"0123456789ABCDEF" ;
		var keyB = generateRandomKeys();//"FEDCBA9876543210" ;

		console.log("Block1 : " , block1);
		console.log("Block2 : " , block2);

		var ciphertext1 = stringToHex(des (keyA, block1, 1, 0));
		console.log("Step 4 result : " + ciphertext1);

		var ciph1 = ciphertext1.slice(2);   // Result without "0x"
		var xorResult = XOR_hex(ciph1,block2);

		var ciphertext2 = stringToHex(des (keyA, xorResult, 1, 0));
		console.log("Step 5 result : " + ciphertext2);

		var decrypt = des(keyB, ciphertext2, 0, 0);
		var decrypt1 = stringToHex(decrypt);
		console.log("Step 6 result : " + decrypt1);

		var ciphertext3 = stringToHex(des(keyA, decrypt, 1, 0));
		console.log("Step 7 result : " + ciphertext3);

		var ciph3 = ciphertext3.slice(2);
		var digitExt = extractNumber(ciph3);   //extract digits from ciph3
		console.log("Step 8 result : " + digitExt);

		var hexExt = extractHex(ciph3);			//extract hex digits from ciph3
		console.log("Alpha digits from Step 7 result : " + hexExt);

		var decValue = hexTonumeric(hexExt);    //hex valuesw converted to decimal
		console.log("Step 9 result : " + decValue);

		var temp = digitExt+decValue;
		var CVV = temp.slice(0,3);
		

		textCvv.textContent = "CVV : " + CVV;
		//textCvv.classList.add('animated fadeInUp');
		textCvv.className = "animated fadeInUp";
		but.style.display = 'none';
		but2.classList.toggle("reset");
		insp.classList.toggle("inspect");
	}
	else { 
			location.reload();
	}
}) 

but2.addEventListener("click",function(){
	
	textCvv.className = "animated fadeOutDown";
	document.querySelector("form").reset();
	but2.classList.toggle("reset");
	insp.classList.toggle("inspect");
	but.style.display = 'inline';
	
	
})
