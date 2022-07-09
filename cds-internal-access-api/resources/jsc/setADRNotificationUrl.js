var adrNotificationUrl = context.getVariable('adrNotificationUrl');
context.setVariable("request.header.Content-Type", "application\/x-www-form-urlencoded");
context.setVariable("request.verb", "POST");
context.setVariable("target.url", adrNotificationUrl);