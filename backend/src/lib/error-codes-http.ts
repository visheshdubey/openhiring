export const HttpStatus = {
    Accepted: {
        code: 202,
        description:
            'Equivalent to HTTP status 202. Accepted indicates that the request has been accepted for further processing.',
    },
    AlreadyReported: {
        code: 208,
        description:
            'Equivalent to HTTP status 208. AlreadyReported indicates that the members of a WebDAV binding have already been enumerated in a preceding part of the multistatus response, and are not being included again.',
    },
    Ambiguous: {
        code: 300,
        description:
            'Equivalent to HTTP status 300. Ambiguous indicates that the requested information has multiple representations. The default action is to treat this status as a redirect and follow the contents of the Location header associated with this response. Ambiguous is a synonym for MultipleChoices.',
    },
    BadGateway: {
        code: 502,
        description:
            'Equivalent to HTTP status 502. BadGateway indicates that an intermediate proxy server received a bad response from another proxy or the origin server.',
    },
    BadRequest: {
        code: 400,
        description:
            'Equivalent to HTTP status 400. BadRequest indicates that the request could not be understood by the server. BadRequest is sent when no other error is applicable, or if the exact error is unknown or does not have its own error code.',
    },
    Conflict: {
        code: 409,
        description:
            'Equivalent to HTTP status 409. Conflict indicates that the request could not be carried out because of a conflict on the server.',
    },
    Continue: {
        code: 100,
        description:
            'Equivalent to HTTP status 100. Continue indicates that the client can continue with its request.',
    },
    Created: {
        code: 201,
        description:
            'Equivalent to HTTP status 201. Created indicates that the request resulted in a new resource created before the response was sent.',
    },
    EarlyHints: {
        code: 103,
        description:
            'Equivalent to HTTP status 103. EarlyHints indicates to the client that the server is likely to send a final response with the header fields included in the informational response.',
    },
    ExpectationFailed: {
        code: 417,
        description:
            'Equivalent to HTTP status 417. ExpectationFailed indicates that an expectation given in an Expect header could not be met by the server.',
    },
    FailedDependency: {
        code: 424,
        description:
            "Equivalent to HTTP status 424. FailedDependency indicates that the method couldn't be performed on the resource because the requested action depended on another action and that action failed.",
    },
    Forbidden: {
        code: 403,
        description:
            'Equivalent to HTTP status 403. Forbidden indicates that the server refuses to fulfill the request.',
    },
    Found: {
        code: 302,
        description:
            'Equivalent to HTTP status 302. Found indicates that the requested information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will use the GET method. Found is a synonym for Redirect.',
    },
    GatewayTimeout: {
        code: 504,
        description:
            'Equivalent to HTTP status 504. GatewayTimeout indicates that an intermediate proxy server timed out while waiting for a response from another proxy or the origin server.',
    },
    Gone: {
        code: 410,
        description:
            'Equivalent to HTTP status 410. Gone indicates that the requested resource is no longer available.',
    },
    HttpVersionNotSupported: {
        code: 505,
        description:
            'Equivalent to HTTP status 505. HttpVersionNotSupported indicates that the requested HTTP version is not supported by the server.',
    },
    IMUsed: {
        code: 226,
        description:
            'Equivalent to HTTP status 226. IMUsed indicates that the server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    },
    InsufficientStorage: {
        code: 507,
        description:
            'Equivalent to HTTP status 507. InsufficientStorage indicates that the server is unable to store the representation needed to complete the request.',
    },
    InternalServerError: {
        code: 500,
        description:
            'Equivalent to HTTP status 500. InternalServerError indicates that a generic error has occurred on the server.',
    },
    LengthRequired: {
        code: 411,
        description:
            'Equivalent to HTTP status 411. LengthRequired indicates that the required Content-length header is missing.',
    },
    Locked: {
        code: 423,
        description:
            'Equivalent to HTTP status 423. Locked indicates that the source or destination resource is locked.',
    },
    LoopDetected: {
        code: 508,
        description:
            "Equivalent to HTTP status 508. LoopDetected indicates that the server terminated an operation because it encountered an infinite loop while processing a WebDAV request with 'Depth: infinity'. This status code is meant for backward compatibility with clients not aware of the 208 status code AlreadyReported appearing in multistatus response bodies.",
    },
    MethodNotAllowed: {
        code: 405,
        description:
            'Equivalent to HTTP status 405. MethodNotAllowed indicates that the request method (POST or GET) is not allowed on the requested resource.',
    },
    MisdirectedRequest: {
        code: 421,
        description:
            'Equivalent to HTTP status 421. MisdirectedRequest indicates that the request was directed at a server that is not able to produce a response.',
    },
    Moved: {
        code: 301,
        description:
            'Equivalent to HTTP status 301. Moved indicates that the requested information has been moved to the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will use the GET method. Moved is a synonym for MovedPermanently.',
    },
    MovedPermanently: {
        code: 301,
        description:
            'Equivalent to HTTP status 301. MovedPermanently indicates that the requested information has been moved to the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. MovedPermanently is a synonym for Moved.',
    },
    MultipleChoices: {
        code: 300,
        description:
            'Equivalent to HTTP status 300. MultipleChoices indicates that the requested information has multiple representations. The default action is to treat this status as a redirect and follow the contents of the Location header associated with this response. MultipleChoices is a synonym for Ambiguous.',
    },
    MultiStatus: {
        code: 207,
        description:
            'Equivalent to HTTP status 207. MultiStatus indicates multiple status codes for a single response during a Web Distributed Authoring and Versioning (WebDAV) operation. The response body contains XML that describes the status codes.',
    },
    NetworkAuthenticationRequired: {
        code: 511,
        description:
            "Equivalent to HTTP status 511. NetworkAuthenticationRequired indicates that the client needs to authenticate to gain network access; it's intended for use by intercepting proxies used to control access to the network.",
    },
    NoContent: {
        code: 204,
        description:
            'Equivalent to HTTP status 204. NoContent indicates that the request has been successfully processed and that the response is intentionally blank.',
    },
    NonAuthoritativeInformation: {
        code: 203,
        description:
            'Equivalent to HTTP status 203. NonAuthoritativeInformation indicates that the returned meta information is from a cached copy instead of the origin server and therefore may be incorrect.',
    },
    NotAcceptable: {
        code: 406,
        description:
            'Equivalent to HTTP status 406. NotAcceptable indicates that the client has indicated with Accept headers that it will not accept any of the available representations of the resource.',
    },
    NotExtended: {
        code: 510,
        description:
            'Equivalent to HTTP status 510. NotExtended indicates that further extensions to the request are required for the server to fulfill it.',
    },
    NotFound: {
        code: 404,
        description:
            'Equivalent to HTTP status 404. NotFound indicates that the requested resource does not exist on the server.',
    },
    NotImplemented: {
        code: 501,
        description:
            'Equivalent to HTTP status 501. NotImplemented indicates that the server does not support the requested function.',
    },
    NotModified: {
        code: 304,
        description:
            "Equivalent to HTTP status 304. NotModified indicates that the client's cached copy is up to date. The contents of the resource are not transferred.",
    },
    OK: {
        code: 200,
        description:
            'Equivalent to HTTP status 200. OK indicates that the request succeeded and that the requested information is in the response. This is the most common status code to receive.',
    },
    PartialContent: {
        code: 206,
        description:
            'Equivalent to HTTP status 206. PartialContent indicates that the response is a partial response as requested by a GET request that includes a byte range.',
    },
    PaymentRequired: {
        code: 402,
        description: 'Equivalent to HTTP status 402. PaymentRequired is reserved for future use.',
    },
    PermanentRedirect: {
        code: 308,
        description:
            'Equivalent to HTTP status 308. PermanentRedirect indicates that the request information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will also use the POST method.',
    },
    PreconditionFailed: {
        code: 412,
        description:
            'Equivalent to HTTP status 412. PreconditionFailed indicates that a condition set for this request failed, and the request cannot be carried out. Conditions are set with conditional request headers like If-Match, If-None-Match, or If-Unmodified-Since.',
    },
    PreconditionRequired: {
        code: 428,
        description:
            'Equivalent to HTTP status 428. PreconditionRequired indicates that the server requires the request to be conditional.',
    },
    Processing: {
        code: 102,
        description:
            "Equivalent to HTTP status 102. Processing indicates that the server has accepted the complete request but hasn't completed it yet.",
    },
    ProxyAuthenticationRequired: {
        code: 407,
        description:
            'Equivalent to HTTP status 407. ProxyAuthenticationRequired indicates that the requested proxy requires authentication. The Proxy-authenticate header contains the details of how to perform the authentication.',
    },
    Redirect: {
        code: 302,
        description:
            'Equivalent to HTTP status 302. Redirect indicates that the requested information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will use the GET method. Redirect is a synonym for Found.',
    },
    RedirectKeepVerb: {
        code: 307,
        description:
            'Equivalent to HTTP status 307. RedirectKeepVerb indicates that the request information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response. When the original request method was POST, the redirected request will also use the POST method. RedirectKeepVerb is a synonym for TemporaryRedirect.',
    },
    RedirectMethod: {
        code: 303,
        description:
            'Equivalent to HTTP status 303. RedirectMethod automatically redirects the client to the URI specified in the Location header as the result of a POST. The request to the resource specified by the Location header will be made with a GET. RedirectMethod is a synonym for SeeOther.',
    },
    RequestedRangeNotSatisfiable: {
        code: 416,
        description:
            'Equivalent to HTTP status 416. RequestedRangeNotSatisfiable indicates that the range of data requested from the resource cannot be returned, either because the beginning of the range is before the beginning of the resource, or the end of the range is after the end of the resource.',
    },
    RequestEntityTooLarge: {
        code: 413,
        description:
            'Equivalent to HTTP status 413. RequestEntityTooLarge indicates that the request is too large for the server to process.',
    },
    RequestHeaderFieldsTooLarge: {
        code: 431,
        description:
            'Equivalent to HTTP status 431. RequestHeaderFieldsTooLarge indicates that the server is unwilling to process the request because its header fields (either an individual header field or all the header fields collectively) are too large.',
    },
    RequestTimeout: {
        code: 408,
        description:
            'Equivalent to HTTP status 408. RequestTimeout indicates that the client did not send a request within the time the server was expecting the request.',
    },
    RequestUriTooLong: {
        code: 414,
        description: 'Equivalent to HTTP status 414. RequestUriTooLong indicates that the URI is too long.',
    },
    ResetContent: {
        code: 205,
        description:
            'Equivalent to HTTP status 205. ResetContent indicates that the client should reset (not reload) the current resource.',
    },
    SeeOther: {
        code: 303,
        description:
            'Equivalent to HTTP status 303. SeeOther automatically redirects the client to the URI specified in the Location header as the result of a POST. The request to the resource specified by the Location header will be made with a GET. SeeOther is a synonym for RedirectMethod.',
    },
    ServiceUnavailable: {
        code: 503,
        description:
            'Equivalent to HTTP status 503. ServiceUnavailable indicates that the server is temporarily unavailable, usually due to high load or maintenance.',
    },
    SwitchingProtocols: {
        code: 101,
        description:
            'Equivalent to HTTP status 101. SwitchingProtocols indicates that the protocol version or protocol is being changed.',
    },
    TemporaryRedirect: {
        code: 307,
        description:
            'Equivalent to HTTP status 307. TemporaryRedirect indicates that the request information is located at the URI specified in the Location header. The default action when this status is received is to follow the Location header associated with the response.',
    },
    Unauthorised: {
        code: 401,
        description: 'Unauthorised Access',
    },
};