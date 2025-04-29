import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SetFileitemNameComponent } from './set-fileitem-name.component';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { getDirectoryServiceMock, getRenameServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getErrorMessageElement } from './set-fileitem-name.testHelper';
import { of } from 'rxjs';
import { FileItemType } from 'src/app/core/enum/fileItem.enum';

describe('SetFileitemNameComponent', () => {
  let component: SetFileitemNameComponent;
  let fixture: ComponentFixture<SetFileitemNameComponent>;
  let nameInput: HTMLInputElement;
  
  let directoryManagerServiceMock:any
  let renameFileItemServiceMock:any

  beforeEach(async () => {

    directoryManagerServiceMock=getDirectoryServiceMock();
    renameFileItemServiceMock=getRenameServiceMock();
    
    await TestBed.configureTestingModule({
      declarations: [SetFileitemNameComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
      providers: [
        {provide: RenameFileItemService, useValue: getRenameServiceMock()},
        {provide: DirectoryManagerService, useValue: directoryManagerServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetFileitemNameComponent);
    component = fixture.componentInstance;
    nameInput=fixture.debugElement.nativeElement.querySelector('[data-testid="nameInput"]');
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("it shouldn't be any error message if input has correct name and is touched",fakeAsync(async ()=>{
    //arrange
    let errorMessage: HTMLElement;
    directoryManagerServiceMock.checkIfFileItemNameAvailable.and.returnValue(of(true));
    directoryManagerServiceMock.getFileItemToChangeType.and.returnValue(FileItemType.FILE);
    nameInput=fixture.debugElement.nativeElement.querySelector('[data-testid="nameInput"]');
    nameInput.value="test";
    nameInput.dispatchEvent(new Event("input"));
    nameInput.dispatchEvent(new Event("blur"));
    fixture.detectChanges();


    //act
    tick(1000);
    fixture.detectChanges();
    errorMessage=getErrorMessageElement(fixture);

    //assert
    expect(errorMessage).toBeNull();


   
  }))


  it("it should be error message if input hasn't got correct name and is touched",fakeAsync(async ()=>{
    //arrange
    let errorMessage: HTMLElement;
    directoryManagerServiceMock.checkIfFileItemNameAvailable.and.returnValue(of(false));
    directoryManagerServiceMock.getFileItemToChangeType.and.returnValue(FileItemType.FILE);
    renameFileItemServiceMock.isEditModeActive=false;
    nameInput=fixture.debugElement.nativeElement.querySelector('[data-testid="nameInput"]');
    nameInput.value="test";
    nameInput.dispatchEvent(new Event("input"));
    nameInput.dispatchEvent(new Event("blur"));
    fixture.detectChanges();
    



    //act
    tick(1000);
    fixture.detectChanges();
    errorMessage=getErrorMessageElement(fixture);

    //assert
    expect(errorMessage).not.toBeNull();


   
  }))


  it("after submit button is clicked and input is correct then request to add new file item should be sent", fakeAsync(async ()=>{
    //arrange
    directoryManagerServiceMock.checkIfFileItemNameAvailable.and.returnValue(of(true));
    directoryManagerServiceMock.getFileItemToChangeType.and.returnValue(FileItemType.FILE);
    
    nameInput=fixture.debugElement.nativeElement.querySelector('[data-testid="nameInput"]');
    nameInput.value="test";
    nameInput.dispatchEvent(new Event("input"));
    fixture.detectChanges();
    tick(1000);
    let form=fixture.debugElement.nativeElement.querySelector('[data-testid="fileItemNameForm"]');


    //act
    form.dispatchEvent(new Event("submit"));
    fixture.detectChanges();
    tick(1000);

    //assert
    expect(directoryManagerServiceMock.sendRequestToAddNewFileItem).toHaveBeenCalled();
  }))
});
