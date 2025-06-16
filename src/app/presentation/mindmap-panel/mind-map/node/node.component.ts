import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Host, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { BranchService } from 'src/app/core/services/branch.service';
import { MapPanningService } from 'src/app/core/services/map-panning.service';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { CoordinatesConverterHelper } from '../coordinates-converter-helper';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent implements OnInit,AfterViewInit {
  nodeStyle= {backgroundColor: '#fffaf0', borderColor:'#fffaf0'};
  nodeName="";
  nodeSettings:NodeMindMap=new NodeMindMap("","","#fffaf0",new NodeCoordinates(0,0),false);
  isSelected:boolean=false;
  isPlusVisible:boolean=false;  
  mapBackgroundStyle=""

  @HostBinding("style.left") positionX= '0px';
  @HostBinding("style.top") positionY= '0px';


  @Input("nodeSettings")
  set setNodeSettings(node: NodeMindMap) {
    this.nodeSettings=node;
    this.updateUi();
  }
  
  constructor(private mindMapService:MindMapService, private panningService:MapPanningService,private branchService:BranchService, private elementRef:ElementRef,private changeDetectorRef: ChangeDetectorRef){

  }
  ngAfterViewInit(): void {
    
  }

  

  ngOnInit(): void {
    this.updateUi();
    this.mindMapService.updateSelectedNodeInNodeComponent$.subscribe({
      next: this.updateUi.bind(this)})

    this.mindMapService.diselectAllNodes$.subscribe({
      next:()=>{
        this.isSelected=false;
      }
    })

    this.mindMapService.mindMapUpdated$.subscribe({
      next: this.updateUi.bind(this)
    })
    this.mapBackgroundStyle=this.mindMapService.getMapBakcgroundColor();
  }

  @HostListener("click", ["$event"])
  onNodeSelect(event: MouseEvent) {
    event.stopPropagation();
    if(this.branchService.isBranchModeActive())
    {
      this.branchService.finaliseBranchCreation(this.nodeSettings)
    }
   
  }



  @HostListener('mousedown', ['$event'])
  startDrag(event: MouseEvent) {
    let isMapPanningModeActive=this.panningService.getMapPanningMode();
    if(isMapPanningModeActive){
      return;
    }
    this.selectNode();

  }


  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    let isMapPanningModeActive=this.panningService.getMapPanningMode();
    if(!isMapPanningModeActive){
      this.isPlusVisible = true;
    }
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.isPlusVisible = false;
   
  }

  onPlusClick(event: MouseEvent) {
    event.stopPropagation();
    if(this.mindMapService.isAnySpecialModeActive())
      return;
    let isMapPanningModeActive=this.panningService.getMapPanningMode();
    if(isMapPanningModeActive)
      return;
    this.branchService.activateBranchCreateMode(this.nodeSettings)
    
  }

  onPlusDown(event:MouseEvent)
  {
    event.stopPropagation();
  }



  updateUi()
  {

    this.nodeName=this.nodeSettings.name;
    this.changeDetectorRef.detectChanges();
    let translatedNodeCordinates=this.panningService.getTranslatedNodeCoordinates(this.nodeSettings.coordinates);
    
    let centeredCoordinates=CoordinatesConverterHelper.getCenteredCoordinates(translatedNodeCordinates,this.elementRef.nativeElement)
    this.positionX= centeredCoordinates.x + 'px';
    this.positionY = centeredCoordinates.y + 'px';

    this.nodeStyle.backgroundColor = this.nodeSettings.color+"96"; 
    this.nodeStyle.borderColor = this.nodeSettings.color;
    
    
  }

  private selectNode() {
    this.mindMapService.selectNode(this.nodeSettings);
    this.isSelected = true;
  }
}


