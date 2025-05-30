import { FileItemDTO } from "../../dto/file-item.dto";
import { FileItemType } from "../../enum/fileItem.enum";

export class FileSystemItem{
    type:FileItemType
    name:string

    constructor(type:FileItemType,name:string)
    {
        this.name=name;
        this.type=type;
    }

    public static build(fileItemDto:FileItemDTO):FileSystemItem
    {
        return new FileSystemItem(fileItemDto.type,fileItemDto.name)
    }

    public convertToFileItemDTO(path:string)
    {
        return new FileItemDTO(this.name,this.type,path)
    }
    



}