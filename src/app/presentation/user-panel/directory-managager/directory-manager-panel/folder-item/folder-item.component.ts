import { Component, Input } from '@angular/core';

@Component({
  selector: 'folder-item',
  templateUrl: './folder-item.component.html',
  styleUrl: './folder-item.component.css'
})
export class FolderItemComponent {


  @Input("folderName") folderName:string="";

  
}
