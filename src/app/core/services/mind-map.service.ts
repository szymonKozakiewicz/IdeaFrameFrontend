import { Injectable } from "@angular/core";
import { FileSystemItemWithPath } from "../domain/entities/file-item-with-path";
import { FileItemType } from "../enum/fileItem.enum";

@Injectable({providedIn:'root'})
export class MindMapService
{

    private currentFileItem:FileSystemItemWithPath=new FileSystemItemWithPath("",FileItemType.FILE,"");

    public setCurrentFileItem(fileItem:FileSystemItemWithPath)
    {
        this.currentFileItem=fileItem;
    }

}