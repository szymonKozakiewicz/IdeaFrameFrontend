import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOperationResultComponent } from './modal-operation-result.component';

describe('ModalOperationResultComponent', () => {
  let component: ModalOperationResultComponent;
  let fixture: ComponentFixture<ModalOperationResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalOperationResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalOperationResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
