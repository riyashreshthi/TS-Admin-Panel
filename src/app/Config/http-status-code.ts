export class HttpStatusCodes {

    public static readonly SUCCESS = 200;
    public static readonly CREATED = 201;
    public static readonly ACCEPTED = 202;


    public static readonly FORBIDDEN = 403;
    public static readonly BAD_REQUEST = 400;
    public static readonly UNAUTHORIZED = 401;
    public static readonly NOT_FOUND = 404;
    public static readonly METHOD_NOT_ALLOWED = 405;
    public static readonly REQUEST_TIME_OUT = 408;


    public static readonly INTERNAL_SERVER_ERROR = 500;
    public static readonly NOT_IMPLEMENTED = 501;
    public static readonly BAD_GATEWAY = 502;
    public static readonly SERVICE_UNAVAILABLE = 503;
    public static readonly GATEWAY_TIMEOUT = 504;

    public static readonly REFRESH_PAGE_ON_TOAST_CLICK_MESSAGE: string = 'An error occurred: Please click this message to refresh';
    public static readonly DEFAULT_ERROR_TITLE: string = 'Something went wrong';
}