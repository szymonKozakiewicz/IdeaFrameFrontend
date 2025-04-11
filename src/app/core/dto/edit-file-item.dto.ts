import { FileSystemItem } from "../domain/entities/file-item";
import { FileItemType } from "../enum/fileItem.enum";
import { FileItemDTO } from "./file-item.dto";

export class FileItemEditDTO extends FileItemDTO{

    newName:string;



    constructor(fileItem:FileSystemItem|null,path:string, newName:string)
    {
        if(fileItem===null)
        {
            throw new Error("fileItem is null");
        }
        super(fileItem.name,fileItem.type,path);
        this.newName=newName;
    }
}