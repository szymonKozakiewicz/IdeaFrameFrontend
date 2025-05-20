import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapPanelComponent } from './mindmap-panel.component';
import { LogoComponent } from '../logo/logo.component';
import { NodeSettingsComponent } from './node-settings/node-settings.component';
import { MindMapComponent } from './mind-map/mind-map.component';

describe('MindmapPanelComponent', () => {
  let component: MindmapPanelComponent;
  let fixture: ComponentFixture<MindmapPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MindmapPanelComponent,LogoComponent,NodeSettingsComponent,MindMapComponent]
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
