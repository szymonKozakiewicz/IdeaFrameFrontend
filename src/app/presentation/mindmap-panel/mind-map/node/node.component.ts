import { Component, Host, HostListener, Input, OnInit } from '@angular/core';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent implements OnInit {
  nodePositionStyle= { left: '0px', top: '0px' };
  nodeName="";
  nodeSettings:NodeMindMap=new NodeMindMap("","",new NodeCoordinates(0,0),false);
  isSelected:boolean=false;

  @Input("nodeSettings")
  set setNodeSettings(node: NodeMindMap) {
    this.nodeSettings=node;
    this.nodePositionStyle.left = node.coordinates.x + 'px';
    this.nodePositionStyle.top = node.coordinates.y + 'px';
  }
  
  constructor(private mindMapService:MindMapService){

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
  }

  @HostListener("click", ["$event"])
  onNodeSelect(event: MouseEvent) {
    event.stopPropagation();
    this.mindMapService.selectNode(this.nodeSettings);
    this.isSelected=true;
  }

  updateUi()
  {
    
    this.nodePositionStyle.left = this.nodeSettings.coordinates.x + 'px';
    this.nodePositionStyle.top = this.nodeSettings.coordinates.y + 'px';
    this.nodeName=this.nodeSettings.name;
    
  }
}


