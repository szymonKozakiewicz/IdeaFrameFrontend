import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOperationResultComponent } from './register-operation-result.component';

describe('RegisterOperationResultComponent', () => {
  let component: RegisterOperationResultComponent;
  let fixture: ComponentFixture<RegisterOperationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterOperationResultComponent]
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
