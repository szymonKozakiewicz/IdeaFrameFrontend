import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MapPanningDirective } from "../../derectives/map-panning.directive";
import { MapPanningService } from "src/app/core/services/map-panning.service";
import { getMindMapMock, getPanningMapMock } from "src/app/testHelpers/service-mock-generator";
import { MindMapComponent } from "../mind-map/mind-map.component";
import { MindmapPanelComponent } from "../mindmap-panel.component";
import { getElementByTestId } from "src/app/testHelpers/data-testid-selector";
import { LogoComponent } from "src/app/presentation/logo/logo.component";
import { NodeSettingsComponent } from "../node-settings/node-settings.component";
import { FormsModule } from "@angular/forms";
import { MindMapService } from "src/app/core/services/mind-map.service";
import { FileItemComponent } from "../../user-panel/directory-managager/directory-manager-panel/file-item/file-item.component";
import { FileItemMenuInMindMapComponent } from "../mind-map/file-item-menu-in-mind-map/file-item-menu-in-mind-map.component";
import { ElementRef } from "@angular/core";


describe('MapPanningDirective (tested with mind map panel component', () => {
    let directive: MapPanningDirective;
    let serviceMock:any;
    let component: MindMapComponent;
    let fixture: ComponentFixture<MindmapPanelComponent>;
    let mapPanningDirective: MapPanningDirective;
    const mockElementRef = {
      nativeElement: document.createElement('div')
  };
    beforeEach(async () => {
        
        serviceMock=getPanningMapMock();
        
        
       await TestBed.configureTestingModule({
         declarations: [MapPanningDirective,MindMapComponent,MindmapPanelComponent,LogoComponent,NodeSettingsComponent,FileItemMenuInMindMapComponent],
         providers: [
           {provide: MapPanningService, useValue:serviceMock},
           {provide: MapPanningDirective, useClass: MapPanningDirective},
           {provide:MindMapService, useValue:getMindMapMock()},
           {provide: ElementRef, useValue: mockElementRef}
         ],
         imports: [FormsModule]
       })
       .compileComponents();
       fixture = TestBed.createComponent(MindmapPanelComponent);
    });
  it('should create an instance', () => {
    directive = TestBed.inject(MapPanningDirective);
    expect(directive).toBeTruthy();
  });

  it('should call initPanning on mouse down if in map panning mode', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(true);
   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    fixture.detectChanges();
    

    //asert
    expect(serviceMock.initPanning).toHaveBeenCalled();

  });

  it('shouldn t call initPanning on mouse down if not in map panning mode', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(false);
   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    fixture.detectChanges();
    

    //asert
    expect(serviceMock.initPanning).not.toHaveBeenCalled();

  });

  it('should call updateCurrentMapTranslation on mouse move if before that panning was inited', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(true);
    directiveElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
    fixture.detectChanges();
    

    //asert
    expect(serviceMock.updateCurrentMapTranslation).toHaveBeenCalled();

  });

  it('shouldn t call updateCurrentMapTranslation on mouse move if before that panning wasn t inited', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(true);

   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
    fixture.detectChanges();
    

    //asert
    expect(serviceMock.updateCurrentMapTranslation).not.toHaveBeenCalled();

  });

  it('should call finishTranslation from panning service on mouse up if before that panning was inited', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(true);
    directiveElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    fixture.detectChanges();
    

    //asert
    expect(serviceMock.finishTranslation).toHaveBeenCalled();

  });

  it('shouldn t call finishTranslation from panning service on mouse up if before that panning wasn t inited', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(true);


   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    fixture.detectChanges();
    

    //assert
    expect(serviceMock.finishTranslation).not.toHaveBeenCalled();

  });

  it('should call finishTranslation from panning service on mouse leave if before that panning was inited', () => 
    {
 
    
    let directiveElement=getElementByTestId(fixture,"mind-map")
    serviceMock.getMapPanningMode.and.returnValue(true);
    directiveElement.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

   
    //act
    directiveElement.dispatchEvent(new MouseEvent("mouseleave", { bubbles: true }));
    fixture.detectChanges();
    

    //asert
    expect(serviceMock.finishTranslation).toHaveBeenCalled();

  });
});