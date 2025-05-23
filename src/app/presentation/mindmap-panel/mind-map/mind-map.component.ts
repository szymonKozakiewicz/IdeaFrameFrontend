import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnInit } from '@angular/core';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'mind-map',
  templateUrl: './mind-map.component.html',
  styleUrl: './mind-map.component.css'
})
export class MindMapComponent implements OnInit {

  isNodeContextMenuVisible: boolean = false;
  nodeContextMenuPosition: { left: number; top: number } = { left: 0, top: 0 };
  nodes: NodeMindMap[] = []; 
  nodePositionDragTranslation: { x: number, y: number } = { x: 0, y: 0 };

 

  constructor(private mindMapService:MindMapService) { }

  ngOnInit(): void {
    this.upadateMap();
    this.mindMapService.mindMapUpdated$.subscribe({
      next: this.upadateMap.bind(this)
    })
  }



  @HostListener("contextmenu", ["$event"])
  openNodeContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.isNodeContextMenuVisible=true;
    this.nodeContextMenuPosition= { left: event.offsetX, top: event.offsetY};
  
  }


  @HostListener("click", ["$event"])
  onEmptySpaceClicked(event: MouseEvent) {
    event.stopPropagation();
    this.closeNodeContextMenu();
    this.diselectAllNodes();
  }

  onNodeDragEnd(event: CdkDragEnd) {
    let finalPostion=event.source.getFreeDragPosition();
    this.mindMapService.updateSelectedNodePosition(finalPostion)
    this.nodePositionDragTranslation={ x: 0, y: 0 };

  }



  closeNodeContextMenu() {
    
    this.isNodeContextMenuVisible=false;
  }

  diselectAllNodes() {
    this.mindMapService.diselectAllNodes(); 
    
  }

  private upadateMap() {
    this.nodes = this.mindMapService.getNodes();
  }

}
