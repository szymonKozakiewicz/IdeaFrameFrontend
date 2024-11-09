import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFrameRegisterLoginComponent } from './form-frame-register-login.component';

describe('FormFrameRegisterLoginComponent', () => {
  let component: FormFrameRegisterLoginComponent;
  let fixture: ComponentFixture<FormFrameRegisterLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFrameRegisterLoginComponent]
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
