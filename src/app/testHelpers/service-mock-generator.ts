import { Subject } from "rxjs";
import { OperationStatus } from "../core/enum/operation.status";
import { RegisterService } from "../core/services/register.service";
import { CustomHttpClient } from "../infrastructure/http/custom-http-client";
import { HttpClient } from "@angular/common/http";

export function getRegisterServiceMock() {
    let registerSubjectForMock = new Subject<OperationStatus>();
    const registerServiceMock: Pick<RegisterService, keyof RegisterService> = {
      registerState$: registerSubjectForMock,
      register: jasmine.createSpy('register'),
      isLoginAvailable: jasmine.createSpy('isLoginAvailable'),
    };
    return registerServiceMock;
  }


  export function getHttpClientMock() {

    const registerServiceMock: Pick<CustomHttpClient, keyof CustomHttpClient> = {
        getWithQuery:jasmine.createSpy("getWithQuery"),
        get:jasmine.createSpy("get"),
        post:jasmine.createSpy("get")
    };
    return registerServiceMock as CustomHttpClient;
  }