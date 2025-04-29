import { TestBed } from "@angular/core/testing";
import { getHttpClientMock, getMindMapMock } from "src/app/testHelpers/service-mock-generator";
import { DirectoryManagerService } from "../directory-manager.service";
import { MindMapService } from "../mind-map.service";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { provideRouter } from "@angular/router";
import { routes } from "src/app/app.routes";
import { SpyLocation } from "@angular/common/testing";
import { FileItemType } from "../../enum/fileItem.enum";
import { OperationStatus } from "../../enum/operation.status";

describe('directory manager service', () => {
    let httpClientMock:any;
    let directoryManagerService:DirectoryManagerService;
    let mindMapServiceMock=getMindMapMock();

    beforeEach(() => {
            httpClientMock=getHttpClientMock()
            TestBed.configureTestingModule({
                declarations: [],
                providers: [
                    DirectoryManagerService,
                    {provide: MindMapService,useValue: mindMapServiceMock},
                    {provide: CustomHttpClient,useValue:httpClientMock},
                    provideRouter(routes),
                    { provide: Location, useClass: SpyLocation }
                ]
            }).compileComponents();
            directoryManagerService=TestBed.inject(DirectoryManagerService);
            
            
        });

    it("method setupModalForOperationAddFileItem should trigger subjects addFileItemOperationStatus and resetModal",()=>{
        let resetModalTriggered=false;
        let addFileItemOperationStatusTriggered=false;

        directoryManagerService.resetModal$.subscribe(()=>{
            resetModalTriggered=true;
        })

        directoryManagerService.addFileItemOperationStatus$.subscribe((status)=>{
            if(status===OperationStatus.NOT_STARTED){
                resetModalTriggered=true;
            }
        });

        //act
        directoryManagerService.setupModalForOperationAddFileItem(FileItemType.FILE);

        //assert
        expect(resetModalTriggered).toEqual(true);
    })


})