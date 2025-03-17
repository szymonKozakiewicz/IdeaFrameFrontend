import { Component, Input } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

@Component({
  selector: 'folder-item',
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.css'
})
export class FolderItemComponent {


  private _folderName:string="";
  folderNameFrontend:string="";

  @Input()
  set folderName(value: string) {
    this._folderName = value;
    this.setFrontendFolderName();
  }

  constructor(private directoryService:DirectoryManagerService) { }

  openFolder()
  {
    this.directoryService.enterToFolder(this._folderName);
  }

  setFrontendFolderName()
  {
    if(this._folderName.length>7)
      this.folderNameFrontend=this._folderName.substring(0,7)+"...";
    else
      this.folderNameFrontend=this._folderName;
  }
  
}
