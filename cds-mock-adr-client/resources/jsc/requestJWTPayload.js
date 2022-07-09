var issuer = context.getVariable("request.queryparam.client_id");
 var subject = context.getVariable("request.queryparam.client_id");
 var aud = context.getVariable("audVar");
 var additionalClaimsVar = context.getVariable("additionalClaimsVar");
 var expMinutes = 30;
 var expiresAtMillis = new Date(Date.now() + (expMinutes * 60 * 1000)); 
 var expiresAtSecs = Math.floor( (expiresAtMillis) / 1000);

 var requestJWTPayload = {
     "iss": issuer,
     "sub": subject,
     "aud": aud,
     "exp": expiresAtSecs
 };

 if (context.getVariable("request.queryparam.jti") == "true") {
     requestJWTPayload.jti = context.getVariable("newUUID");
 }

 var mergedObject = Object.assign(requestJWTPayload, JSON.parse(additionalClaimsVar));

 context.setVariable("requestJwtPayload", JSON.stringify(mergedObject));