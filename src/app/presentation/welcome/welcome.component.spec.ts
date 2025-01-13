import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { LogoComponent } from '../logo/logo.component';
import { LoginComponent } from './login/login.component';
import { FormFrameRegisterLoginComponent } from './form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from './register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getLoginServiceMock } from 'src/app/testHelpers/service-mock-generator';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LogoComponent,WelcomeComponent,LoginComponent, FormFrameRegisterLoginComponent, RegisterComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
