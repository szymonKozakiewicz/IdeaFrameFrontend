import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { MapPanningService } from 'src/app/core/services/map-panning.service';
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
  isMapPanningModeActive:boolean=false;
  fileItemName: string = "";
  isMindMapLoadingSpinnerVisible: boolean = true;
 

  constructor(private mindMapService:MindMapService, private panningService:MapPanningService) { }

  ngOnInit(): void {
    this.initMindMap();
    

    this.mindMapService.mindMapUpdated$.subscribe({
      next: this.upadateMap.bind(this)
    })

    this.mindMapService.mindMapSaveStatus$.subscribe({
      next: this.mindMapSaveStatusChanged.bind(this)
    })
    this.fileItemName=this.mindMapService.getFileItemName();
    
  }




  @HostListener("contextmenu", ["$event"])
  openNodeContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.isNodeContextMenuVisible=true;
    this.nodeContextMenuPosition= { left: event.offsetX, top: event.offsetY};
  
  }


  @HostListener("click", ["$event"])
  onEmptySpaceClicked(event: MouseEvent) {
    this.closeNodeContextMenu();
    this.diselectAllNodes();
  }



  onNodeDragEnd(event: CdkDragEnd) {
    let finalPostion=event.source.getFreeDragPosition();
    this.mindMapService.updateSelectedNodePosition(finalPostion)
    this.nodePositionDragTranslation={ x: 0, y: 0 };

  }

  mindMapSaveStatusChanged(status: OperationStatus) {
    if (status === OperationStatus.SUCCESS) {
      this.isMindMapLoadingSpinnerVisible = false;
    } else {
      this.isMindMapLoadingSpinnerVisible = true;
    }
  }

  switchPanningMode(newValue: boolean) {
    this.isMapPanningModeActive=newValue;
    if(this.isMapPanningModeActive){
      this.mindMapService.diselectAllNodes();
      this.panningService.setNewCursorMode('grab');
      
    }
    else{
      this.panningService.setNewCursorMode('default');
    }
    this.panningService.setMapPanningMode(newValue);

  }

  closeNodeContextMenu() {
    
    this.isNodeContextMenuVisible=false;
  }

  diselectAllNodes() {
    this.mindMapService.diselectAllNodes(); 
    
  }

  initMindMap(){
    this.mindMapService.loadMindMapFromBakcend();
  }

  private upadateMap() {
    this.nodes = this.mindMapService.getNodes();
    this.isMindMapLoadingSpinnerVisible = false;
  }

}
