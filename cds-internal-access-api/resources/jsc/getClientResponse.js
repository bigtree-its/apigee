function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].Name === nameKey) {
            return myArray[i];
        }
    }
}

var payload = {
};

try {
    var appDetails = JSON.parse(context.getVariable("cds.appDetails"));
    if (appDetails && appDetails.App && appDetails.App.name) {
        var registrationInfo = "";
        var registrationInfo = search("RegistrationInfo", appDetails.App.Attributes.Attribute).Value;
        var registrationInfoJson = JSON.parse(registrationInfo);
        payload = {
            clientId: appDetails.App.Credentials.Credential.ConsumerKey,
            clientIdIssuedAt: appDetails.App.Credentials.Credential.IssuedAt,
            clientName: registrationInfoJson.client_name,
            clientDescription: registrationInfoJson.client_description,
            clientUri: registrationInfoJson.recipient_base_uri,
            legalEntityId: registrationInfoJson.org_id,
            legalEntityName: registrationInfoJson.org_name,
            orgId: registrationInfoJson.org_id,
            orgName: registrationInfoJson.org_name,
            logoUri: registrationInfoJson.logo_uri,
            tosUri: registrationInfoJson.tos_uri,
            policyUri: registrationInfoJson.policy_uri,
            softwareId: registrationInfoJson.software_id
        };
    }
    else {
        throw new Error("No company details");
    }

    context.setVariable("response.status.code", 200);
    context.setVariable("response.reason.phrase", "OK");
    context.setVariable("response.header.content-type", "application/json");
    context.setVariable("response.content", JSON.stringify(payload));
}
catch (e) {
    print(e);
    throw e;
}