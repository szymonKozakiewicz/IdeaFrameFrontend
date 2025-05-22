import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSettingsComponent } from './node-settings.component';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { FormsModule } from '@angular/forms';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';

describe('NodeSettingsComponent', () => {
  let component: NodeSettingsComponent;
  let fixture: ComponentFixture<NodeSettingsComponent>;
  let mindMapServiceMock:any ;

  beforeEach(async () => {
    mindMapServiceMock=getMindMapMock();
    await TestBed.configureTestingModule({
      declarations: [NodeSettingsComponent],
      providers: [
        {provide: MindMapService ,useValue: mindMapServiceMock}
      ],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("after node name changed it should trigger updateSelectedNodeName from mindMapService",()=>{

    //arrange
    let textArea=getElementByTestId(fixture,"nameInput");

    //act
    textArea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    //assert
    expect(mindMapServiceMock.updateSelectedNodeName).toHaveBeenCalled();

  })
});
