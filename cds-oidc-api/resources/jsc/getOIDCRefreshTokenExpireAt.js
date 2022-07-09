/**
* @file
* getOIDCRefreshTokenExpireAt.js
* Get the expiry and is active flag for token invocation
* Useful - https://docs.apigee.com/api-platform/reference/policies/get-oauth-v2-info-policy
* **/
var refreshTokenStatus = context.getVariable("oauthv2refreshtoken.OAInfo-RetrieveRefreshTokenDetails.refresh_token_status");
refreshTokenStatus = (refreshTokenStatus === "approved") ? "true" : "false";
context.setVariable("CDS.refreshTokenStatus", refreshTokenStatus);

var refreshTokenExpiresIn = context.getVariable("oauthv2refreshtoken.OAInfo-RetrieveRefreshTokenDetails.refresh_token_expires_in");
var nowInEpochMillis =  context.getVariable("system.timestamp");
var refreshTokenExpiresInMillis = Math.floor((refreshTokenExpiresIn.toString() + "000"));
var refreshTokenExpiresAt = Math.floor((nowInEpochMillis + refreshTokenExpiresInMillis) /1000 ); 
context.setVariable("CDS.refreshTokenExpiresAt", refreshTokenExpiresAt.toString()); //epoch