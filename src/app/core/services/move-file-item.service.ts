import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { DirectoryManagerService } from "./directory-manager.service";
import { FileSystemItem } from "../domain/entities/file-item";
import { MoveFileItemDto } from "../dto/move-file-item.dto";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";

@Injectable({providedIn:'root'})
export class MoveFileItemService{

    private fileItemToMove: FileSystemItem;
    private isInFileMoveMode: boolean;
    private oldPath:string;
    moveFileItemMode$:Subject<void>=new Subject<void>();

    constructor(private httpClient:CustomHttpClient,
        private directoryManager:DirectoryManagerService
    ) {
        this.fileItemToMove=new FileSystemItem(1,"");
        this.isInFileMoveMode=false;
        this.oldPath="";
    }

    public cancelMoveFileItemMode()
    {
        this.isInFileMoveMode=false;
    }

    public isInMoveFileItemMode():boolean
    {
        return this.isInFileMoveMode;
    }

    public moveFileItemToCurrentFolder()
    {
        this.isInFileMoveMode=false;
        let newPath=this.directoryManager.getCurrentPath();
        let fileItemSystemToMoveDTO=new MoveFileItemDto(this.fileItemToMove.name,this.fileItemToMove.type,this.oldPath,newPath);
        this.httpClient.post(ApiEndpoints.MOVE_FILEITEM,fileItemSystemToMoveDTO).subscribe({
            next:()=>{this.directoryManager.updateFolderAndItemList()}
        })
        
        
    }
    
    public eneterIntoMoveFileItemMode(fileSystemItem:FileSystemItem)
    {
        this.fileItemToMove=fileSystemItem;
        this.isInFileMoveMode=true;
        this.moveFileItemMode$.next();
        this.oldPath=this.directoryManager.getCurrentPath();
    }
    


}