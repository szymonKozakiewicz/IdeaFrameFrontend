import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectoryManagerPanelComponent } from './directory-manager-panel.component';

describe('DirectoryManagerPanelComponent', () => {
  let component: DirectoryManagerPanelComponent;
  let fixture: ComponentFixture<DirectoryManagerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DirectoryManagerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectoryManagerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
