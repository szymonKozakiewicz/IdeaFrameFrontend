import { Component, Input } from '@angular/core';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

@Component({
  selector: 'modal-operation-result',
  templateUrl: './modal-operation-result.component.html',
  styleUrl: './modal-operation-result.component.css'
})
export class ModalOperationResultComponent {

    @Input("operationDescription") operationDescription:string="";
    @Input("operationStatus")operationStatus:OperationStatus=OperationStatus.IN_PROGRESS;
    @Input("operationStatusName")operationStatusName:string="Success!"
   

    constructor(private directoryService:DirectoryManagerService)
    {
      this.directoryService.operationStatus$.subscribe({
        next:this.setOperationStatus.bind(this)
      })
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
