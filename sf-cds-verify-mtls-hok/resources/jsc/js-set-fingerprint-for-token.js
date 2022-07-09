// Support cerificate binding instead of rfc8471 as is draft and is difficult to implement. 
// Other OIDC providers dont use rfc8471, certificate binding is fine.

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var certInfo = context.getVariable("tlsCertInfo"),
    errorType = "bad_cert",
    certInfoJson;

try {
    certInfoJson = JSON.parse(certInfo);

    if (isJsonString(certInfo)) {
        if (certInfoJson.certInfo.fingerprintSha1) {
            context.setVariable("certFingerprint", certInfoJson.certInfo.fingerprintSha1);
        }
        else {
            context.setVariable("cds.error.type", errorType);
            context.setVariable("cds.error.message", "Cert is missing JSON fingerprintSha1");
        }
    } 
    else {
        context.setVariable("cds.error.type", errorType);
        context.setVariable("cds.error.message", "Cert is missing JSON cert info");
    } 
}
catch (e) {
    context.setVariable("cds.error.type", errorType);
    context.setVariable("cds.error.message", "Cert is missing good JSON cert info");
}