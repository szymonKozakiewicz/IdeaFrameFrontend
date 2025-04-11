import { Component, Input, OnInit } from '@angular/core';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';

@Component({
  selector: 'modal-operation-result',
  templateUrl: './modal-operation-result.component.html',
  styleUrl: './modal-operation-result.component.css'
})
export class ModalOperationResultComponent implements OnInit {

    @Input("operationDescription") operationDescription:string="";
    @Input("operationStatus")operationStatus:OperationStatus=OperationStatus.IN_PROGRESS;
    @Input("operationStatusName")operationStatusName:string="Success!"
   

    constructor(private directoryService:DirectoryManagerService,
      private renameFileItemService:RenameFileItemService
    )
    {
 

    }
    ngOnInit(): void {
      this.directoryService.addFileItemOperationStatus$.subscribe({
        next:this.setOperationStatus.bind(this)
      })
      this.renameFileItemService.editFileItemOperationStatus$.subscribe(
        {
          next:this.setOperationStatus.bind(this)
        }
      )
    }
    isOperationInProgress():boolean
    {
      return this.operationStatus==OperationStatus.IN_PROGRESS;
    }
    
    isOperationSuccess()
    {
      return this.operationStatus==OperationStatus.SUCCESS;
    }

    setOperationStatus(status:OperationStatus)
    {

      this.operationStatus=status;

    }
}
