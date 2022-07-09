// 10x ADR service JWT requires a key:value object array format

try {
    var subscriptions = [];
    var subscriptionsFormatedArray = [];

    const subscriptionsFromIssueToken = context.getVariable("oauthv2authcode.OAInfo-RetrieveOIDCAuthCode.customerAccounts");
    const subscriptionsFromRefreshToken = context.getVariable("oauthv2refreshtoken.OAInfo-RetrieveRefreshTokenDetails.accesstoken.customerAccounts");

    if (subscriptionsFromIssueToken) {
        subscriptions = JSON.parse(subscriptionsFromIssueToken);
    }
    if (subscriptionsFromRefreshToken) {
        subscriptions = JSON.parse(subscriptionsFromRefreshToken);
    }

    for (var i=0; i < subscriptions.length; i++) {
        if (subscriptions[i]) {
            subscriptionsFormatedArray.push({key: subscriptions[i]});
        }
    }

    context.setVariable("subscriptionsFormatedArray", JSON.stringify(subscriptionsFormatedArray));
}
catch (e) {
    print(e);
    throw e;
}