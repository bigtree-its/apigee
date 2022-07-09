var errorType = context.getVariable("cdstenx.error.type");
var errorField = context.getVariable("cdstenx.error.field");
var faultName = context.getVariable("fault.name");


function isEmpty(data) {
    if (data === null || data === undefined || data === '') {
        return true;
    }
    return false;
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
    case 'FailedToResolveAPIKey':
    case 'InvalidApiKey':
    case 'InvalidAccessToken':
    case 'invalid_access_token':
    case 'invalid_client':
    case 'InvalidApiKeyForGivenResource':
    case 'InvalidAPICallAsNoApiProductMatchFound':
    case 'InvalidApiKeyForGivenResource':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Authorisation/AccessDenied");
        context.setVariable("cdstenx.error.title", "Access Denied");
        context.setVariable("cdstenx.error.detail", "The request lacks valid authentication credentials");
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        break;
    case 'InsufficientScope':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Authorisation/InvalidConsent");
        context.setVariable("cdstenx.error.title", "Consent Is Invalid");
        context.setVariable("cdstenx.error.detail", "Authorisation Scope");
        context.setVariable("cdstenx.error.status", "403");
        context.setVariable("cdstenx.error.reasonphrase", "Forbidden");
        break;
    case 'mtls_certificate_error':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Authorisation/AccessDenied");
        context.setVariable("cdstenx.error.title", "Access Denied");
        context.setVariable("cdstenx.error.detail", "Bad client certificate");
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        break;
    case 'mtls_certificate_fingerprint':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Authorisation/AccessDenied");
        context.setVariable("cdstenx.error.title", "Access Denied");
        context.setVariable("cdstenx.error.detail", "Invalid Token. Client certificate does not match");
        context.setVariable("cdstenx.error.status", "401");
        context.setVariable("cdstenx.error.reasonphrase", "Unauthorized");
        break;
    case 'IPDeniedAccess':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Authorisation/AccessDenied");
        context.setVariable("cdstenx.error.title", "Forbidden Access");
        context.setVariable("cdstenx.error.detail", "Access Denied for client ip");
        context.setVariable("cdstenx.error.status", "403");
        context.setVariable("cdstenx.error.reasonphrase", "Forbidden");
        break;
    case 'ratelimit':
        var retrySeconds = context.getVariable("retry.seconds");
        var message = "Retry after " + retrySeconds + " seconds";
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Unexpected");
        context.setVariable("cdstenx.error.title", "API Traffic Limits");
        context.setVariable("cdstenx.error.detail", message);
        context.setVariable("cdstenx.error.status", "429");
        context.setVariable("cdstenx.error.reasonphrase", "Too many requests");
        context.setVariable("response.header.Retry-After", retrySeconds);
        break;
    case 'quota_exceeded':
        var retrySeconds = context.getVariable("retry.seconds");
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Unexpected");
        context.setVariable("cdstenx.error.title", "API Traffic Limits");
        context.setVariable("cdstenx.error.detail", "Unattended sessions can issue a maximum of 100 calls");
        context.setVariable("cdstenx.error.status", "429");
        context.setVariable("cdstenx.error.reasonphrase", "Too many requests");
        context.setVariable("response.header.Retry-After", retrySeconds);
        break;
    case 'resource_not_found':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Resource/NotFound");
        context.setVariable("cdstenx.error.title", "Resource Not Found");
        context.setVariable("cdstenx.error.detail", "The requested resource URL is not an API endpoint defined by the Consumer Data Standards and it is not a URL recognised by the Data Holder or Data Recipient");
        context.setVariable("cdstenx.error.status", "404");
        context.setVariable("cdstenx.error.reasonphrase", "Resource Not Found");
        break;
    case 'missing_required_field':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Field/Missing");
        context.setVariable("cdstenx.error.title", "The request is missing a mandatory field required for the API");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'missing_required_header':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Header/Missing");
        context.setVariable("cdstenx.error.title", "A required HTTP header has not been provided");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'invalid_field':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Field/Invalid");
        context.setVariable("cdstenx.error.title", "Invalid Field");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'invalid_header':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Header/Invalid");
        context.setVariable("cdstenx.error.title", "Invalid Header");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'invalid_version':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Header/InvalidVersion");
        context.setVariable("cdstenx.error.title", "Invalid Header");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'unsupported_version':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Header/UnsupportedVersion");
        context.setVariable("cdstenx.error.title", "Unsupported Version");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "406");
        context.setVariable("cdstenx.error.reasonphrase", "Not Acceptable");
        break;
    case 'invalid_date':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Field/InvalidDateTime");
        context.setVariable("cdstenx.error.title", "Invalid Date");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'method_not_allowed':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/MethodNotAllowed");
        context.setVariable("cdstenx.error.title", "This method is not allowed");
        context.setVariable("cdstenx.error.detail", "This method is not allowed");
        context.setVariable("cdstenx.error.status", "405");
        context.setVariable("cdstenx.error.reasonphrase", "Method Not Allowed");
        break;
    case 'forbidden':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:Authorisation/InvalidConsent");
        context.setVariable("cdstenx.error.title", "Forbidden");
        context.setVariable("cdstenx.error.detail", "The request lacks valid permission");
        context.setVariable("cdstenx.error.status", "403");
        context.setVariable("cdstenx.error.reasonphrase", "Forbidden");
        break;
    case 'not_acceptable':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Expected");
        context.setVariable("cdstenx.error.status", "406");
        context.setVariable("cdstenx.error.title", "Media Type Not Acceptable");
        context.setVariable("cdstenx.error.detail", "Accept header is unacceptable");
        context.setVariable("cdstenx.error.reasonphrase", "Not Acceptable");
        break;
    case 'unsupported_media_type':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Expected");
        context.setVariable("cdstenx.error.status", "415");
        context.setVariable("cdstenx.error.title", "Unsupported Media Type");
        context.setVariable("cdstenx.error.detail", "Content-type Header must be application/json");
        context.setVariable("cdstenx.error.reasonphrase", "Unsupported Media Type");
        break;
    case 'unprocessable_entity':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Expected");
        context.setVariable("cdstenx.error.status", "422");
        context.setVariable("cdstenx.error.title", "Unprocessable Entity");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.reasonphrase", "Unprocessable Entity");
        break;
    case 'invalid_client_metadata':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/BadRequest");
        context.setVariable("cdstenx.error.status", "400");
        context.setVariable("cdstenx.error.title", "Invalid Client Metadata");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.reasonphrase", "Bad Request");
        break;
    case 'internal_server_error':
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Unexpected");
        context.setVariable("cdstenx.error.status", "500");
        context.setVariable("cdstenx.error.title", "Unexpected Error Encountered");
        context.setVariable("cdstenx.error.detail", errorField);
        context.setVariable("cdstenx.error.reasonphrase", "Internal Server Error");
        break;
    default:
        context.setVariable("cdstenx.error.code", "urn:au-cds:error:cds-all:GeneralError/Unexpected");
        context.setVariable("cdstenx.error.status", "500");
        context.setVariable("cdstenx.error.title", "Unexpected Error Encountered");
        context.setVariable("cdstenx.error.detail", "Unexpected Error Encountered - Please try again later");
        context.setVariable("cdstenx.error.reasonphrase", "Internal Server Error");
}