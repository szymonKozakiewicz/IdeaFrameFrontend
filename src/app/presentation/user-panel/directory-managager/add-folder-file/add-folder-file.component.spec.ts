import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFolderFileComponent } from './add-folder-file.component';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { getDirectoryServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddFolderFileComponent', () => {
  let component: AddFolderFileComponent;
  let fixture: ComponentFixture<AddFolderFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFolderFileComponent],
      imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
      providers: [
        {provide: DirectoryManagerService, useValue: getDirectoryServiceMock()},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFolderFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
