import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeContextMenuComponent } from './node-context-menu.component';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';

describe('NodeContextMenuComponent', () => {
  let component: NodeContextMenuComponent;
  let fixture: ComponentFixture<NodeContextMenuComponent>;
  let mindMapServiceMock:any ;

  beforeEach(async () => {
    mindMapServiceMock=getMindMapMock();
    await TestBed.configureTestingModule({
      declarations: [NodeContextMenuComponent],
      providers: [
        {provide:MindMapService,useValue:mindMapServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run addNewNode after create node button', () => {
    
    //arrange
    let btnCreateNode=getElementByTestId(fixture,"nodeCreateBtn");
    
    //act
    btnCreateNode.dispatchEvent(new Event('click'));
    fixture.detectChanges();


    //assert
    expect(mindMapServiceMock.addNewNode).toHaveBeenCalled();


  })
});
