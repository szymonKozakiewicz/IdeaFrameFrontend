export class ApiEndpoints {
    private static readonly BASE_URL = "https://localhost:7231"

    static readonly REFRESH_TOKEN = `${ApiEndpoints.BASE_URL}/api/Login/refreshToken`;
    static readonly LOGIN = `${ApiEndpoints.BASE_URL}/api/Login/login`;
    static readonly REGISTER = `${ApiEndpoints.BASE_URL}/api/Register/registerNewUser`;
    static readonly IS_LOGIN_AVAILABLE = `${ApiEndpoints.BASE_URL}/api/Register/isLoginAvailable`;
    static readonly AUTHORIZED_REQUEST = `${ApiEndpoints.BASE_URL}/api/UserPanel/authorizedRequest`;
    static readonly LOGOUT = `${ApiEndpoints.BASE_URL}/api/Login/logout`;
    static readonly ADD_NEW_FILE_ITEM=`${ApiEndpoints.BASE_URL}/api/Directory/addNewFileItem`;
    static readonly EDIT_FILE_ITEM=`${ApiEndpoints.BASE_URL}/api/Directory/editFileItemName`;
    static readonly IS_FILENAME_AVAILABLE=`${ApiEndpoints.BASE_URL}/api/Directory/isFileItemNameAvailable`;
    static readonly GET_ALL_FILEITEM=`${ApiEndpoints.BASE_URL}/api/Directory/getAllFoldersFromPath`;  
    static readonly REMOVE_FILEITEM=`${ApiEndpoints.BASE_URL}/api/Directory/removeFileItem`;  
    static readonly MOVE_FILEITEM=`${ApiEndpoints.BASE_URL}/api/Directory/moveFileItem`; 
    static readonly SAVE_MINDMAP=`${ApiEndpoints.BASE_URL}/api/MindMap/saveMindMap`;
    static readonly LOAD_MINDMAP=`${ApiEndpoints.BASE_URL}/api/MindMap/loadMindMap`;
  }