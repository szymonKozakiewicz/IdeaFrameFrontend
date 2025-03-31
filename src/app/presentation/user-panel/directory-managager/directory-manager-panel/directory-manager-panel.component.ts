import { Component, HostListener, OnInit } from '@angular/core';
import { FileSystemItem } from 'src/app/core/domain/entities/file-item';
import { FileItemDTO } from 'src/app/core/dto/file-item.dto';
import { FileItemType } from 'src/app/core/enum/fileItem.enum';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';

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
  fileItemForFileItemMenu:FileSystemItem=new FileSystemItem(FileItemType.FOLDER,"")
  isFileItemListUpdateInProgress:boolean=false;
  isFileItemContextMenuVisible:boolean=false;
  contextMenuPositionStyle = { left: '0px', top: '0px' };


  constructor(private service:DirectoryManagerService,
        private moveFileItemService:MoveFileItemService) {
    
   }


  ngOnInit(): void {
    this.service.fileItemListUpdate$.subscribe({
      next:this.handleFileItemListStatusChange.bind(this)
    })
    this.updateFileItemListInService();
    this.service.updatePathInUI$.subscribe({
      next:this.updateCurrentPathInUi.bind(this)
    })
  }

  @HostListener('document:click', ['$event'])
  closeFileItemContextMenu()
  {
    this.isFileItemContextMenuVisible=false;
  }

  updateCurrentPath(path:string)
  {
    this.service.setPath(path);
    this.updateCurrentPathInUi();
    
  }

  ShowFileItemOptions(event: MouseEvent,fileInputName:string,type:FileItemType)
  {
    event.preventDefault();
    event.stopPropagation();
    let isInMoveFileItemModeActive=this.moveFileItemService.isInMoveFileItemMode();
    if(isInMoveFileItemModeActive)
    {
      return;
    }
    this.contextMenuPositionStyle.left=event.clientX+'px';
    this.contextMenuPositionStyle.top=event.pageY+'px';
    this.isFileItemContextMenuVisible=true;
    this.fileItemForFileItemMenu=new FileSystemItem(type,fileInputName);

  }

  isFolderDisabled(folderName:string):boolean
  {
    const currnetPath=this.service.getCurrentPath();
    return this.moveFileItemService.shouldFolderBeDisabled(currnetPath,folderName);
  }

  handleFileItemListStatusChange(status:OperationStatus)
  {
    if(status==OperationStatus.IN_PROGRESS)
    {
      this.isFileItemListUpdateInProgress=true;
    }
    else{
      this.updateFolderAndFilesLists();
      this.isFileItemListUpdateInProgress=false;
    }
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
