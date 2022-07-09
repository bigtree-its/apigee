var expMinutes = 10;
var expiresAtMillis = new Date(Date.now() + (expMinutes * 60 * 1000)); 
var expiresAtSecs = Math.floor( (expiresAtMillis) / 1000);
var issAt = context.getVariable("system.timestamp") / 1000;

context.setVariable("jarmJWT.exp", expiresAtSecs);
context.setVariable("jarmJWT.iat", issAt);