import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'mind-map',
  templateUrl: './mind-map.component.html',
  styleUrl: './mind-map.component.css'
})
export class MindMapComponent {
  isNodeContextMenuVisible: boolean = false;
  nodeContextMenuPosition: { left: number; top: number } = { left: 0, top: 0 };


  @HostListener("contextmenu", ["$event"])
  openNodeContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.isNodeContextMenuVisible=true;
    this.nodeContextMenuPosition= { left: event.offsetX, top: event.offsetY};
    

  
  }

  @HostListener("document:click", ["$event"])
  closeNodeContextMenu(event: MouseEvent) {
    
    this.isNodeContextMenuVisible=false;
  }

}
