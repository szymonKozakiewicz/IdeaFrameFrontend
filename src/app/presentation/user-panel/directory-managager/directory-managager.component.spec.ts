import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryManagagerComponent } from './directory-managager.component';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { getDirectoryServiceMock, getMoveFileItemServiceMock, getRenameServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { DirectoryManagerPanelComponent } from './directory-manager-panel/directory-manager-panel.component';
import { SetFileitemNameComponent } from './set-fileitem-name/set-fileitem-name.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DirectoryManagagerComponent', () => {
  let component: DirectoryManagagerComponent;
  let fixture: ComponentFixture<DirectoryManagagerComponent>;
  let directoryManagerServiceMock=getDirectoryServiceMock();

  beforeEach(async () => {
    directoryManagerServiceMock=getDirectoryServiceMock();
    await TestBed.configureTestingModule({
      declarations: [DirectoryManagagerComponent,DirectoryManagerPanelComponent,SetFileitemNameComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
      providers:[
        {provide:DirectoryManagerService,useValue:directoryManagerServiceMock},
        {provide:RenameFileItemService,useValue:getRenameServiceMock()},
        {provide:MoveFileItemService,useValue:getMoveFileItemServiceMock()}
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryManagagerComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method setupModalForOperationAddFileItem from directory service',()=>
  {

    let btnAddFolder=fixture.debugElement.nativeElement.querySelector('[data-testid="createFolderBtn"]');
   
   //act
    btnAddFolder.dispatchEvent(new Event("click"));
    fixture.detectChanges();

    //assert
    expect(directoryManagerServiceMock.setupModalForOperationAddFileItem).toHaveBeenCalled();
  })


});
