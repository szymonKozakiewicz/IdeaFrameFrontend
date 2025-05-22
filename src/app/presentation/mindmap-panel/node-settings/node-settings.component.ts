import { Component, OnInit } from '@angular/core';
import { min } from 'rxjs';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'node-settings',
  templateUrl: './node-settings.component.html',
  styleUrl: './node-settings.component.css'
})
export class NodeSettingsComponent implements OnInit {

  nameInputValue: string = "";
  isAnyNodeSelected: boolean = false;
  
  constructor(private mindMapService: MindMapService) { 
    
  }

  ngOnInit(): void {
    this.mindMapService.updateSelectedNodeInSettings$.subscribe({
      next: this.showCurrentSettingsForSelectedNode.bind(this)})
    
    this.mindMapService.diselectAllNodes$.subscribe({
      next: this.diselectNode.bind(this)
    })

    
  }

  showCurrentSettingsForSelectedNode(selectedNode:NodeMindMap){
    this.isAnyNodeSelected=true;

    this.nameInputValue=selectedNode.name;
  }

  nodeNameChange(newValue: string) {
    this.mindMapService.updateSelectedNodeName(newValue);
  }
  
  diselectNode() {
    this.isAnyNodeSelected = false;
    this.nameInputValue = "";
  }




}
