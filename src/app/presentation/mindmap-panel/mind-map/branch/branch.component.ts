import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { BranchMindMap } from 'src/app/core/domain/entities/branch-mind-map';
import { MindMapContextMenuMode } from 'src/app/core/enum/mind-map-context-menu-mode.enum';
import { BranchService } from 'src/app/core/services/branch.service';
import { MapPanningService } from 'src/app/core/services/map-panning.service';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'branch',
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {
  

  private _branch:BranchMindMap=BranchMindMap.buildDefault();
  @Input("branchSettings") 
  set branchSettings(branch:BranchMindMap)
  {
    this._branch=branch
    this.updateUI();

  }
  @HostBinding("style.left")left;
  @HostBinding("style.top")top;
  @HostBinding("style.width")lenght;
  @HostBinding("style.transform")rotation;
  @HostBinding("style.background-color")backgroundColor;



  constructor(private branchService:BranchService,private mindMapService:MindMapService, private panningService:MapPanningService)
  {
    let coordinates=this._branch.getBranchCoordinates();
    let translatedStartCoordinates=this.panningService.getTranslatedNodeCoordinates(coordinates.startPoint);
    coordinates.startPoint=translatedStartCoordinates
    this.left=coordinates.startPoint.x+"px";
    this.top=coordinates.startPoint.y+"px";
    this.lenght=coordinates.lenght+"px"
    this.rotation="rotate("+coordinates.angle+"deg)"
    this.backgroundColor=this._branch.getColor();
    
    branchService.branchChanged$.subscribe(
      {
        next: this.updateUI.bind(this)
      }
    )
    panningService.updateMapAfterTranslation$.subscribe(
      {
        next: this.updateUI.bind(this)
      }
    )
    
  }
  
  @HostListener('contextmenu', ['$event'])
  openNodeContextMenu(event: MouseEvent) {
    event.preventDefault();

    this.selectBranch();
    this.mindMapService.setMindMapContextMenuMode(MindMapContextMenuMode.BRANCH);

  }
  selectBranch() {
    this.branchService.setSelectedBranch(this._branch);
  }

  updateUI()
  {
    
    let coordinates=this._branch.getBranchCoordinates();
    let translatedStartCoordinates=this.panningService.getTranslatedNodeCoordinates(coordinates.startPoint);
    coordinates.startPoint=translatedStartCoordinates
    this.left=coordinates.startPoint.x+"px";
    this.top=coordinates.startPoint.y+"px";
    this.lenght=coordinates.lenght+"px"
    this.rotation="rotate("+coordinates.angle+"deg)"
    this.backgroundColor=this._branch.getColor()

  }



}
