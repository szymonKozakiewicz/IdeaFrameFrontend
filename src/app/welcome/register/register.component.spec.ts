import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { LogoComponent } from 'src/app/logo/logo.component';
import { LoginComponent } from '../login/login.component';
import { FormFrameRegisterLoginComponent } from '../form-frame-register-login/form-frame-register-login.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent,LoginComponent, FormFrameRegisterLoginComponent, RegisterComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
