function isValidObject(object){
    if ( object === null || object === undefined){
        return false;
    }
    return true;
}
try {
    var brandId = (context.getVariable("CDS.brandId")) ? context.getVariable("CDS.brandId") : "PARSIFAL";
    const apiHost = "https://" + context.getVariable("CDS.apiHostname");
    const apiHostOpen = "https://" + context.getVariable("CDS.apiHostnameOpen");
    var requirePAR = context.getVariable("CDS.requirePAR");
    if (! isValidObject(requirePAR)){
        requirePAR = false;
    }
    var targetResponse = {
        "issuer": apiHostOpen,
        "authorization_endpoint": apiHostOpen + "/authorise",
        "token_endpoint": apiHost + "/token",
        "introspection_endpoint": apiHost + "/token/introspect",
        "revocation_endpoint": apiHost + "/token/revoke",
        "userinfo_endpoint": apiHost + "/userinfo",
        "registration_endpoint": apiHost + "/register",
        "jwks_uri": apiHostOpen + "/jwks",
        "cdr_arrangement_revocation_endpoint": apiHost + "/arrangements/revoke",
        "pushed_authorization_request_endpoint": apiHost + "/par",
        "require_pushed_authorization_requests": requirePAR,
        "code_challenge_methods_supported": ["S256"],
        "authorization_signed_response_alg": "PS256",
        "scopes_supported": [
            "openid", 
            "profile",
            "cdr:registration",
            "bank:accounts.basic:read",
            "bank:accounts.detail:read",
            "bank:transactions:read",
            "bank:payees:read",
            "bank:regular_payments:read",
            "common:customer.basic:read",
            "common:customer.detail:read",
            "admin:metrics.basic:read",
            "admin:metadata:update",
        ],
        "response_types_supported": ["code id_token"],
        "response_modes_supported": ["fragment"],
        "grant_types_supported": ["authorization_code", "refresh_token", "client_credentials"],
        "acr_values_supported": ["urn:cds.au:cdr:2","urn:cds.au:cdr:3"],
        "subject_types_supported": ["pairwise"],
        "id_token_signing_alg_values_supported": ["PS256"],
        "id_token_encryption_alg_values_supported": [ "RSA-OAEP", "RSA-OAEP-256" ],
        "id_token_encryption_enc_values_supported": [ "A256GCM" ],
        "request_object_signing_alg_values_supported": ["PS256"],
        "token_endpoint_auth_methods_supported": ["private_key_jwt"],
        "token_endpoint_auth_signing_alg_values_supported": ["PS256"],
        "tls_client_certificate_bound_access_tokens": true,
        "claims_supported": ["name", "given_name", "family_name", "acr", "auth_time", "sub", "refresh_token_expires_at", "sharing_expires_at", "updated_at"]
    };
    
    context.setVariable("response.content", JSON.stringify(targetResponse));
    context.setVariable("response.header.Content-Type", "application/json");
    context.setVariable("response.status.code", 200);
    context.setVariable("response.header.x-brand-id", brandId);

}
catch (e) {
    print(e);
    throw e;
}


