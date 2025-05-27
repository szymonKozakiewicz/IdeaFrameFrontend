import { getPanningMapMock } from "src/app/testHelpers/service-mock-generator";
import { MoveFileItemService } from "../move-file-item.service";
import { MapPanningService } from "../map-panning.service";
import { map } from "rxjs";
import { NodeCoordinates } from "../../domain/entities/node-coordinates";

describe('map panning service', () => {
        
    let mapPanningService:MapPanningService;
    

    beforeEach(() => {
        mapPanningService=new MapPanningService()
            
            
            
    });
    it(('getTranslatedNodeCoordinates shoudl return right translated coordinates'), () => {
        //arrange
        mapPanningService.initPanning();
        mapPanningService.updateCurrentMapTranslation({x:0,y:0},{x:10,y:10});
        let testCoordinates=new NodeCoordinates(5,5);


        //act
        let translatedCoordinates=mapPanningService.getTranslatedNodeCoordinates(testCoordinates);

        //
        expect(translatedCoordinates.x).toEqual(15);
        expect(translatedCoordinates.y).toEqual(15);
    })


    it(('getReversedTranlationOfCoordinates shoudl return right translated coordinates'), () => {
        //arrange
        mapPanningService.initPanning();
        mapPanningService.updateCurrentMapTranslation({x:0,y:0},{x:10,y:10});
        let testCoordinates=new NodeCoordinates(5,5);


        //act
        let translatedCoordinates=mapPanningService.getReversedTranlationOfCoordinates(testCoordinates);

        //
        expect(translatedCoordinates.x).toEqual(-5);
        expect(translatedCoordinates.y).toEqual(-5);
    })

    it('updateCurrentMapTranslation should trigger subject updateMapAfterTranslation$', ()=>{
        //arrange
        let wasSubjectTriggered=false;
        mapPanningService.initPanning();
        mapPanningService.updateMapAfterTranslation$.subscribe({
            next: () => {
                wasSubjectTriggered=true;
            }
        });
        
        


        //act
        mapPanningService.updateCurrentMapTranslation({x:0,y:0},{x:10,y:10});

        //assert
        expect(wasSubjectTriggered).toBeTrue();
        
    })

})