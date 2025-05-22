import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeComponent } from './node.component';
import { getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';

describe('NodeComponent', () => {
  let component: NodeComponent;
  let fixture: ComponentFixture<NodeComponent>;
  let mindMapServiceMock:any ;
  beforeEach(async () => {
    mindMapServiceMock=getMindMapMock();
    await TestBed.configureTestingModule({
      declarations: [NodeComponent],
      providers: [
        {provide: MindMapService ,useValue: mindMapServiceMock}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click event on node should trigger method selectNode from mindMapService', () => {

    //act
    fixture.debugElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //assert
    expect(mindMapServiceMock.selectNode).toHaveBeenCalled();

  })

  it('after selecting node + should be visible', () => {

    //arrange
    let plus=getElementByTestId(fixture,"plus")

    //act
    fixture.debugElement.nativeElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    //assert
    const computedStyle = window.getComputedStyle(plus);
    expect(computedStyle.display).toBe('flex');

  })

  it('without selecting node + should not be visible', () => {

    //arrange
    let plus=getElementByTestId(fixture,"plus")

    //assert
    const computedStyle = window.getComputedStyle(plus);
    expect(computedStyle.display).toBe('none');
  })



});
