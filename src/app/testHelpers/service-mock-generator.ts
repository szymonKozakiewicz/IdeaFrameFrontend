import { Subject } from "rxjs";
import { OperationStatus } from "../core/enum/operation.status";
import { RegisterService } from "../core/services/register.service";
import { CustomHttpClient } from "../infrastructure/http/custom-http-client";
import { HttpClient } from "@angular/common/http";
import { LoginService } from "../core/services/login.service";
import { UserPanelService } from "../core/services/user-panel.service";
import { AuthorisationService } from "../core/services/authorisation.service";
import { Navigation, NavigationBehaviorOptions, Router, Routes, UrlCreationOptions, UrlTree } from "@angular/router";
import { DirectoryManagerService } from "../core/services/directory-manager.service";
import { FileSystemItem } from "../core/domain/entities/file-item";
import { FileItemType } from "../core/enum/fileItem.enum";
import { MoveFileItemService } from "../core/services/move-file-item.service";
import { RenameFileItemService } from "../core/services/rename-file-item.service";
import { UserService } from "../core/services/user.service";
import { MindMapService } from "../core/services/mind-map.service";
import { FileSystemItemWithPath } from "../core/domain/entities/file-item-with-path";

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

  export function getDirectoryServiceMock(){
    const directoryServiceMock: Pick<DirectoryManagerService, keyof DirectoryManagerService> = {
      addFileItemOperationStatus$: new Subject<OperationStatus>(),
      resetModal$: new Subject<void>(),
      fileItemListUpdate$: new Subject<OperationStatus>(),
      updatePathInUI$: new Subject<void>(),
      fileItemList: [],
      checkIfFileItemNameAvailable: jasmine.createSpy("checkIfFileItemNameAvailable"),
      openFile: jasmine.createSpy("openFile"),
      getFileItemToChangeType: jasmine.createSpy("getFileItemToChangeType"),
      updateFolderAndItemList: jasmine.createSpy("updateFolderAndItemList"),
      removeFileItem: jasmine.createSpy("removeFileItem"),
      isUserInHomeDirectory: jasmine.createSpy("isUserInHomeDirectory"),
      enterToFolder:  jasmine.createSpy("enterToFolder"),
      setPath: jasmine.createSpy("setPath") ,
      getPathWithoutLastSegment:jasmine.createSpy("getPathWithoutLastSegment"),
      getPathsSegmentsWithPathsToIt: jasmine.createSpy("getPathsSegmentsWithPathsToIt"),
      getCurrentFolder: jasmine.createSpy("getCurrentFolder"),
      sendRequestToAddNewFileItem: jasmine.createSpy("sendRequestToAddNewFileItem"),
      getCurrentPath: jasmine.createSpy("getCurrentPath"),
      getFolders: jasmine.createSpy("getFolders") ,
      getFiles: jasmine.createSpy("getFiles"),
      setupModalForOperationAddFileItem: jasmine.createSpy("setupModalForOperationAddFileItem"),
      setFilteItemToChangeType: jasmine.createSpy("setFilteItemToChangeType"),
      resetModal:jasmine.createSpy("resetModal") 
    };
    return directoryServiceMock as DirectoryManagerService;
  }

  export function getMoveFileItemServiceMock()
  {
    const moveFileItemServiceMock: Pick<MoveFileItemService,keyof MoveFileItemService> = {
      moveFileItemMode$: new Subject<boolean>(),
      cancelMoveFileItemMode:jasmine.createSpy("cancelMoveFileItemMode"),
      isInMoveFileItemMode: jasmine.createSpy("isInMoveFileItemMode"),
      moveFileItemToCurrentFolder: jasmine.createSpy("moveFileItemToCurrentFolder"),
      isPalceForFileItemAvailableInNewFolder: jasmine.createSpy("isPalceForFileItemAvailableInNewFolder"),
      eneterIntoMoveFileItemMode:  jasmine.createSpy("eneterIntoMoveFileItemMode"),
      shouldFolderBeDisabled:   jasmine.createSpy("shouldFolderBeDisabled")
    }
    return moveFileItemServiceMock as MoveFileItemService;
  }

  export function getRenameServiceMock()
  {
    const renameServiceMock: Pick<RenameFileItemService,keyof RenameFileItemService>={
      isEditModeActive: false,
      switchRenameFileTimeMode$: new Subject<boolean>(),
      editFileItemOperationStatus$: new Subject<OperationStatus>(),
      enterIntoNameEditMode:jasmine.createSpy("enterIntoNameEditMode"),
      isEditedFileItemAFile: jasmine.createSpy("isEditedFileItemAFile"),
      cancelRenameFileItemMode: jasmine.createSpy("cancelRenameFileItemMode"),
      isInFileItemNameEditMode: jasmine.createSpy("isInFileItemNameEditMode"),
      sendRequestToEditFileItem: jasmine.createSpy("sendRequestToEditFileItem")
    }
    return renameServiceMock as RenameFileItemService;
  }

  export function getUserServiceMock()
  {

    const userServiceMock: Pick<UserService, keyof UserService> = {
      getUserName:jasmine.createSpy("sendRequestToEditFileItem").and.returnValue("testUserName"),
      
    };
    return userServiceMock as UserService;
  }

  export function getRouterMock()
  {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    return routerSpy as Router;
  }


  export function getMindMapMock()
  {
    const mindMapServiceMock: Pick<MindMapService, keyof MindMapService>={
      setCurrentFileItem: jasmine.createSpy("setCurrentFileItem")
    }
    return mindMapServiceMock as MindMapService;
  }



