import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MapPanningDirective } from "../../derectives/map-panning.directive";
import { MapPanningService } from "src/app/core/services/map-panning.service";
import { getPanningMapMock } from "src/app/testHelpers/service-mock-generator";
import { MindMapComponent } from "../mind-map/mind-map.component";
import { MindmapPanelComponent } from "../mindmap-panel.component";
import { getElementByTestId } from "src/app/testHelpers/data-testid-selector";
import { LogoComponent } from "src/app/presentation/logo/logo.component";
import { NodeSettingsComponent } from "../node-settings/node-settings.component";
import { FormsModule } from "@angular/forms";


describe('MapPanningDirective (tested with mind map panel component', () => {
    let directive: MapPanningDirective;
    let serviceMock:any;
    let component: MindMapComponent;
    let fixture: ComponentFixture<MindmapPanelComponent>;
    let mapPanningDirective: MapPanningDirective;
    beforeEach(async () => {
        
        serviceMock=getPanningMapMock();
        
        
       await TestBed.configureTestingModule({
         declarations: [MapPanningDirective,MindMapComponent,MindmapPanelComponent,LogoComponent,NodeSettingsComponent],
         providers: [
           {provide: MapPanningService, useValue:serviceMock},
           {provide: MapPanningDirective, useClass: MapPanningDirective}
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