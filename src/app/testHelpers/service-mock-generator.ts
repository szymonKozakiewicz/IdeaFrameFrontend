import { Subject } from "rxjs";
import { OperationStatus } from "../core/enum/operation.status";
import { RegisterService } from "../core/services/register.service";

export function getRegisterServiceMock() {
    let registerSubjectForMock = new Subject<OperationStatus>();
    const registerServiceMock: Pick<RegisterService, keyof RegisterService> = {
      registerState$: registerSubjectForMock,
      register: jasmine.createSpy('register'),
    };
    return registerServiceMock;
  }