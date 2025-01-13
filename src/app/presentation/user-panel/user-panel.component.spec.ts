import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPanelComponent } from './user-panel.component';
import { LoginService } from 'src/app/core/services/login.service';
import { getLoginServiceMock, getUserPanelServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { UserPanelService } from 'src/app/core/services/user-panel.service';

describe('UserPanelComponent', () => {
  let component: UserPanelComponent;
  let fixture: ComponentFixture<UserPanelComponent>;

  beforeEach(async () => {
    let loginServiceMock=getLoginServiceMock();
    let userPanelServiceMock=getUserPanelServiceMock()
    await TestBed.configureTestingModule({
      declarations: [UserPanelComponent],
      providers: [
        { provide: LoginService, useValue: loginServiceMock },
        { provide: UserPanelService, useValue: userPanelServiceMock }
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
