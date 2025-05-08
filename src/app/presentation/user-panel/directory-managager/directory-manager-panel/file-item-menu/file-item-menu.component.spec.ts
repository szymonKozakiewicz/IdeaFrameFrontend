import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileItemMenuComponent } from './file-item-menu.component';
import { getDirectoryServiceMock, getMoveFileItemServiceMock, getRenameServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

describe('FileItemMenuComponent', () => {
  let component: FileItemMenuComponent;
  let fixture: ComponentFixture<FileItemMenuComponent>;
  let directoryServiceMock:DirectoryManagerService=getDirectoryServiceMock();
  let moveFileItemServiceMock:MoveFileItemService=getMoveFileItemServiceMock();
  let renameFileItemServiceMock:RenameFileItemService=getRenameServiceMock();

  beforeEach(async () => {
    directoryServiceMock=getDirectoryServiceMock();
    moveFileItemServiceMock=getMoveFileItemServiceMock();
    await TestBed.configureTestingModule({
      declarations: [FileItemMenuComponent],
      providers:[
              {provide:DirectoryManagerService,useValue:directoryServiceMock},
              {provide:RenameFileItemService,useValue:renameFileItemServiceMock},
              {provide:MoveFileItemService,useValue:moveFileItemServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileItemMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call removeFileItem method of directoryService when remove button is called', () => {
    
    let btnRemove=fixture.debugElement.nativeElement.querySelector('[data-testid="removeBtn"]');
    
    //act
    btnRemove.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //assert
    expect(directoryServiceMock.removeFileItem).toHaveBeenCalledWith(component.selectedFileItem);
  })

  it('should call eneterIntoMoveFileItemMode method of moveFileItemService when move button is called', () => {
    
    let btnMove=fixture.debugElement.nativeElement.querySelector('[data-testid="moveBtn"]');
    
    //act
    btnMove.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //assert
    expect(moveFileItemServiceMock.eneterIntoMoveFileItemMode).toHaveBeenCalledWith(component.selectedFileItem);
  })

  it('should call enterIntoNameEditMode method of renameFileItemService when rename button is called', () => {
    
    let btnRename=fixture.debugElement.nativeElement.querySelector('[data-testid="renameBtn"]');
    
    //act
    btnRename.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //assert
    expect(renameFileItemServiceMock.enterIntoNameEditMode).toHaveBeenCalledWith(component.selectedFileItem);
  })



});
