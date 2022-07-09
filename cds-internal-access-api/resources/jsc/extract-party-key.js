// var partyKey = context.getVariable("jwt.DJ-DecodeTenxToken.claim.subject");
var partyKey = context.getVariable("request.header.Party-Key");
context.setVariable("cds.10xPartyKey", partyKey);