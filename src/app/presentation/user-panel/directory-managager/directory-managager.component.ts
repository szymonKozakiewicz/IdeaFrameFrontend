import { Component, OnInit } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';

@Component({
  selector: 'directory-managager',
  templateUrl: './directory-managager.component.html',
  styleUrl: './directory-managager.component.css'
})
export class DirectoryManagagerComponent implements OnInit {

  fileMoveModeActive:boolean=false;

  constructor(private service:DirectoryManagerService,
        private moveFileItemService:MoveFileItemService) {
    
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
  
  public moveFileItemToThisFolder()
  {
    this.moveFileItemService.moveFileItemToCurrentFolder();
    this.cancelMoveFileItemMode();

  }

  resetModal()
  {
      this.service.resetModal();
  }
}
