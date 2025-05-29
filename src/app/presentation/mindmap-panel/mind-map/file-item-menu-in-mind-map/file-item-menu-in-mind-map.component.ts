import { Component, Host, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MindMapService } from 'src/app/core/services/mind-map.service';

@Component({
  selector: 'file-item-menu-in-mind-map',
  templateUrl: './file-item-menu-in-mind-map.component.html',
  styleUrl: './file-item-menu-in-mind-map.component.css'
})
export class FileItemMenuInMindMapComponent {
  @Input("fileItemName") fileItemName: string = "";
  isFileItemMenuVisible: boolean = false;

  constructor(private mindMapService: MindMapService, private router: Router) { 
    
  }

  openFileItemMenu(event: MouseEvent) {
    event.stopPropagation();
    this.isFileItemMenuVisible = true;
  }

  closeFileItemMenu() {
    if(this.isFileItemMenuVisible){
      this.isFileItemMenuVisible = false;
    }
  }

  closeMindMap(){
    this.router.navigate(['/userPanel']);
  }

  @HostListener("document:click", ["$event"])
  closeFileItemMenuOnDocumentClick(event: MouseEvent) {
    this.closeFileItemMenu();
  }


  saveMap(){
    this.mindMapService.saveMindMap();
  }




}
