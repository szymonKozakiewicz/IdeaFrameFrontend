import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelComponent } from './user-panel.component';
import { LoginService } from 'src/app/core/services/login.service';
import { getDirectoryServiceMock, getLoginServiceMock, getMoveFileItemServiceMock, getRenameServiceMock, getUserPanelServiceMock, getUserServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { UserPanelService } from 'src/app/core/services/user-panel.service';
import { LogoComponent } from '../logo/logo.component';
import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { DirectoryManagagerComponent } from './directory-managager/directory-managager.component';
import { UserService } from 'src/app/core/services/user.service';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectoryManagerService } from 'src/app/core/services/directory-manager.service';
import { MoveFileItemDto } from 'src/app/core/dto/move-file-item.dto';
import { MoveFileItemService } from 'src/app/core/services/move-file-item.service';
import { RenameFileItemService } from 'src/app/core/services/rename-file-item.service';
import { DirectoryManagerPanelComponent } from './directory-managager/directory-manager-panel/directory-manager-panel.component';
import { SetFileitemNameComponent } from './directory-managager/set-fileitem-name/set-fileitem-name.component';

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async () => {
    let loginServiceMock=getLoginServiceMock();
    let userPanelServiceMock=getUserPanelServiceMock()
    await TestBed.configureTestingModule({
      declarations: [UserPanelComponent,LogoComponent,UserAvatarComponent,DirectoryManagagerComponent, DirectoryManagerPanelComponent,SetFileitemNameComponent],
      imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: UserPanelService, useValue: userPanelServiceMock },
        { provide: UserService, useValue: getUserServiceMock() },
        { provide: DirectoryManagerService, useValue: getDirectoryServiceMock() },
        { provide: MoveFileItemService, useValue: getMoveFileItemServiceMock() },
        { provide: RenameFileItemService, useValue: getRenameServiceMock() }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
