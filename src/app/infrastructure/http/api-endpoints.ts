export class ApiEndpoints {
    private static readonly BASE_URL = "https://localhost:7231"

    static readonly REFRESH_TOKEN = `${ApiEndpoints.BASE_URL}/api/RegisterLogin/refreshToken`;
    static readonly LOGIN = `${ApiEndpoints.BASE_URL}/api/RegisterLogin/login`;
    static readonly REGISTER = `${ApiEndpoints.BASE_URL}/api/RegisterLogin/registerNewUser`;
    static readonly IS_LOGIN_AVAILABLE = `${ApiEndpoints.BASE_URL}/api/RegisterLogin/isLoginAvailable`;
    static readonly AUTHORIZED_REQUEST = `${ApiEndpoints.BASE_URL}/api/UserPanel/authorizedRequest`;
    static readonly LOGOUT = `${ApiEndpoints.BASE_URL}/api/RegisterLogin/logout`;
  }