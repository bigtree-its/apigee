
const developerDetailsJson = JSON.parse(context.getVariable("cds.developerDetails"));
const developerEmail = developerDetailsJson.Developer.Email;
const appName = context.getVariable("appName");
const orgName = context.getVariable("environment.orgname"); 
// <URL>https://api.enterprise.apigee.com/v1/organizations/{organization.name}/developers/{developer.email}/apps/{appName}</URL>

var targetUrl = "https:\/\/api.enterprise.apigee.com\/v1\/organizations\/" + orgName + "\/developers\/"+ developerEmail +"\/apps\/" + appName;

context.setVariable("request.verb", "DELETE");
context.setVariable("target.url", targetUrl);