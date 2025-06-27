import { Component, OnInit } from '@angular/core';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'branch-settings',
  templateUrl: './branch-settings.component.html',
  styleUrl: './branch-settings.component.css'
})
export class BranchSettingsComponent implements OnInit {


  public isAnyNodeSelected: boolean = false;
  public branchColor: string = "#fffaf0";

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
    this.branchColor=selectedNode.color;
  }

  diselectNode() {
    this.isAnyNodeSelected = false;
    this.branchColor = "#fffaf0";
  }

  branchColorChange(newValue: string) {
    this.mindMapService.updateSelectedBranchColor(newValue);
  }
  

}
