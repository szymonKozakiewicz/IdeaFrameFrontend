import { Component, Input } from '@angular/core';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'node-context-menu',
  templateUrl: './node-context-menu.component.html',
  styleUrl: './node-context-menu.component.css'
})
export class NodeContextMenuComponent {
  nodeMenuPositionStyle= { left: '0px', top: '0px' };
  private nodeMenuPosition = new NodeCoordinates(0,0);

  @Input("nodeMenuPosition") 
  set setNodeMenuPosition(position: { left: number; top: number }) {
    this.nodeMenuPosition=new NodeCoordinates(position.left,position.top);
    this.nodeMenuPositionStyle.left = position.left + 'px';
    this.nodeMenuPositionStyle.top = position.top + 'px';
  }

  constructor(private mindMapService: MindMapService) { 

  }


  addNewNode() {

    this.mindMapService.addNewNode(this.nodeMenuPosition);
    
  }
  
}
