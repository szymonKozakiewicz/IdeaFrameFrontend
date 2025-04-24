import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileItemMenuComponent } from './file-item-menu.component';
import { getDirectoryServiceMock, getMoveFileItemServiceMock, getRenameServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';

describe('FileItemMenuComponent', () => {
  let component: FileItemMenuComponent;
  let fixture: ComponentFixture<FileItemMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileItemMenuComponent],
      providers:[
              {provide:DirectoryManagerService,useValue:getDirectoryServiceMock()},
              {provide:RenameFileItemService,useValue:getRenameServiceMock()},
              {provide:MoveFileItemService,useValue:getMoveFileItemServiceMock()}
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
});
