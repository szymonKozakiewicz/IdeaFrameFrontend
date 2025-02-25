import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileItemType } from 'src/app/core/enum/fileItem.enum';
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

  constructor(private directoryManagerService:DirectoryManagerService) {

   }

  ngOnInit(): void {
    this.newFileFolderForm=new FormGroup({
      fileOrFolderName:new FormControl('',Validators.required)
    })
    this.directoryManagerService.resetModal$.subscribe({
      next:this.resetModal.bind(this)
    })
    
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
    return fileItemName;
  }

  resetModal()
  {
    this.newFileFolderForm.reset();
    this.operationStatus=OperationStatus.NOT_STARTED;
  }

  addNewFolder(){

    const control=this.newFileFolderForm.get("fileOrFolderName");
    if(this.newFileFolderForm.invalid){
      control?.markAsTouched();
      return;
    }
    let fileName=control?.value
    this.directoryManagerService.sendRequestToAddNewFileItem(fileName,this.fileItemType);
    this.operationStatus=OperationStatus.IN_PROGRESS;

  }

  isInputInvalidWithValidator(inputName:string,validatorName:string)
  {
    return this.newFileFolderForm.get(inputName)?.errors?.[validatorName];
  }



  isOperationLaunched()
  {
    return this.operationStatus!==OperationStatus.NOT_STARTED;
  }

}
