import { Component, Input, OnInit } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';

@Component({
  selector: 'folder-item',
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.css'
})
export class FolderItemComponent implements OnInit {


  private _folderName:string="";
  folderNameFrontend:string="";
  isFolderDisabled:boolean=false;

  @Input()
  set folderName(value: string) {
    this._folderName = value;
    this.setFrontendFolderName();
  }

  constructor(private directoryService:DirectoryManagerService,
    private moveFileItemService:MoveFileItemService
  ) { }
  ngOnInit(): void {
    const currentPath=this.directoryService.getCurrentPath();
    this.isFolderDisabled=this.moveFileItemService.shouldFolderBeDisabled(currentPath,this._folderName);
    this.moveFileItemService.moveFileItemMode$.subscribe(
      {
        next:this.updateFolderState.bind(this)
      }
    )
  }



  openFolder()
  {
    if(this.isFolderDisabled)
      return;
    this.directoryService.enterToFolder(this._folderName);
  }

  setFrontendFolderName()
  {
    if(this._folderName.length>7)
      this.folderNameFrontend=this._folderName.substring(0,7)+"...";
    else
      this.folderNameFrontend=this._folderName;
  }

  updateFolderState(isFileItemModeActive:boolean)
  {
    if(!isFileItemModeActive)
    {
      this.isFolderDisabled=false;
    }
    const currentPath=this.directoryService.getCurrentPath();

    this.isFolderDisabled=this.moveFileItemService.shouldFolderBeDisabled(currentPath,this._folderName);
    

    
  }
  
}
