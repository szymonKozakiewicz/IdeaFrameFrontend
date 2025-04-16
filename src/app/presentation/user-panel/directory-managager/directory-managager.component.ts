import { Component, OnInit } from '@angular/core';
import { FileItemType } from 'src/app/core/enum/fileItem.enum';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';

@Component({
  selector: 'directory-managager',
  templateUrl: './directory-managager.component.html',
  styleUrl: './directory-managager.component.css'
})
export class DirectoryManagagerComponent implements OnInit {

  fileMoveModeActive:boolean=false;

  constructor(private service:DirectoryManagerService,
        private moveFileItemService:MoveFileItemService,
      private renameFileItemService:RenameFileItemService) {
    
   }
  ngOnInit(): void {
    this.moveFileItemService.moveFileItemMode$.subscribe(
      {
        next:this.switchMoveFileItemMode.bind(this)
      }
    )
  }
  
  public switchMoveFileItemMode(modeState:boolean)
  {
    this.fileMoveModeActive=modeState;
  }

  public cancelMoveFileItemMode()
  {
    this.fileMoveModeActive=false;
    this.moveFileItemService.cancelMoveFileItemMode();
  }
  
  public async moveFileItemToThisFolder()
  {

    const placeForFileItemAvailable=await this.moveFileItemService.isPalceForFileItemAvailableInNewFolder()
    if(!placeForFileItemAvailable)
    {
      alert("Sorry can't move, file/folder with such name already exists in this folder");
      return;
    }
    this.moveFileItemService.moveFileItemToCurrentFolder();
    this.cancelMoveFileItemMode();

  }

  setupModalForAddNewFileItem(fileSystemType:FileItemType)
  {
      this.service.setupModalForOperationAddFileItem(fileSystemType);
      this.renameFileItemService.cancelRenameFileItemMode();
  }

  

}
