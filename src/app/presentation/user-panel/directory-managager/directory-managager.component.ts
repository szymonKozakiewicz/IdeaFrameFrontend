import { Component } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

@Component({
  selector: 'directory-managager',
  templateUrl: './directory-managager.component.html',
  styleUrl: './directory-managager.component.css'
})
export class DirectoryManagagerComponent {


  constructor(private directoryManagerService:DirectoryManagerService) {

   }
  
  resetModal()
  {
      this.directoryManagerService.resetModal();
  }
}
