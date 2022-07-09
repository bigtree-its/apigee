var subscriptionsResponse = JSON.parse(context.getVariable("response.content"));

var response = {};
response.subscriptions = [];
/*jslint plusplus: true */
var i;
for (i = 0; i < subscriptionsResponse.length; i++) {
    response.subscriptions[i] = subscriptionsResponse[i];
}

context.setVariable('response.content', JSON.stringify(response));