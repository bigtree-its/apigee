
// 60 % chance of response shwoing failed
var chance = Math.random() * 100;
if (chance <= 60) { // 0-60 
    var errorResponse = {
        "errors": [{
            "code": "422",
            "title": "Unprocessable Entity",
            "detail": "Invalid CDR Arrangement Id or not active or not associated with client_id or customer"
        }]
    };
    context.setVariable("response.content", JSON.stringify(errorResponse));
    context.setVariable("response.header.Content-Type", "application/json");
    context.setVariable("response.status.code", 422);
}
else { // 40
    context.setVariable("response.content", "");
    context.setVariable("response.status.code", 204);
}
context.setVariable("response.header.x-chance", chance);