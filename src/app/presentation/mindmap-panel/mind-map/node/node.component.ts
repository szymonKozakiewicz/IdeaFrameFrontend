import { Component, Host, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { MapPanningService } from 'src/app/core/services/map-panning.service';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent implements OnInit {
  nodeStyle= {backgroundColor: '#fffaf0', borderColor:'#fffaf0'};
  nodeName="";
  nodeSettings:NodeMindMap=new NodeMindMap("","","#fffaf0",new NodeCoordinates(0,0),false);
  isSelected:boolean=false;
  isPlusVisible:boolean=false;  

  @HostBinding("style.left") positionX= '0px';
  @HostBinding("style.top") positionY= '0px';


  @Input("nodeSettings")
  set setNodeSettings(node: NodeMindMap) {
    this.nodeSettings=node;
    this.updateUi();
  }
  
  constructor(private mindMapService:MindMapService, private panningService:MapPanningService){

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
  }

  @HostListener("click", ["$event"])
  onNodeSelect(event: MouseEvent) {
    event.stopPropagation();
   
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



  updateUi()
  {

    let translatedNodeCordinates=this.panningService.getTranslatedNodeCoordinates(this.nodeSettings.coordinates);
    this.positionX= translatedNodeCordinates.x + 'px';
    this.positionY = translatedNodeCordinates.y + 'px';
    this.nodeName=this.nodeSettings.name;
    this.nodeStyle.backgroundColor = this.nodeSettings.color+"96"; 
    this.nodeStyle.borderColor = this.nodeSettings.color;
    
    
  }

  private selectNode() {
    this.mindMapService.selectNode(this.nodeSettings);
    this.isSelected = true;
  }
}


