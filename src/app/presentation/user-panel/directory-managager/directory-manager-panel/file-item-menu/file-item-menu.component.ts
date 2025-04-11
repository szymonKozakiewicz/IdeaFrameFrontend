import { Component, HostListener, Input } from '@angular/core';
import { FileSystemItem } from 'src/app/core/domain/entities/file-item';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';

@Component({
  selector: 'file-item-menu',
  templateUrl: './file-item-menu.component.html',
  styleUrl: './file-item-menu.component.css'
})
export class FileItemMenuComponent {

  @Input() fileItemMenuPositionStyle = { left: '0px', top: '0px' };
  @Input() selectedFileItem:FileSystemItem=new FileSystemItem(1,"");

  constructor(private directoryService:DirectoryManagerService, 
    private moveFileItemService:MoveFileItemService,
    private renameFileItemService:RenameFileItemService) { }
  

  removeFileItem() {
    this.directoryService.removeFileItem(this.selectedFileItem);
  }


  moveFileItem() {
    this.moveFileItemService.eneterIntoMoveFileItemMode(this.selectedFileItem)
  }

  renameFileItem() {
    this.directoryService.resetModal();
    this.renameFileItemService.enterIntoNameEditMode(this.selectedFileItem);
  }


  

}
