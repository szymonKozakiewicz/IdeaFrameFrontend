import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { FileItemType } from "../enum/fileItem.enum";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";
import { AddNewFileItemRequestDTO } from "../dto/add-new-file-item.dto";
import { Injectable } from "@angular/core";
import { UserRegisterLoginDTO } from "../dto/user-register-login.dto";
import { catchError, map, Observable, of, Subject } from "rxjs";
import { OperationStatus } from "../enum/operation.status";


@Injectable({providedIn:'root'})
export class DirectoryManagerService{




    currentPath:string;
  
    operationStatus$:Subject<OperationStatus>=new Subject<OperationStatus>();
    resetModal$:Subject<void>=new Subject<void>();

    constructor(private httpClient:CustomHttpClient) {
        this.currentPath = "/";
    }

    checkIfFolderNameAvailable(name:string,type:FileItemType):Observable<boolean> {
        
        let request:AddNewFileItemRequestDTO = new AddNewFileItemRequestDTO(name,type,this.currentPath);
        return this.httpClient.post<boolean>(ApiEndpoints.IS_FILENAME_AVAILABLE, request)
        .pipe(
            catchError(this.transformErrorToFalse())
        );
    }

    



    public sendRequestToAddNewFileItem(name:string,type:FileItemType){

        let request:AddNewFileItemRequestDTO = new AddNewFileItemRequestDTO(name,type,this.currentPath);

        this.httpClient.post(ApiEndpoints.ADD_NEW_FILE_ITEM,request)
        .subscribe({
            next:()=>this.operationStatus$.next(OperationStatus.SUCCESS),
            error:()=>this.operationStatus$.next(OperationStatus.FAILURE)
        })
    }

    resetModal() {
        this.operationStatus$.next(OperationStatus.NOT_STARTED);
        this.resetModal$.next();
    }

    
    private transformErrorToFalse(): (error: any) => Observable<boolean> {
        return error => {
            console.log(error);
            return of(false);
        };
    }


}