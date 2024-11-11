import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoComponent } from './logo/logo.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './welcome/login/login.component';
import { FormFrameRegisterLoginComponent } from './welcome/form-frame-register-login/form-frame-register-login.component';
import { RegisterComponent } from './welcome/register/register.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent,LogoComponent,WelcomeComponent,LoginComponent, FormFrameRegisterLoginComponent, RegisterComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });



});
