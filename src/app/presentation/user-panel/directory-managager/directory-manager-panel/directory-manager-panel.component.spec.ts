import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryManagerPanelComponent } from './directory-manager-panel.component';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { getDirectoryServiceMock, getMoveFileItemServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('DirectoryManagerPanelComponent', () => {
  let component: DirectoryManagerPanelComponent;
  let fixture: ComponentFixture<DirectoryManagerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryManagerPanelComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
      providers: [
        {provide:DirectoryManagerService,useValue:getDirectoryServiceMock()},
        {provide:MoveFileItemService,useValue:getMoveFileItemServiceMock()}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryManagerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
