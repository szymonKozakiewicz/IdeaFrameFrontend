import { FileItemType } from "../enum/fileItem.enum";

export class AddNewFileItemRequestDTO{

    name:string;
    path:string;
    type:FileItemType

    constructor(name:string,type:FileItemType,path:string)
    {
        this.name=name;
        this.path=path;
        this.type=type;
    }
}