import { TestBed } from "@angular/core/testing";
import { getDirectoryServiceMock, getHttpClientMock, getMindMapMock } from "src/app/testHelpers/service-mock-generator";
import { DirectoryManagerService } from "../directory-manager.service";
import { MindMapService } from "../mind-map.service";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { provideRouter } from "@angular/router";
import { routes } from "src/app/app.routes";
import { SpyLocation } from "@angular/common/testing";
import { FileItemType } from "../../enum/fileItem.enum";
import { OperationStatus } from "../../enum/operation.status";
import { MoveFileItemService } from "../move-file-item.service";
import { FileSystemItem } from "../../domain/entities/file-item";

describe('directory manager service', () => {
    let httpClientMock:any;
    let moveFileItemService:MoveFileItemService;
    let mindMapServiceMock=getMindMapMock();
    let directoryManagerServiceMock:DirectoryManagerService=getDirectoryServiceMock()
    

    beforeEach(() => {
            directoryManagerServiceMock=getDirectoryServiceMock()
            httpClientMock=getHttpClientMock()
            TestBed.configureTestingModule({
                declarations: [],
                providers: [
                    MoveFileItemService,
                    {provide: MindMapService,useValue: mindMapServiceMock},
                    {provide: CustomHttpClient,useValue:httpClientMock},
                    provideRouter(routes),
                    { provide: Location, useClass: SpyLocation },
                    { provide: DirectoryManagerService, useValue:  directoryManagerServiceMock}
                ]
            }).compileComponents();
            moveFileItemService=TestBed.inject(MoveFileItemService);
            
            
        });

        describe("enterIntoMoveFileItemMode method",()=>{
            let fileItemForTest:FileSystemItem=new FileSystemItem(FileItemType.FILE,"testName");


            it("should activate subject moveFileItemMode$ after enterIntoMoveFileItemMode method is called",()=>{
                let moveFileItemModeActivated=false;
                moveFileItemService.moveFileItemMode$.subscribe((status)=>{
                    moveFileItemModeActivated=true;
                })

                //act
                moveFileItemService.eneterIntoMoveFileItemMode(fileItemForTest);

                //assert
                expect(moveFileItemModeActivated).toEqual(true);
            })

            it("should trigger method setFilteItemToChangeType from directoryManagerServiceMock after enterIntoMoveFileItemMode method is called",()=>{

                //act
                moveFileItemService.eneterIntoMoveFileItemMode(fileItemForTest);

                //assert
                expect(directoryManagerServiceMock.setFilteItemToChangeType).toHaveBeenCalledWith(fileItemForTest.type);
            })

    })


})