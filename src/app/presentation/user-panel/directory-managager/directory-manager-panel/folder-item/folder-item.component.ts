import { Component, Input } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

@Component({
  selector: 'folder-item',
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.css'
})
export class FolderItemComponent {


  @Input("folderName") folderName:string="";

  constructor(private directoryService:DirectoryManagerService) { }

  openFolder()
  {
    this.directoryService.enterToFolder(this.folderName);
  }
  
}
