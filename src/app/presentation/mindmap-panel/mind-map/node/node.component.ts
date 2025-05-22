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
  nodeStyle= { left: '0px', top: '0px' ,backgroundColor: '#fffaf0', borderColor:'#fffaf0'};
  nodeName="";
  nodeSettings:NodeMindMap=new NodeMindMap("","","#fffaf0",new NodeCoordinates(0,0),false);
  isSelected:boolean=false;

  @Input("nodeSettings")
  set setNodeSettings(node: NodeMindMap) {
    this.nodeSettings=node;
    this.updateUi();
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
    
    this.nodeStyle.left = this.nodeSettings.coordinates.x + 'px';
    this.nodeStyle.top = this.nodeSettings.coordinates.y + 'px';
    this.nodeName=this.nodeSettings.name;
    this.nodeStyle.backgroundColor = this.nodeSettings.color+"96"; 
    this.nodeStyle.borderColor = this.nodeSettings.color;
    
    
  }
}


