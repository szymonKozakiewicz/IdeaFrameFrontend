import { Component, Input } from '@angular/core';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';

@Component({
  selector: 'node',
  templateUrl: './node.component.html',
  styleUrl: './node.component.css'
})
export class NodeComponent {
  nodePositionStyle= { left: '0px', top: '0px' };
  nodeSettings:NodeMindMap=new NodeMindMap("","",new NodeCoordinates(0,0),false);

  @Input("nodeSettings")
  set setNodeSettings(node: NodeMindMap) {
    this.nodeSettings=node;
    this.nodePositionStyle.left = node.coordinates.x + 'px';
    this.nodePositionStyle.top = node.coordinates.y + 'px';
  }
  
  constructor(){}


}
