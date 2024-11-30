import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOperationResultComponent } from './register-operation-result.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomHttpClient } from 'src/app/infrastructure/http/custom-http-client';
import { of, Subject } from 'rxjs';
import { OperationResultComponent } from '../operation-result/operation-result.component';
import { LogoComponent } from '../../logo/logo.component';
import { RegisterService } from 'src/app/core/services/register.service';
import { OperationStatus } from 'src/app/core/enum/operation.status';
import { getRegisterServiceMock } from 'src/app/testHelpers/service-mock-generator';

describe('RegisterOperationResultComponent', () => {
  let component: RegisterOperationResultComponent;
  let fixture: ComponentFixture<RegisterOperationResultComponent>;

  beforeEach(async () => {

    const registerServiceMock = getRegisterServiceMock();
    await TestBed.configureTestingModule({
      declarations: [RegisterOperationResultComponent,OperationResultComponent,LogoComponent],
      imports: [BrowserModule,AppRoutingModule, FormsModule,ReactiveFormsModule],
      providers:[
        {provide: RegisterService, useValue:registerServiceMock}
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterOperationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});


