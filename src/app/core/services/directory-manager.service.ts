import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { FileItemType } from "../enum/fileItem.enum";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";
import { FileItemDTO } from "../dto/file-item.dto";
import { Injectable } from "@angular/core";
import { UserRegisterLoginDTO } from "../dto/user-register-login.dto";
import { catchError, firstValueFrom, map, Observable, of, Subject } from "rxjs";
import { OperationStatus } from "../enum/operation.status";
import { FileSystemItem } from "../domain/entities/file-item";
import { FileSystemItemWithPath } from "../domain/entities/file-item-with-path";
import { MindMapService } from "./mind-map.service";
import { Router } from "@angular/router";


@Injectable({providedIn:'root'})
export class DirectoryManagerService{





  
    addFileItemOperationStatus$:Subject<OperationStatus>=new Subject<OperationStatus>();
    resetModal$:Subject<void>=new Subject<void>();
    fileItemListUpdate$:Subject<OperationStatus>=new Subject<OperationStatus>();
    updatePathInUI$:Subject<void>=new Subject<void>();
    fileItemList: FileSystemItem[]=[];
    private fileItemToChangeType:FileItemType=FileItemType.FOLDER;
    private currentPath:string;




    constructor(private httpClient:CustomHttpClient,
        private mindMapService:MindMapService,
        private router: Router
    ) {
        this.currentPath = "/";

    }

    public checkIfFileItemNameAvailable(name:string,type:FileItemType):Observable<boolean> {
        
        return this.checkIfFileItemNameAvailableInPath(name, type,this.currentPath);
    }


    public getFileItemToChangeType()
    {
        return this.fileItemToChangeType;
    }

    public openFile(fileName: string) {
        

        const path=this.currentPath;
        let fileToOpen=new FileSystemItemWithPath(fileName,FileItemType.FILE,path);
        this.mindMapService.setCurrentFileItem(fileToOpen);
        this.router.navigate(["/mindMapPanel"]);

    }


    public updateFolderAndItemList()
    {
        let path=this.currentPath;
        let observable=this.httpClient.getWithQuery<FileItemDTO[]>(ApiEndpoints.GET_ALL_FILEITEM,"path",path)
        this.fileItemListUpdate$.next(OperationStatus.IN_PROGRESS)
        observable.subscribe(
        {
            next: (fileItemsDtoList) =>{ 
                
                this.fileItemList=fileItemsDtoList
                    .map(fileItemDto=>FileSystemItem.build(fileItemDto));
                

                this.fileItemListUpdate$.next(OperationStatus.SUCCESS);
            }
        })      
    }



    public removeFileItem(fileToRemove:FileSystemItem)
    {
        let fileToRemoveDTO=fileToRemove.convertToFileItemDTO(this.currentPath)
        let request=this.httpClient.post(ApiEndpoints.REMOVE_FILEITEM,fileToRemoveDTO)
        request.subscribe(
            {
                next: this.updateFolderAndItemList.bind(this)
            }
        )
    };



    public isUserInHomeDirectory(): boolean {
        return this.currentPath==="/";
    }

    public enterToFolder(folderName: string) {
        if(this.currentPath=="/")
            this.currentPath += folderName;
        else
            this.currentPath += "/"+folderName;
        this.updatePathInUI$.next();
        this.updateFolderAndItemList()
    }

    public setPath(path: string) {
        this.currentPath = path;
        this.updateFolderAndItemList();
    }

    public getPathWithoutLastSegment():string
    {
        let path=this.currentPath;
        let index=path.lastIndexOf("/");
        if(index===0)
            return "";
        return path.substring(0,index);
    }

    getPathsSegmentsWithPathsToIt(currentPath: string) {
        
        let segments = currentPath.split("/");
        if(segments.length==0)
            return [];
        segments=segments.slice(1);
        let path="";
        let resultList=Array<{segment:string,path:string}>();
        for (let segment of segments) {
            path+="/"
            path+=segment;
            resultList.push({segment:segment,path:path});
            
        }
        return resultList
    }

    public getCurrentFolder():string
    {
        let path=this.currentPath;
        if(path=="/")
            return "";
        let index=path.lastIndexOf("/");
        return path.substring(index+1);
    }


    public sendRequestToAddNewFileItem(name:string){

        let request:FileItemDTO = new FileItemDTO(name,this.fileItemToChangeType,this.currentPath);

        this.httpClient.post(ApiEndpoints.ADD_NEW_FILE_ITEM,request)
        .subscribe({
            next:()=>this.addFileItemOperationStatus$.next(OperationStatus.SUCCESS),
            error:()=>this.addFileItemOperationStatus$.next(OperationStatus.FAILURE),
            complete:()=>this.updateFolderAndItemList()
        })
    }

    public getCurrentPath():string
    {
        return this.currentPath;
    }


    getFolders(): string[] {
        return this.fileItemList.filter(fileItem=>fileItem.type==FileItemType.FOLDER).map(fileItem=>fileItem.name);
    }
    getFiles(): string[] {
        return this.fileItemList.filter(fileItem=>fileItem.type==FileItemType.FILE).map(fileItem=>fileItem.name);
    }



    setupModalForOperationAddFileItem(fileItemType:FileItemType)
    {
        this.fileItemToChangeType=fileItemType;
        this.addFileItemOperationStatus$.next(OperationStatus.NOT_STARTED);
        this.resetModal();
    }

    public setFilteItemToChangeType(fileItemType:FileItemType)
    {
        this.fileItemToChangeType=fileItemType;
    }

    resetModal() {

        this.resetModal$.next();
    }

    
    private transformErrorToFalse(): (error: any) => Observable<boolean> {
        return error => {
            console.log(error);
            return of(false);
        };
    }

    private checkIfFileItemNameAvailableInPath(name: string, type: FileItemType,path:string) {
        let request: FileItemDTO = new FileItemDTO(name, type, path);
        return this.httpClient.post<boolean>(ApiEndpoints.IS_FILENAME_AVAILABLE, request)
            .pipe(
                catchError(this.transformErrorToFalse())
            );
    }


}