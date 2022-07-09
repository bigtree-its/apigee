function searchEncKeys(myArray, idTokenEncryptionAlg){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].use === "enc" && myArray[i].alg === idTokenEncryptionAlg) {
            return myArray[i];
        }
    }
}


try {
    context.setVariable("TEST.adrJwksResponse", context.getVariable("jwksVar"));
    var adrJwksResponse = JSON.parse(context.getVariable("jwksVar"));
    var idTokenEncryptionAlg = context.getVariable("idTokenEncryptionAlg");

    if (adrJwksResponse && adrJwksResponse.keys) {
         var encJwksKid = searchEncKeys(adrJwksResponse.keys, idTokenEncryptionAlg).kid; //finds the first signature key. Should not be multiple from ADR JWKS
         context.setVariable("clientJwksUriEncKid", encJwksKid);
    }

    // JAVA policy to get ADR JWKS is cached so we cache bust it, fix for CTS
    var d = new Date();
    context.setVariable("clientJwksUri", context.getVariable("clientJwksUri") + "?bust=" + d.getTime()); 

}
catch (e) {
    print(e);
    throw e;
}