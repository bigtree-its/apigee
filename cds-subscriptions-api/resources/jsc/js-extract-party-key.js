var partyKey = context.getVariable("jwt.DJ-DecodeTenxToken.claim.subject");
context.setVariable("subscriptions-api.partyKey", partyKey);