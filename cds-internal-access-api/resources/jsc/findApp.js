function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
}

const cascadeBool = (context.getVariable("request.queryparam.cascade")) ? context.getVariable("request.queryparam.cascade") : "true";
const softwareIdToFind = context.getVariable("request.queryparam.softwareProductId");

if (softwareIdToFind) {
    // convert software_id to apigee internal app id
    const envName = context.getVariable("environment.name"); 	
    var appId = "";
    var consumerKey="";
    var appName = "";
    try {
        var orgApps = JSON.parse(context.getVariable("approvedOrganisationApps.content"));
        for (var i = 0; i < orgApps.app.length; i++) { 
            var registrationInfo = search("RegistrationInfo", orgApps.app[i].attributes);
            if (registrationInfo) {
                try {
                    var registrationInfoJson = JSON.parse(registrationInfo.value);
                    if (registrationInfoJson.software_id) {
                        if (registrationInfoJson.software_id === softwareIdToFind) {
                            if (orgApps.app[i].credentials[0].apiProducts[0].apiproduct.toLowerCase().startsWith(envName.toLowerCase())) {
                                appId = orgApps.app[i].appId;
                                consumerKey = orgApps.app[i].credentials[0].consumerKey;
                                appName = orgApps.app[i].name;
                                break;
                            }
                        }
                    }
                }
                catch(ex) {
                    // do nothing, if registrationInfo parse fails then it was a corrupt testing app
                    // payload is large from fetching many org admins so consider optimizing
                    print(ex);
                }
            }
        }
    }
    catch (e) {
        print(e);
        throw e;
    }
}

// Set all values to Context
context.setVariable("theClientId", consumerKey);
context.setVariable("appId", appId);
context.setVariable("appName", appName);
context.setVariable("cascadeBool", cascadeBool);