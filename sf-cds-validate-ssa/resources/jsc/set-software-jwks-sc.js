var targetUrl = context.getVariable("softwareJwksUri");
var re = new RegExp('^(https?://[^/]+)(/.*)$');
var match = re.exec(targetUrl);
if (match) {
  context.setVariable('servicecallout.SC-SoftwareJwks.target.url', match[1]);
  context.setVariable('softwareJwksUriPath', match[2]);
}