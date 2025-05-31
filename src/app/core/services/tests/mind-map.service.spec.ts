import { getHttpClientMock, getPanningMapMock } from "src/app/testHelpers/service-mock-generator";
import { MoveFileItemService } from "../move-file-item.service";
import { MapPanningService } from "../map-panning.service";
import { map, min, of } from "rxjs";
import { NodeCoordinates } from "../../domain/entities/node-coordinates";
import { MindMapService } from "../mind-map.service";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { SpyLocation } from "@angular/common/testing";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { OperationStatus } from "../../enum/operation.status";

describe('mind map service', () => {
        
    let mindMapService:MindMapService;
    let mapPanningServiceMock:any;
    let httpClientMock:any

    beforeEach(() => {
        mapPanningServiceMock=getPanningMapMock();
        httpClientMock=getHttpClientMock()
        TestBed.configureTestingModule({
            declarations: [],
            providers: [
                {provide: CustomHttpClient,useValue:httpClientMock},
                { provide: MapPanningService, useValue:  mapPanningServiceMock},
                MindMapService

            ]
        }).compileComponents();

        
        mindMapService=TestBed.inject(MindMapService);
            
            
    });

    it("should tigger subject mindMapSaveStatus after save method was triggered first with status IN_PROGRESS and then with status SUCCESS",fakeAsync(()=>{
        //arrange
        let firstStatusTriggered=false;
        let secondStatusTriggered=false;
        httpClientMock.post.and.returnValue(of([]))

        mindMapService.mindMapSaveStatus$.subscribe((status)=>{
            if(status===OperationStatus.IN_PROGRESS){
                firstStatusTriggered=true;
            }
            if(status===OperationStatus.SUCCESS){
                secondStatusTriggered=true;
            }
        });
        
        //act
        mindMapService.saveMindMap();
        tick();

        //assert
        expect(firstStatusTriggered).toEqual(true);
        expect(secondStatusTriggered).toEqual(true);

    }))




   

})