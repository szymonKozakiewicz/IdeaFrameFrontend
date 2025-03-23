import { Component, HostListener, Input } from '@angular/core';
import { FileSystemItem } from 'src/app/core/domain/entities/file-item';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

@Component({
  selector: 'file-item-menu',
  templateUrl: './file-item-menu.component.html',
  styleUrl: './file-item-menu.component.css'
})
export class FileItemMenuComponent {

  @Input() fileItemMenuPositionStyle = { left: '0px', top: '0px' };
  @Input() selectedFileItem:FileSystemItem=new FileSystemItem(1,"");

  constructor(private directoryService:DirectoryManagerService) 
  { }

  removeFileItem() {
    this.directoryService.removeFileItem(this.selectedFileItem);
  }


  

}
