//Create an array of IPs allowed to validate the request IP
//Supporting Functions
function IPnumber(IPaddress) {
  var ip = IPaddress.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (ip) {
    return (+ip[1] << 24) + (+ip[2] << 16) + (+ip[3] << 8) + (+ip[4]);
  }
  return null;
}

function IPmask(maskSize) {
  return -1 << (32 - maskSize)
}

function checkValidity(incomingRequestIp, allowedRange) {
  var result = false;
  for (var ipRange in allowedRange) {
    var rangeComponents = allowedRange[ipRange].split("/");
    if (((IPnumber(rangeComponents[0]) & IPmask(rangeComponents[1])) == (IPnumber(incomingRequestIp) & IPmask(rangeComponents[1])))) {
      result = true;
      break;
    }

  }
  return result;
}

var allowedIPList = context.getVariable("allowed_ip_list");
if (allowedIPList !== null && allowedIPList !== undefined && allowedIPList !== '') {
  var allowedIPsRange = context.getVariable("allowed_ip_list").split(',');
  var requestIp = context.getVariable("client.ip");
  var ipIsValid = checkValidity(requestIp, allowedIPsRange);
  context.setVariable("ipIsValid", ipIsValid);
}
