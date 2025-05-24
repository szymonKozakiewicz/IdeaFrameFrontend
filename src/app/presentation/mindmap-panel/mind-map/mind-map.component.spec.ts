import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindMapComponent } from './mind-map.component';
import { LogoComponent } from '../../logo/logo.component';
import { getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { FormsModule } from '@angular/forms';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';
import { NodeCoordinates } from 'src/app/core/domain/entities/node-coordinates';
import { min } from 'rxjs';
import { NodeMindMap } from 'src/app/core/domain/entities/node-mind-map';
import { By } from '@angular/platform-browser';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { NodeComponent } from './node/node.component';

describe('MindMapComponent', () => {
  let component: MindMapComponent;
  let fixture: ComponentFixture<MindMapComponent>;
  let mindMapServiceMock:any ;
  
  beforeEach(async () => {
      mindMapServiceMock=getMindMapMock();
    await TestBed.configureTestingModule({
      declarations: [MindMapComponent,LogoComponent,NodeComponent],
      providers: [
        {provide: MindMapService ,useValue: mindMapServiceMock}
      ],
      imports: [FormsModule,CdkDrag, CdkDropList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('after dragEnd event happend method updateSelectedNodePosition should be called', () => {
    let testNodeCordinates:NodeCoordinates=new NodeCoordinates(100,200);
    let testNode:NodeMindMap=new NodeMindMap("testNode","testNodeId","#fffaf0",testNodeCordinates,false);
    mindMapServiceMock.getNodes.and.returnValue([testNode]);
    mindMapServiceMock.mindMapUpdated$.next();
    fixture.detectChanges();

    let elementNode=getElementByTestId(fixture,"node");
    const nodeElement = fixture.debugElement.query(By.css('[data-testid="node"]'));
    const dragDirective = fixture.debugElement.query(By.directive(CdkDrag));
    const dragRef = dragDirective.injector.get(CdkDrag);
    const mockDragEndEvent = {
      source: dragRef,
      distance: { x: 100, y: 200 },
      dropPoint: { x: 100, y: 200 }
    };

    //act
    nodeElement.triggerEventHandler('cdkDragEnded', mockDragEndEvent);
    fixture.detectChanges();

    //assert
    expect(mindMapServiceMock.updateSelectedNodePosition).toHaveBeenCalled();

    
  })

});
