import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationResultComponent } from './operation-result.component';
import { LogoComponent } from '../../logo/logo.component';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';

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
  
  it('no signal emited, expected t that loading page will be visible', () => {
    let loadingPageDiv:HTMLElement=getElementByTestId(fixture,"progressPage");
    let resultPageDiv:HTMLElement=getElementByTestId(fixture,"resultPage");
    expect(loadingPageDiv).toBeTruthy();
    expect(resultPageDiv).toBeFalsy();
  });
});
