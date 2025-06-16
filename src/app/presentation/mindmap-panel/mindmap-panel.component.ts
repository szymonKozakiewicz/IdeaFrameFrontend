import { Component, OnInit } from '@angular/core';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'mindmap-panel',
  templateUrl: './mindmap-panel.component.html',
  styleUrl: './mindmap-panel.component.css'
})
export class MindmapPanelComponent implements OnInit{

  public  mapBackgroundStyle=""
  constructor(private mindMapService:MindMapService)
  {

  }
  ngOnInit(): void {
    this.mapBackgroundStyle=this.mindMapService.getMapBakcgroundColor();
  }




}
