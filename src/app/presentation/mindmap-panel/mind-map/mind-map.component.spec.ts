import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindMapComponent } from './mind-map.component';
import { LogoComponent } from '../../logo/logo.component';

describe('MindMapComponent', () => {
  let component: MindMapComponent;
  let fixture: ComponentFixture<MindMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MindMapComponent,LogoComponent]
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
