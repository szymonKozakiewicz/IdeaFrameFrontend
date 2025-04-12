import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, lastValueFrom, map, Observable, tap } from 'rxjs';
import { FileItemType } from 'src/app/core/enum/fileItem.enum';
import { InputValidationStatus } from 'src/app/core/enum/inputValidationStatus';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';



@Component({
  selector: 'add-folder-file',
  templateUrl: './add-folder-file.component.html',
  styleUrl: './add-folder-file.component.css'
})
export class AddFolderFileComponent implements OnInit{
  
  newFileFolderForm!: FormGroup;
  errorMessage:string="";
  fileItemType=FileItemType.FOLDER;
  operationStatus=OperationStatus.NOT_STARTED;
  fileItemNameStatus=InputValidationStatus.EMPTY;
  fileItemNameFrontendStatus=InputValidationStatus.EMPTY;

  constructor(private directoryManagerService:DirectoryManagerService) {

   }

  ngOnInit(): void {

    this.createReactiveForm();
    this.subscribeLoginValueChangeToUpdateLoginCheckingInProgressProperty();
    
    
  }



  private createReactiveForm() {
    this.newFileFolderForm = new FormGroup({
      fileOrFolderName: new FormControl(
        '', [Validators.required,Validators.maxLength(20)],
         [this.isFolderNameAvailableValidator.bind(this)])
    });
    
    this.directoryManagerService.resetModal$.subscribe({
      next: this.resetModal.bind(this)
    });
  }

  isFileItemNameInvalidAndTouched()
  {
    const control=this.newFileFolderForm.get('fileOrFolderName');
    const folderNameOk=!(control?.touched && control?.invalid)

    if(folderNameOk)
    {
      return false;
    }

    this.setErrorMessage();
    return true;

  }
  
  private setErrorMessage() {
    let fileItemName="Folder";

    if (this.fileItemType === FileItemType.FILE) {
      fileItemName = "Mind map";
    }

    if (this.isInputInvalidWithValidator("fileOrFolderName", "required")) {
      this.errorMessage = `${fileItemName} name is required`;
    }

    if (this.isInputInvalidWithValidator("fileOrFolderName", "maxlength")) {
      this.errorMessage = `${fileItemName} name can't has more than 20 characters`;
    }

    if (this.isInputInvalidWithValidator("fileOrFolderName", "itemNameNotAvailable")) {
      this.errorMessage = `${fileItemName} with this name already exists`;
    }
    return fileItemName;
  }

  resetModal()
  {
    this.newFileFolderForm.reset();
    this.operationStatus=OperationStatus.NOT_STARTED;
  }

  async addNewFolder(){

    
    const control=this.newFileFolderForm.get("fileOrFolderName");
    await this.waitUntilAsyncValidationFinished(control);
    if(this.newFileFolderForm.invalid){
      control?.markAsTouched();
      return;
    }
    let fileName=control?.value
    this.directoryManagerService.sendRequestToAddNewFileItem(fileName,this.fileItemType);
    this.operationStatus=OperationStatus.IN_PROGRESS;

  }

  private async waitUntilAsyncValidationFinished(control: AbstractControl<any, any> | null) {
    await lastValueFrom(this.isFolderNameAvailableValidator(control!));
  }

  isFolderNameAvailableValidator(control:AbstractControl):Observable<ValidationErrors|null>
  {
    this.fileItemNameStatus=InputValidationStatus.CHECKING_IN_PROGRESS;
    const folderName=control.value;
    let observable=this.directoryManagerService.checkIfFileItemNameAvailable(folderName,this.fileItemType).pipe(
          tap( this.setFileItemNameStatusBasedOnBackendInfo()),
          map(this.transformToNullAndErrorMessage()) 
        )
    
        return observable;

  }


  isCheckingNameInProgress()
  {
    return this.fileItemNameFrontendStatus===InputValidationStatus.CHECKING_IN_PROGRESS;
  }

  private subscribeLoginValueChangeToUpdateLoginCheckingInProgressProperty() {
    const nameInput = this.newFileFolderForm.get("fileOrFolderName");
    nameInput?.valueChanges.pipe(
      debounceTime(100)
    ).subscribe(
      {
        next: (value) => {
          if(this.fileItemNameStatus===InputValidationStatus.CHECKING_IN_PROGRESS )
            this.fileItemNameFrontendStatus=this.fileItemNameStatus;
          
        }
      }
    );
  }




  private setFileItemNameStatusBasedOnBackendInfo() {
    return {
        next: (nameAvailable: boolean) => {
        
        if (nameAvailable)
        {
            this.fileItemNameStatus = InputValidationStatus.VALID;
        }
        else{
          this.fileItemNameStatus = InputValidationStatus.INVALID;
            
        }
        this.fileItemNameFrontendStatus=this.fileItemNameStatus

        }
    };
  }

  private transformToNullAndErrorMessage() {
    return (nameAvailable: boolean) => {
        if (nameAvailable) {
            return null;
        } else {
            return {
                itemNameNotAvailable: true
            };
        }
    };
  }

  private isInputInvalidWithValidator(inputName:string,validatorName:string)
  {
    return this.newFileFolderForm.get(inputName)?.errors?.[validatorName];
  }



  isOperationLaunched()
  {
    return this.operationStatus!==OperationStatus.NOT_STARTED;
  }

}
