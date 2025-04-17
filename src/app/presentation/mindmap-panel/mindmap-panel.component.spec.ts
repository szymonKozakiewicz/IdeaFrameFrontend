import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapPanelComponent } from './mindmap-panel.component';

describe('MindmapPanelComponent', () => {
  let component: MindmapPanelComponent;
  let fixture: ComponentFixture<MindmapPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MindmapPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindmapPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
