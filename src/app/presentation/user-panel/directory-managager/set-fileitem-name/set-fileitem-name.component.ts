import { AfterViewInit, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, lastValueFrom, map, Observable, tap } from 'rxjs';
import { FileItemType } from 'src/app/core/enum/fileItem.enum';
import { InputValidationStatus } from 'src/app/core/enum/inputValidationStatus';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { Modal } from 'bootstrap';


@Component({
  selector: 'set-fileitem-name',
  templateUrl: './set-fileitem-name.component.html',
  styleUrl: './set-fileitem-name.component.css'
})
export class SetFileitemNameComponent {

    newFileFolderForm!: FormGroup;
    errorMessage:string="";
   
    operationStatus=OperationStatus.NOT_STARTED;
    fileItemNameStatus=InputValidationStatus.EMPTY;
    fileItemNameFrontendStatus=InputValidationStatus.EMPTY;
    actionName="Add new folder"
    fileItemTypeName="folder"
    isInFileItemNameEditMode:boolean=false;
  
    constructor(private directoryManagerService:DirectoryManagerService,
      private renameFileItemService:RenameFileItemService) {

  
    }


  
  ngOnInit(): void {
  
      this.createReactiveForm();
      this.subscribeLoginValueChangeToUpdateLoginCheckingInProgressProperty();
      this.renameFileItemService.switchRenameFileTimeMode$.subscribe({
        next: this.setModalInFileRenameMode.bind(this)
      })
      
  }

  private setModalInFileRenameMode(isRenameModeActive:boolean) 
  {
    if(isRenameModeActive)
    {
      this.setModalInEditFileItemMode();
      this.showModal();
    }
    else{
      this.setActioNameForAddingFileItem();
    }

  }

  private setActioNameForAddingFileItem() {
    let fileItemTypeName = this.directoryManagerService.getFileItemToChangeType()===FileItemType.FILE?"file":"folder";
    this.actionName="Add new "+fileItemTypeName;
    this.fileItemTypeName=this.capitalizeFirstLetter(fileItemTypeName);

  }

  private setModalInEditFileItemMode()
  {
    let fileItemTypeName = this.getEditedFileItemTypeName();
    this.actionName="Rename "+fileItemTypeName; 
    this.fileItemTypeName=this.capitalizeFirstLetter(fileItemTypeName);

  }



  private getEditedFileItemTypeName() {
    let fileItemTypeName = "folder";
    if (this.renameFileItemService.isEditedFileItemAFile())
      fileItemTypeName = "file";
    return fileItemTypeName;
  }

  private showModal(){

    let modal=this.getModalInstance();
    modal?.show();
    
  }

  private getModalInstance()
  {
    let modalInstance;
    const modalElement = document.getElementById('fileItemNameModal');
    if (modalElement) {
      modalInstance = new Modal(modalElement);
    }
    return modalInstance;
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

    capitalizeFirstLetter(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
    private setErrorMessage() {
      let fileItemName="Folder";
      let fileItemType=this.directoryManagerService.getFileItemToChangeType();
      if (fileItemType === FileItemType.FILE) {
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
      this.setActioNameForAddingFileItem();
      if(this.isInFileItemNameEditMode)
      {
        this.renameFileItemService.cancelRenameFileItemMode();
      }
    }
    
    async submitForm(){
      const control=this.newFileFolderForm.get("fileOrFolderName");
      await this.waitUntilAsyncValidationFinished(control);
      if(this.newFileFolderForm.invalid){
        control?.markAsTouched();
        return;
      }

      let fileName=control?.value
      if(this.renameFileItemService.isEditModeActive)
      {
          this.renameFileItemService.sendRequestToEditFileItem(fileName)
      }
      else {

        this.directoryManagerService.sendRequestToAddNewFileItem(fileName);
      }
      
      this.operationStatus=OperationStatus.IN_PROGRESS;
    }


  
    private async waitUntilAsyncValidationFinished(control: AbstractControl<any, any> | null) {
      await lastValueFrom(this.isFolderNameAvailableValidator(control!));
    }
  
    isFolderNameAvailableValidator(control:AbstractControl):Observable<ValidationErrors|null>
    {
      this.fileItemNameStatus=InputValidationStatus.CHECKING_IN_PROGRESS;
      const folderName=control.value;
      let fileItemType=this.directoryManagerService.getFileItemToChangeType();
      let observable=this.directoryManagerService.checkIfFileItemNameAvailable(folderName,fileItemType).pipe(
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
