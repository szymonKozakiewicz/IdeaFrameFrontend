import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOperationResultComponent } from './modal-operation-result.component';
import { RegisterService } from 'src/app/core/services/register.service';
import { getDirectoryServiceMock, getRenameServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';

describe('ModalOperationResultComponent', () => {
  let component: ModalOperationResultComponent;
  let fixture: ComponentFixture<ModalOperationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalOperationResultComponent],
      providers: [
        { provide: DirectoryManagerService, useValue: getDirectoryServiceMock() },
        { provide: RenameFileItemService, useValue: getRenameServiceMock() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOperationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
