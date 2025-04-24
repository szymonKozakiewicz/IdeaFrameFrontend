import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileItemComponent } from './file-item.component';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { getDirectoryServiceMock, getMoveFileItemServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';

describe('FileItemComponent', () => {
  let component: FileItemComponent;
  let fixture: ComponentFixture<FileItemComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileItemComponent],
      providers: [
        {provide:DirectoryManagerService, useValue:getDirectoryServiceMock()},
        {provide:MoveFileItemService, useValue:getMoveFileItemServiceMock()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
