
   function encrypt(text, key) {
     // key is a jsonString. Public key: n,e
	 console.log(key)
	 key = JSON.parse(key);
	 
	 var output = "";
     for(var i = 0; i < text.length; i++) {
		var m = processorTool.char2Num(text.charAt(i));
        var mE = processorTool.num2Char(RSA.encrypt(m,key.n,key.e))
		
		output += mE;
     }
     return output;
   }

    function decrypt(text,publicKey) {
		// key is a jsonString. Private key: n,d
      var key = JSON.parse(publicKey);
      var output = "";
      for(var i = 0; i < text.length; i++) {
        var m = processorTool.char2Num(text.charAt(i));
        var mE = processorTool.num2Char(RSA.decrypt(m,key.d,key.n))
		
		output += mE;
      }
      return output;
    }
