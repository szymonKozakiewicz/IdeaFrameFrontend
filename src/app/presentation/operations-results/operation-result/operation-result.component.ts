import { Component, Input } from '@angular/core';
import { OperationStatus } from 'src/app/core/enum/operation.status';

@Component({
  selector: 'operation-result',
  templateUrl: './operation-result.component.html',
  styleUrl: './operation-result.component.css'
})
export class OperationResultComponent {
    @Input("operationDescription") operationDescription:string="";
    @Input("buttonText") buttonText="";
    @Input("buttonLink")buttonLink="";
    @Input("operationStatus")operationStatus:OperationStatus=OperationStatus.IN_PROGRESS;
    
    isOperationInProgress():boolean
    {
      return this.operationStatus==OperationStatus.IN_PROGRESS;
    }

}
