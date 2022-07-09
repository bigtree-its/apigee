const orgName = context.getVariable("environment.orgname"); 
const appId = context.getVariable("appId");

var targetUrl = "https:\/\/api.enterprise.apigee.com\/v1\/organizations\/" + orgName + "\/oauth2\/revoke";

const endUser = context.getVariable("request.queryparam.dataRecipientId");
const softwareIdToFind = context.getVariable("request.queryparam.softwareProductId");

if ( softwareIdToFind){
    targetUrl += "?cascade=false&app=" + appId; // softwareProductId
}else{
    targetUrl += "?cascade=false&enduser=" + endUser; // dataRecipientId
}

context.setVariable("request.header.Content-Type", "application\/x-www-form-urlencoded;charset=utf-8");
context.setVariable("request.verb", "POST");
context.setVariable("target.url", targetUrl);
