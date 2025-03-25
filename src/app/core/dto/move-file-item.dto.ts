import { FileItemType } from "../enum/fileItem.enum";

export class MoveFileItemDto{
    name:string;
    path:string;
    type:FileItemType;
    newPath:string;

    constructor(name:string,type:FileItemType,path:string,newPath:string)
    {
        this.name=name;
        this.path=path;
        this.type=type;
        this.newPath=newPath;
    }
}