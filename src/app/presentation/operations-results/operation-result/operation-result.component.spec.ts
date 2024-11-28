import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationResultComponent } from './operation-result.component';
import { LogoComponent } from '../../logo/logo.component';

describe('OperationResultComponent', () => {
  let component: OperationResultComponent;
  let fixture: ComponentFixture<OperationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationResultComponent, LogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
