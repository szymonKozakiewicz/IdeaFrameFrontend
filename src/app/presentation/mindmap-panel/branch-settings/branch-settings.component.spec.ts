import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSettingsComponent } from './branch-settings.component';

describe('BranchSettingsComponent', () => {
  let component: BranchSettingsComponent;
  let fixture: ComponentFixture<BranchSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
