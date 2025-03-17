import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { FileItemType } from "../enum/fileItem.enum";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";
import { AddNewFileItemRequestDTO } from "../dto/add-new-file-item.dto";
import { Injectable } from "@angular/core";
import { UserRegisterLoginDTO } from "../dto/user-register-login.dto";
import { catchError, firstValueFrom, map, Observable, of, Subject } from "rxjs";
import { OperationStatus } from "../enum/operation.status";


@Injectable({providedIn:'root'})
export class DirectoryManagerService{





  
    addFileItemOperationStatus$:Subject<OperationStatus>=new Subject<OperationStatus>();
    resetModal$:Subject<void>=new Subject<void>();
    fileItemListUpdate$:Subject<OperationStatus>=new Subject<OperationStatus>();
    updatePathInUI$:Subject<void>=new Subject<void>();
    fileItemList: AddNewFileItemRequestDTO[]=[];
    private currentPath:string;


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

    public updateFolderAndItemList()
    {
        let path=this.currentPath;
        let observable=this.httpClient.getWithQuery<AddNewFileItemRequestDTO[]>(ApiEndpoints.GET_ALL_FILEITEM,"path",path)
        this.fileItemListUpdate$.next(OperationStatus.IN_PROGRESS)
        observable.subscribe(
        {
            next: (fileItems) =>{ 
                this.fileItemList=fileItems;
                this.fileItemListUpdate$.next(OperationStatus.SUCCESS);
            }
        })      
    }

    isUserInHomeDirectory(): boolean {
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


    public sendRequestToAddNewFileItem(name:string,type:FileItemType){

        let request:AddNewFileItemRequestDTO = new AddNewFileItemRequestDTO(name,type,this.currentPath);

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

    resetModal() {
        this.addFileItemOperationStatus$.next(OperationStatus.NOT_STARTED);
        this.resetModal$.next();
    }

    
    private transformErrorToFalse(): (error: any) => Observable<boolean> {
        return error => {
            console.log(error);
            return of(false);
        };
    }


}