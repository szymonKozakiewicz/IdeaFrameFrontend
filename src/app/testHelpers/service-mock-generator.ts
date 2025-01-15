import { Subject } from "rxjs";
import { OperationStatus } from "../core/enum/operation.status";
import { RegisterService } from "../core/services/register.service";
import { CustomHttpClient } from "../infrastructure/http/custom-http-client";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "../core/services/login.service";
import { UserPanelService } from "../core/services/user-panel.service";
import { AuthorisationService } from "../core/services/authorisation.service";

export function getRegisterServiceMock() {
    let registerSubjectForMock = new Subject<OperationStatus>();
    const registerServiceMock: Pick<RegisterService, keyof RegisterService> = {
      registerState$: registerSubjectForMock,
      register: jasmine.createSpy('register'),
      isLoginAvailable: jasmine.createSpy('isLoginAvailable'),
    };
    return registerServiceMock;
  }

  export function getLoginServiceMock() {
    let registerSubjectForMock = new Subject<boolean>();
    const loginServiceMock: Pick<LoginService, keyof LoginService> = {
      loginState$: registerSubjectForMock,
      login: jasmine.createSpy('login'),
      logout: jasmine.createSpy('logout'),
      removeTokenFromLocalStorage: jasmine.createSpy('removeTokenFromLocalStorage'),
      updateJwtTokenAfterRefresh: jasmine.createSpy('updateJwtTokenAfterRefresh')
    };
    return loginServiceMock;
  }


  export function getHttpClientMock() {

    const customHttpClientMock: Pick<CustomHttpClient, keyof CustomHttpClient> = {
        getWithQuery:jasmine.createSpy("getWithQuery"),
        get:jasmine.createSpy("get"),
        post:jasmine.createSpy("post"),
        postEmpty:jasmine.createSpy("postEmpty"),
    };
    return customHttpClientMock as CustomHttpClient;
  }

  export function getUserPanelServiceMock() {

    const userPanelServiceMock: Pick<UserPanelService, keyof UserPanelService> = {
        sendAuthorizedRequest:jasmine.createSpy("sendAuthorizedRequest"),
    };
    return userPanelServiceMock as UserPanelService;
  }

  export function getAuthorisationServiceMock() {

    const authorisationServiceMock: Pick<AuthorisationService, keyof AuthorisationService> = {
      isLoggedIn:jasmine.createSpy("isLoggedIn"),
      IsAuthorizationRequiredForUrl:jasmine.createSpy("IsAuthorizationRequiredForUrl"),
      GetAcessToken:jasmine.createSpy("GetAcessToken")
    };
    return authorisationServiceMock as AuthorisationService;
  }



 