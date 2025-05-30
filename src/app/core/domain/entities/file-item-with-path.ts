import { FileItemDTO } from "../../dto/file-item.dto";
import { FileItemType } from "../../enum/fileItem.enum";
import { FileSystemItem } from "./file-item";

export class FileSystemItemWithPath extends FileSystemItem {
  constructor(
    name: string,
    type: FileItemType,
    public path:string
  ) {
    super(type,name);
    
  }

  public convertWithPathToFileItemDTO()
  {
      return new FileItemDTO(this.name,this.type,this.path)
  } 
}