var orgName = context.getVariable("environment.orgname"); 	
var targetUrl = "https:\/\/api.enterprise.apigee.com\/v1\/organizations\/" + orgName + "\/apps";

var re = new RegExp('^(https?://[^/]+)(/.*)$');
var match = re.exec(targetUrl);
if (match) {
    context.setVariable('servicecallout.SC-ApprovedOrganisationApps.target.url', match[1]);
    context.setVariable('sc_urlPath', match[2]);
}