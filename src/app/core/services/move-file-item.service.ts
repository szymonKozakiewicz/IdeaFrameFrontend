import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { DirectoryManagerService } from "./directory-manager.service";
import { FileSystemItem } from "../domain/entities/file-item";
import { MoveFileItemDto } from "../dto/move-file-item.dto";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";
import { FileItemType } from "../enum/fileItem.enum";

@Injectable({providedIn:'root'})
export class MoveFileItemService{

    private fileItemToMove: FileSystemItem;
    private isInFileMoveMode: boolean;
    private oldPath:string;
    moveFileItemMode$:Subject<boolean>=new Subject<boolean>();

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
        this.moveFileItemMode$.next(false);
    }

    public isInMoveFileItemMode():boolean
    {
        return this.isInFileMoveMode;
    }

    public moveFileItemToCurrentFolder()
    {
        this.cancelMoveFileItemMode();
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
        this.oldPath=this.directoryManager.getCurrentPath();
        this.moveFileItemMode$.next(true);
        
    }

    public shouldFolderBeDisabled(path:string,folderName:string):boolean
    {
        if(!this.isInFileMoveMode)
        {
            return false;
        }
        if(this.fileItemToMove.type==FileItemType.FILE)
        {
            return false;
        }

        const isInsideFolderFromWhichFolderIsMoved = path === this.oldPath;
        if(!isInsideFolderFromWhichFolderIsMoved)
        {
            return false;
        }

        if(folderName===this.fileItemToMove.name)
        {
            return true;
        }
        

        return false;


    }
    


}