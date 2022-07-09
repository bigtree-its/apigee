
var code;
var cdsCode;
var errorMessage;
var message;
var reasonPhrase;
var path;
var id;
var faultName = context.getVariable("fault.name");
var responseCode = context.getVariable("response.status.code");
var response = context.getVariable("response");
var error_type = "target_server";
var st;
try {
    if(!responseCode && faultName){
        st = "500";
        code = "500.103.010";
        cdsCode = "AU.CDS.UnexpectedError";
        errorMessage = faultName + " from target server";
        message = "internal_server_error";
        reasonPhrase = "Internal Server Error";
        error_type = "target_server.fault";
    }else{
        try {
            var targetResponse = JSON.parse(response.content);
            st = targetResponse.Code.substr(0, 3);
            id = targetResponse.Id;
            code = targetResponse.Code;
            cdsCode = targetResponse.Errors[0].ErrorCode;
            errorMessage = targetResponse.Errors[0].Message;
            message = targetResponse.Message;
            if(targetResponse.Errors[0].Path){
                path = targetResponse.Errors[0].Path;
            }
            if(cdsCode && (responseCode === "400" || responseCode === "404" )){
                error_type = "target_server.4xx";
            }
        }        
        catch (parseError) {
            st = responseCode;
            print(parseError);
            // all services should return an error in the format according to OBIE specs
            print("error bad format from service");
            print(response);
        }
    } 
    switch (st) {
        case '400':
            reasonPhrase = "Bad Request";
            break;
        case '403':
            reasonPhrase = "Forbidden";
            break;
        case '404':
            reasonPhrase = "Not Found";
            break;
        case '500':
            reasonPhrase = "Internal Server Error";
            break;
        default:
    }
}
catch (e) {
    st = "500";
    code = "500.103.010";
    cdsCode = "AU.CDS.UnexpectedError";
    errorMessage = "Incorrect error response from target";
    message = "internal_server_error";
    reasonPhrase = "Internal Server Error";
}

context.setVariable("cdstenx.error.code", code);
context.setVariable("cdstenx.error.cdsCode", cdsCode);
context.setVariable("cdstenx.error.message", errorMessage);
context.setVariable("cdstenx.error.reason", message);
context.setVariable("cdstenx.error.reasonphrase", reasonPhrase);
context.setVariable("cdstenx.error.status", st);
context.setVariable("cdstenx.error.id", id);
context.setVariable("cdstenx.error.path", path);
context.setVariable("cdstenx.error.errorType", error_type);
