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

  constructor(private service:DirectoryManagerService) { }
  ngOnInit(): void {
    this.service.fileItemListUpdated$.subscribe({
      next:this.updateFolderAndFilesLists.bind(this)
    })
    this.updateFileItemListInService();
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
