var errorType = context.getVariable("cdstenx.error.type");
var faultName = context.getVariable("fault.name");
var responseContent = context.getVariable("response.content");
var errorResolved = false;
var responseError;

function isEmpty(data) {
    if (data === null || data === undefined || data === '') {
        return true;
    }
    return false;
}

// If Target Returns an ErrorResponse With Ref then extract that
if (!isEmpty(responseContent)) {
    var jsonResponse = JSON.parse(responseContent);
    if (!isEmpty(jsonResponse.ref)) {
        context.setVariable("cdstenx.error.ref", jsonResponse.ref);
    } else if (jsonResponse.error == "DISALLOWED_BY_POLICY") {
        errorType = "disallowed_by_opa_policy";
    }

}

var theError;
if (!isEmpty(errorType)) {
    theError = errorType;
} else if (!isEmpty(faultName)) {
    theError = faultName;
}
switch (theError) {
    case 'access_token_expired':
    case 'access_token_not_approved':
    case 'InvalidAccessToken':
    case 'invalid_access_token':
    case 'invalid_client':
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.code", "401.000.22");
        context.setVariable("cdstenx.error.message", "Verify access token again");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        errorResolved = true;
        break;
    case 'FailedToResolveAPIKey':
    case 'InvalidApiKey':
    case 'InvalidApiKeyForGivenResource':
    case 'InvalidAPICallAsNoApiProductMatchFound':
    case 'InvalidApiKeyForGivenResource':
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.code", "401.000.11");
        context.setVariable("cdstenx.error.message", "Invalid api key supplied");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        errorResolved = true;
        break;
    case 'resource_not_found':
        context.setVariable("cdstenx.error.status", "404");
        context.setVariable("cdstenx.error.code", "404.001.001");
        context.setVariable("cdstenx.error.message", "The requested resource URL is not an API endpoint");
        context.setVariable("cdstenx.error.reasonphrase", "Resource Not Found");
        errorResolved = true;
        break;
    case 'forbidden':
        context.setVariable("cdstenx.error.status", "403");
        context.setVariable("cdstenx.error.code", "403.001.001");
        context.setVariable("cdstenx.error.message", "Access to this resource is denied");
        context.setVariable("cdstenx.error.reasonphrase", "Forbidden");
        errorResolved = true;
        break;
    case 'disallowed_by_opa_policy':
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.message", "Request disallowed by policy");
        context.setVariable("cdstenx.error.code", "401.000.44");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        errorResolved = true;
        break;
    case 'tenx_token_missing_from_cache':
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.message", "Verify access token again");
        context.setVariable("cdstenx.error.code", "401.000.22");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        errorResolved = true;
        break;
    case 'forgerock_policy_validation_failed':
        context.setVariable("cdstenx.error.status", "403");
        context.setVariable("cdstenx.error.message", "Forbidden. Access to this resource is denied");
        context.setVariable("cdstenx.error.code", "403.000.66");
        context.setVariable("cdstenx.error.reasonphrase", "Forbidden");
        errorResolved = true;
        break;
    case 'failed_to_decode_tenx_token':
        context.setVariable("cdstenx.error.status", "500");
        context.setVariable("cdstenx.error.code", "500.038.01");
        context.setVariable("cdstenx.error.message", "Failed to process TenxToken. Please try again later");
        context.setVariable("cdstenx.error.reasonphrase", "Internal server error");
        errorResolved = true;
        break;
    case 'IPDeniedAccess':
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.code", "400.000.44");
        context.setVariable("cdstenx.error.message", "Access Denied for client ip");
        context.setVariable("cdstenx.error.reasonphrase", "IPDeniedAccess");
        errorResolved = true;
        break;
    case 'RegularExpressionThreatExpectionTriggered':
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.code", "400.000.66");
        context.setVariable("cdstenx.error.message", "Regular Expression Threat Protection Triggered");
        context.setVariable("cdstenx.error.reasonphrase", "RegularExpressionThreatExpectionTriggered");
        errorResolved = true;
        break;
    default:
        context.setVariable("cdstenx.error.status", "500");
        context.setVariable("cdstenx.error.code", "500.001.001");
        context.setVariable("cdstenx.error.message", "Something went wrong while processing your request. Please try again later");
        context.setVariable("cdstenx.error.reasonphrase", "Internal server error");
}