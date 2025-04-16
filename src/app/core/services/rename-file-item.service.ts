import { Injectable, OnInit } from "@angular/core";
import { FileSystemItem } from "../domain/entities/file-item";
import { Subject } from "rxjs";
import { FileItemType } from "../enum/fileItem.enum";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { FileItemDTO } from "../dto/file-item.dto";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";
import { OperationStatus } from "../enum/operation.status";
import { DirectoryManagerService } from "./directory-manager.service";
import { FileItemEditDTO } from "../dto/edit-file-item.dto";

@Injectable({providedIn:'root'})
export class RenameFileItemService{




    isEditModeActive: boolean= false;
    fileItemToEdit:FileSystemItem|null = null;
    switchRenameFileTimeMode$: Subject<boolean> = new Subject<boolean>();
    editFileItemOperationStatus$= new Subject<OperationStatus>();

    constructor(private httpClient:CustomHttpClient,
        private directoryManagerService:DirectoryManagerService
    ) {
        
    }

    enterIntoNameEditMode(fileItem: FileSystemItem): void {

        this.isEditModeActive = true;
        this.fileItemToEdit = fileItem;
        this.directoryManagerService.setFilteItemToChangeType(fileItem.type);
        this.switchRenameFileTimeMode$.next(true);


    }

    isEditedFileItemAFile() {
       return this.fileItemToEdit?.type===FileItemType.FILE;
       
    }

    cancelRenameFileItemMode()
    {
        this.isEditModeActive = false;
        this.fileItemToEdit = null;
        this.switchRenameFileTimeMode$.next(false);
    }

    isInFileItemNameEditMode(): boolean {
        return this.isEditModeActive;
    }

    sendRequestToEditFileItem(newfileName: any) {
        const currentPath= this.directoryManagerService.getCurrentPath();
        
        let request:FileItemEditDTO = new FileItemEditDTO(this.fileItemToEdit,currentPath,newfileName);

        this.httpClient.post(ApiEndpoints.EDIT_FILE_ITEM,request)
        .subscribe({
            next:()=>this.editFileItemOperationStatus$.next(OperationStatus.SUCCESS),
            error:()=>this.editFileItemOperationStatus$.next(OperationStatus.FAILURE),
            complete:()=>this.directoryManagerService.updateFolderAndItemList()
        })
      }
}