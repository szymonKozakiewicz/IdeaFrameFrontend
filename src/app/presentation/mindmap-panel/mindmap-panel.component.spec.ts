import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindmapPanelComponent } from './mindmap-panel.component';
import { LogoComponent } from '../logo/logo.component';
import { NodeSettingsComponent } from './node-settings/node-settings.component';
import { MindMapComponent } from './mind-map/mind-map.component';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { FormsModule } from '@angular/forms';

describe('MindmapPanelComponent', () => {
  let component: MindmapPanelComponent;
  let fixture: ComponentFixture<MindmapPanelComponent>;
  let mindMapServiceMock:any ;
  beforeEach(async () => {
    mindMapServiceMock=getMindMapMock();
    await TestBed.configureTestingModule({
      declarations: [MindmapPanelComponent,LogoComponent,NodeSettingsComponent,MindMapComponent],
      providers: [
        {provide: MindMapService ,useValue: mindMapServiceMock}
      ],
      imports: [FormsModule]
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
