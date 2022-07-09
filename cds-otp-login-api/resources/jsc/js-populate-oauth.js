context.setVariable("oauth_external_authorization_status", true);
context.setVariable("request.formparam.client_id", context.getVariable("apigee.client_id"));
context.setVariable("grantType", "client_credentials");

var jsonResponseContent = JSON.parse(context.getVariable("response.content"));
context.setVariable("cds_otp_login.tenxToken", jsonResponseContent.tenxToken);
context.setVariable("cds_otp_login.forgerockAccessToken", jsonResponseContent.accessToken);
context.setVariable("cds_otp_login.forgerockAccessTokenExpiryTimeInMs", jsonResponseContent.expiresIn + "000"); //to be in milliseconds
context.setVariable("cds_otp_login.forgerockAccessTokenExpiryTimeInSec", jsonResponseContent.expiresIn);
context.setVariable("cds_otp_login.scope", jsonResponseContent.scope);
