import { Component, Input, OnInit } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';

@Component({
  selector: 'file-item',
  templateUrl: './file-item.component.html',
  styleUrl: './file-item.component.css'
})
export class FileItemComponent implements OnInit  {
  private _fileItemName:string="";
  fileItemNameFrontend:string="";
  isFileItemDisabled:boolean=false;
  @Input("isFolder")isFolder:boolean=true;

  @Input()
  set fileItemName(value: string) {
    this._fileItemName = value;
    this.setFrontendFileItemName();
  }

  constructor(private directoryService:DirectoryManagerService,
    private moveFileItemService:MoveFileItemService
  ) { }

  
  ngOnInit(): void {
    const currentPath=this.directoryService.getCurrentPath();
    this.isFileItemDisabled=this.moveFileItemService.shouldFolderBeDisabled(currentPath,this._fileItemName);
    this.moveFileItemService.moveFileItemMode$.subscribe(
      {
        next:this.updateFolderState.bind(this)
      }
    )
  }



  openFolder()
  {
    if(this.isFileItemDisabled)
      return;
    this.directoryService.enterToFolder(this._fileItemName);
  }

  setFrontendFileItemName()
  {
    if(this._fileItemName.length>7)
      this.fileItemNameFrontend=this._fileItemName.substring(0,7)+"...";
    else
      this.fileItemNameFrontend=this._fileItemName;
  }

  updateFolderState(isFileItemModeActive:boolean)
  {
    if(!isFileItemModeActive)
    {
      this.isFileItemDisabled=false;
    }
    const currentPath=this.directoryService.getCurrentPath();

    this.isFileItemDisabled=this.moveFileItemService.shouldFolderBeDisabled(currentPath,this._fileItemName);
    

    
  }
}
