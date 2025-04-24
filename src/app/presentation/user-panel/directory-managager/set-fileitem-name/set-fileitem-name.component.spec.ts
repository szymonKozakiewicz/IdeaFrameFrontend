import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetFileitemNameComponent } from './set-fileitem-name.component';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { getDirectoryServiceMock, getRenameServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('SetFileitemNameComponent', () => {
  let component: SetFileitemNameComponent;
  let fixture: ComponentFixture<SetFileitemNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetFileitemNameComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
      providers: [
        {provide: RenameFileItemService, useValue: getRenameServiceMock()},
        {provide: DirectoryManagerService, useValue: getDirectoryServiceMock()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetFileitemNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
