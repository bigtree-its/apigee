

try {
    // https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter
    var userinfoResponse = {
        "sub": context.getVariable("accesstoken.customerPPId"),
    };

    var userinfo = context.getVariable("accesstoken.userinfo");
    var userInfoJson = JSON.parse(userinfo);
    // check to see what has been an essential claim or null and then return it from userinfo service response
    
    for (var key in userInfoJson) {
        
        if (userInfoJson.hasOwnProperty(key)) {
            var obj = userInfoJson[key];
            
            if (key.toLowerCase() === "name") {
                if (obj === null || obj.essential === true) {
                    userinfoResponse.name = context.getVariable("userinfoservice.name");
                }
            }
            if (key.toLowerCase() === "given_name") {
                if (obj === null || obj.essential === true) {
                    userinfoResponse.given_name = context.getVariable("userinfoservice.given_name");
                }
            }
            if (key.toLowerCase() === "family_name") {
                if (obj === null || obj.essential === true) {
                    userinfoResponse.family_name = context.getVariable("userinfoservice.family_name");
                }
            }
            if (key.toLowerCase() === "updated_at") {
                if (obj === null || obj.essential === true) {
                    userinfoResponse.updated_at = context.getVariable("userinfoservice.updated_at");
                }
            }
        }
    }

    //context.setVariable("response.content",JSON.stringify(userinfoResponse));
    context.setVariable("userinfoResponseFiltered", JSON.stringify(userinfoResponse));
    
}
catch (e) {
    print(e);
    throw e;
}