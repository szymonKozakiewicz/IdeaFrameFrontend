import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFrameRegisterLoginComponent } from './form-frame-register-login.component';
import { LogoComponent } from 'src/app/presentation/logo/logo.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/presentation/app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('FormFrameRegisterLoginComponent', () => {
  let component: FormFrameRegisterLoginComponent;
  let fixture: ComponentFixture<FormFrameRegisterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoComponent, FormFrameRegisterLoginComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFrameRegisterLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
