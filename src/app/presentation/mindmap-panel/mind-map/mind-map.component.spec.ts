import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindMapComponent } from './mind-map.component';
import { LogoComponent } from '../../logo/logo.component';
import { getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { FormsModule } from '@angular/forms';

describe('MindMapComponent', () => {
  let component: MindMapComponent;
  let fixture: ComponentFixture<MindMapComponent>;
  let mindMapServiceMock:any ;
  
  beforeEach(async () => {
      mindMapServiceMock=getMindMapMock();
    await TestBed.configureTestingModule({
      declarations: [MindMapComponent,LogoComponent],
      providers: [
        {provide: MindMapService ,useValue: mindMapServiceMock}
      ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
