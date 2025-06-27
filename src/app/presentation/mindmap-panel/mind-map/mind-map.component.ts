import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { Component, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';
import { BranchCoordinates } from 'src/app/core/domain/entities/branch-coordinates';
import { BranchMindMap } from 'src/app/core/domain/entities/branch-mind-map';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { BranchService } from 'src/app/core/services/branch.service';
import { MapPanningService } from 'src/app/core/services/map-panning.service';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { CoordinatesConverterHelper } from './coordinates-converter-helper';
import { MindMapContextMenuMode } from 'src/app/core/enum/mind-map-context-menu-mode.enum';

@Component({
  selector: 'mind-map',
  templateUrl: './mind-map.component.html',
  styleUrl: './mind-map.component.css'
})
export class MindMapComponent implements OnInit {



  isMindMapContextMenuVisible: boolean = false;
  mindMapContextMenuPosition: { left: number; top: number } = { left: 0, top: 0 };
  mindMapContextMenuMode: MindMapContextMenuMode = MindMapContextMenuMode.NORMAL;
  nodes: NodeMindMap[] = []; 
  branches:BranchMindMap[]=[];
  nodePositionDragTranslation: { x: number, y: number } = { x: 0, y: 0 };
  isMapPanningModeActive:boolean=false;
  fileItemName: string = "";
  isMindMapLoadingSpinnerVisible: boolean = true;
  isBranchCreateModeActive=false
  
  creatBranch=BranchMindMap.buildDefault();
  
 

  constructor(private mindMapService:MindMapService, private panningService:MapPanningService, private branchService:BranchService,private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initMindMap();
    

    this.mindMapService.mindMapUpdated$.subscribe({
      next: this.upadateMap.bind(this)
    })

    this.mindMapService.mindMapSaveStatus$.subscribe({
      next: this.mindMapSaveStatusChanged.bind(this)
    })
    this.branchService.branchCreateModeChanged$.subscribe({
      next:this.branchCreateModeChanged.bind(this)
    })
    this.fileItemName=this.mindMapService.getFileItemName();
    this.branches=this.branchService.getBranches()
    
  }




  @HostListener("contextmenu", ["$event"])
  openMindMapContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.isMindMapContextMenuVisible=true;
    this.mindMapContextMenuMode=this.mindMapService.getAndResetMindMapContextMenuMode()
    let clickOffsetPostion=CoordinatesConverterHelper.convertClientToOffset(event.clientX,event.clientY,this.elementRef.nativeElement)
    this.mindMapContextMenuPosition= { left: clickOffsetPostion.x, top: clickOffsetPostion.y};
    this.branchService.deactivateBranchCreateMode()
  }


  @HostListener("click", ["$event"])
  onEmptySpaceClicked(event: MouseEvent) {
    if(this.branchService.isBranchModeActive())
    {
      let newNodeCoordinates=CoordinatesConverterHelper.convertClientToOffset(event.clientX,event.clientY,this.elementRef.nativeElement)
      this.mindMapService.finaliseBranchCreationWithCreationNewNode(newNodeCoordinates)
    }
    this.closeNodeContextMenu();
    this.diselectAllNodes();
    
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event:MouseEvent)
  {
 
    if(!this.branchService.isBranchModeActive())
      return

    
    let clickCoordinates=CoordinatesConverterHelper.convertClientToOffset(event.clientX,event.clientY,this.elementRef.nativeElement)
    this.branchService.updateBranchCreateTargetCoordinates(clickCoordinates)
  }

  branchCreateModeChanged(currentState:boolean)
  {
    this.isBranchCreateModeActive=currentState;
    if(currentState)
      this.creatBranch=this.branchService.getInitialCreateBranch()
  }

  onNodeDragEnd(event: CdkDragEnd) {
    let finalPostion=event.source.getFreeDragPosition();
    this.mindMapService.updateSelectedNodePosition(finalPostion)
    this.nodePositionDragTranslation={ x: 0, y: 0 };
    this.branchService.branchChanged$.next();
    

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
    
    this.isMindMapContextMenuVisible=false;
  }

  diselectAllNodes() {
    this.mindMapService.diselectAllNodes(); 
    
  }

  initMindMap(){
    this.mindMapService.loadMindMapFromBakcend();
    this.panningService.resetTranslation();
  }

  private upadateMap() {
    this.nodes = this.mindMapService.getNodes();
    this.branches = this.branchService.getBranches();
    this.isMindMapLoadingSpinnerVisible = false;
  }

}
