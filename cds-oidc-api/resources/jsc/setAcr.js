/**
* @file
* setAcr.js
* Having to use javascript policy as apigee native policies dont have 
* a way to extract a string value out of array of strings.
**/

var acrToReturn = "urn:cds.au:cdr:2"; //default value
const acrInRequestObj = context.getVariable("acrUsedDefault"); // should be array but have seen can be string

try {
    const acrInRequestObjJson = JSON.parse(acrInRequestObj);
      
    if (Array.isArray(acrInRequestObjJson)) {
        // pick out first item in array, generally should only be one as ADR should choose one of the acr_values_supported
        // an highly integrated IdP will approve the which acr is used, as we have a loosely coupled IdP this claim is largely void.
        // It currently does not affect security. More integration with forgerock can support this claim better.
        acrToReturn = acrInRequestObjJson[0];
    } 
    else {
        acrToReturn = acrInRequestObj;
    }

    context.setVariable("acrUsed", acrToReturn);
}
catch (e) {
    // not worth throwing error as acr claim is rather dubious, highly integrated IdP may lead to checks but we do not need to.
    context.setVariable("acrUsed", acrToReturn);
}