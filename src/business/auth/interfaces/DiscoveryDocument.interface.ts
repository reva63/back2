// OpenID Connect discovery document interface
// https://identity.rsv.ru/.well-known/openid-configuration

export interface IDiscoveryDocument {
    issuer: string;
    authorization_endpoint: string;
    token_endpoint: string;
    userinfo_endpoint: string;
    end_session_endpoint?: string;
    revocation_endpoint?: string;

    scopes_supported?: string[];
    claims_supported?: string[];
    grant_types_supported: string[];
    response_types_supported: string[];
    response_modes_supported?: string[];
    code_challenge_methods_supported?: string[];

    jwks_uri?: string;
    check_session_iframe?: string;
    introspection_endpoint?: string;
    device_authorization_endpoint?: string;
    frontchannel_logout_supported?: boolean;
    frontchannel_logout_session_supported?: boolean;
    backchannel_logout_supported?: boolean;
    backchannel_logout_session_supported?: boolean;
    token_endpoint_auth_methods_supported?: string[];
    token_endpoint_auth_signing_alg_values_supported?: string[];
    subject_types_supported?: string[];
    request_parameter_supported?: boolean;
}
