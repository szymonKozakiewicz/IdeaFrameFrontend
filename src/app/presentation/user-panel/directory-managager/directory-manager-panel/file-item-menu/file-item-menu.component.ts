import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'file-item-menu',
  templateUrl: './file-item-menu.component.html',
  styleUrl: './file-item-menu.component.css'
})
export class FileItemMenuComponent {


  @Input() fileItemMenuPositionStyle = { left: '0px', top: '0px' };
  @Input() nameOfSelectedFileItem:string="";







  
  

}
