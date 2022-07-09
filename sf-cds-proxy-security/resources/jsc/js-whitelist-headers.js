var whitelistHeaders = context.getVariable("whitelist-headers").toLowerCase().split(',');
//create array of headers came in request but not present in whitelist
var requestHeaders = String(context.getVariable("request.headers.names")).slice(1,-1).split(', ');
function doesContain(item) {
  return whitelistHeaders.indexOf(item.toLowerCase()) == -1;
}
var headersToRemove = requestHeaders.filter(doesContain);
//remove all the headers not present in whitelist
headersToRemove.forEach(function (item) {
  context.removeVariable("request.header." + item);
});