function search(dataHolderBrand, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].BrandId === dataHolderBrand) {
            return myArray[i];
        }
    }
}

function isValidObject(object){
    if ( object === null || object === undefined){
        return false;
    }
    return true;
}

var endpointsByBrand = context.getVariable("CDS.endpointsByBrand");
var dataHolderBrand = context.getVariable("CDS.brandId");

var endpointsByBrandJson;
try {
    endpointsByBrandJson = JSON.parse(endpointsByBrand);
    var endpointsByBrandJsonArray = endpointsByBrandJson.Brands;
    if (isValidObject(endpointsByBrandJsonArray) ) {
        var resultObject = search(dataHolderBrand, endpointsByBrandJsonArray);
        if ( isValidObject(resultObject)){
            context.setVariable("CDS.redirectAuthenticationEndpoint", resultObject.RedirectAuthEndpoint);
            context.setVariable("CDS.apiHostname", resultObject.ApiHostname);
            context.setVariable("CDS.apiHostnameOpen", resultObject.ApiHostnameOpen);
            context.setVariable("CDS.internalHostname", resultObject.InternalHostname);
            context.setVariable("CDS.jwks", JSON.stringify(resultObject.JWKS));
            context.setVariable("CDS.dataHolderTenantKey", resultObject.TenantKey);
            context.setVariable("CDS.dataHolderName", resultObject.Name);
            context.setVariable("CDS.dataHolderBrandId", resultObject.BrandId);
            context.setVariable("CDS.requirePAR", resultObject.RequirePAR);
        }else{
            context.setVariable('cdstenx.error.invalid_brand', true);
        }
    }
    else {
        context.setVariable('cdstenx.error.invalid_brand', true);
    }
} catch (e) {
    context.setVariable('cdstenx.error.invalid_brand', true);
}


