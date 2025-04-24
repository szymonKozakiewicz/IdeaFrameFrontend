import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuComponent } from './user-menu.component';
import { LoginService } from 'src/app/core/services/login.service';
import { getLoginServiceMock } from 'src/app/testHelpers/service-mock-generator';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserMenuComponent, UserAvatarComponent],
      providers: [
        {provide: LoginService, useValue: getLoginServiceMock()},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
