//verify callback allowed, this is catered for automatically in apigee when authcode or token generation is called.
// we dont gerated code or token here so have to manually check. 
var requestedRedirectUri = context.getVariable("theRedirectUri");
var allowedRedirectUri = context.getVariable("clientInfo.redirectURIs");

if (requestedRedirectUri !== null) {
    var callbackFound = false;
    var callbackArray = allowedRedirectUri.split(",");
    for(var i = 0; i < callbackArray.length; i++) {
        if (requestedRedirectUri.toLowerCase().trim() === callbackArray[i].toLowerCase().trim()) {
            callbackFound = true;
        }
    }
    if (!callbackFound) {
        context.setVariable("faultType", "invalid_redirect_uri");
        context.setVariable("faultMessage", "callback uri not allowed");
    }
}