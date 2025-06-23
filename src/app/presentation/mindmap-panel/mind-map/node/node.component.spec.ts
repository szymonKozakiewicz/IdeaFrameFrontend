import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeComponent } from './node.component';
import { getBranchServiceMock, getMindMapMock } from 'src/app/testHelpers/service-mock-generator';
import { MindMapService } from 'src/app/core/services/mind-map.service';
import { getElementByTestId } from 'src/app/testHelpers/data-testid-selector';
import { BranchService } from 'src/app/core/services/branch.service';

describe('NodeComponent', () => {
  let component: NodeComponent;
  let fixture: ComponentFixture<NodeComponent>;
  let mindMapServiceMock:any ;
  let branchServiceMock:any;
  beforeEach(async () => {
    mindMapServiceMock=getMindMapMock();
    branchServiceMock=getBranchServiceMock();
    await TestBed.configureTestingModule({
      declarations: [NodeComponent],
      providers: [
        {provide: MindMapService ,useValue: mindMapServiceMock},
        {provide: BranchService ,useValue: branchServiceMock}

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
    fixture.debugElement.nativeElement.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();

    //assert
    expect(mindMapServiceMock.selectNode).toHaveBeenCalled();

  })

  it('after selecting node + should be visible', () => {

    //arrange
    let plus=getElementByTestId(fixture,"plus")
    

    //act
    fixture.debugElement.nativeElement.dispatchEvent(new Event('mousedown'));
    fixture.detectChanges();

    //assert
    const computedStyle = window.getComputedStyle(plus);
    expect(computedStyle.display).toBe('flex');

  })

  it('without selecting node plus div should not be visible', () => {

    //arrange
    let plus=getElementByTestId(fixture,"plus")

    //assert
    const computedStyle = window.getComputedStyle(plus);
    expect(computedStyle.display).toBe('none');
  })

  it('after plus is clicked it should trigger method activateBranchCreateMode from branch service if none special mode is active',()=>{

    //arrange
    let plus=getElementByTestId(fixture,"plus")
    mindMapServiceMock.isAnySpecialModeActive.and.returnValue(false);

    //act
    plus.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    fixture.detectChanges();

    //assert
    expect(branchServiceMock.activateBranchCreateMode).toHaveBeenCalledWith(component.nodeSettings);
  })

  it('after node is clicked and branch mode is not active it shouldnt trigger finaliseBranchCreation method from branchService',()=>{

    //arrange
    let node=fixture.debugElement.nativeElement
    branchServiceMock.isBranchModeActive.and.returnValue(false);

    //act
    node.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    fixture.detectChanges();

    //assert
    expect(branchServiceMock.finaliseBranchCreation).not.toHaveBeenCalled();
  })

  
  it('after node is clicked and branch mode is active it should trigger finaliseBranchCreation method from branchService',()=>{

    //arrange
    let node=fixture.debugElement.nativeElement
    branchServiceMock.isBranchModeActive.and.returnValue(true);

    //act
    node.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    fixture.detectChanges();

    //assert
    expect(branchServiceMock.finaliseBranchCreation).toHaveBeenCalled();
  })


});
