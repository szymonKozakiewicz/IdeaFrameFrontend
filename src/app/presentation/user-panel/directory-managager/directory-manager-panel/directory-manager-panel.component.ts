import { Component, OnInit } from '@angular/core';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

@Component({
  selector: 'directory-manager-panel',
  templateUrl: './directory-manager-panel.component.html',
  styleUrl: './directory-manager-panel.component.css'
})
export class DirectoryManagerPanelComponent implements OnInit {



  folders:Array<string>=[];
  files:Array<string>=[];
  segmentsWithPaths:Array<{segment:string,path:string}>=[];
  currentFolder:string=""
  isInHomeDirectory:boolean=true;

  constructor(private service:DirectoryManagerService) { }


  ngOnInit(): void {
    this.service.fileItemListUpdated$.subscribe({
      next:this.updateFolderAndFilesLists.bind(this)
    })
    this.updateFileItemListInService();
    this.service.updatePathInUI$.subscribe({
      next:this.updateCurrentPathInUi.bind(this)
    })
  }

  updateCurrentPath(path:string)
  {
    this.service.setPath(path);
    this.updateCurrentPathInUi();
    
  }



  updateCurrentPathInUi()
  {
    this.isInHomeDirectory=this.service.isUserInHomeDirectory();
    let pathWithoutLastSegment=this.service.getPathWithoutLastSegment();
    
    let segmentsWithPathsToIt=this.service.getPathsSegmentsWithPathsToIt(pathWithoutLastSegment);
    this.currentFolder=this.service.getCurrentFolder();
   
    this.segmentsWithPaths=segmentsWithPathsToIt;
  }

  updateFolderAndFilesLists()
  {
    this.files=this.service.getFiles();
    this.folders=this.service.getFolders();
  }

  updateFileItemListInService()
  {
    this.service.updateFolderAndItemList();
  }



}
