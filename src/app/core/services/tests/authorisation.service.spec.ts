import { TestBed } from "@angular/core/testing";
import { AuthorisationService } from "../authorisation.service";
import { getHttpClientMock, getLoginServiceMock } from "src/app/testHelpers/service-mock-generator";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

describe('Authorisation service', () => {
    let authorisationService: AuthorisationService;
    let loginServiceMock: any;
    let httpClientMock:any;
    let localStorageGetItemSpy: jasmine.Spy;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: []
        }).compileComponents();
        httpClientMock=getHttpClientMock()
        loginServiceMock = getLoginServiceMock();
        authorisationService = new AuthorisationService(httpClientMock,loginServiceMock);

    });


    it("IsLoggedIn token exist and isn't expired, expected that method will return true", async () => {
        let experiance:Date=new Date();
        experiance.setHours(experiance.getHours()+1)
        
        localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.callFake((elemntInStorageName) => {
            if(elemntInStorageName==="token"){
                return "testToken"
            }else{
                return experiance.toISOString()
            }
        });

        //act 
        let result=await authorisationService.isLoggedIn()

        //assert
        expect(result).toEqual(true);


    });


    it("IsLoggedIn token doesn't exist, expected that method will return false", async () => {
        let experiance:Date=new Date();
        experiance.setHours(experiance.getHours()+1)
        
        localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.callFake((elemntInStorageName) => {
            if(elemntInStorageName==="token"){
                return null
            }else{
                return null
            }
        });

        //act 
        let result=await authorisationService.isLoggedIn()

        //assert
        expect(result).toEqual(false);



    });


    it("IsLoggedIn token exist but is expired, refreshing failed, expected that method will return false", async () => {
        let experiance:Date=new Date();
        experiance.setHours(experiance.getHours()-1);
        const errorMessage=new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })
        httpClientMock.postEmpty.and.returnValue(throwError(()=>(errorMessage)));
        
        localStorageGetItemSpy = spyOn(localStorage, 'getItem').and.callFake((elemntInStorageName) => {
            if(elemntInStorageName==="token"){
                return "testToken"
            }else{
                return experiance.toISOString();
            }
        });

        //act 
        let result=await authorisationService.isLoggedIn()

        //assert
        expect(result).toEqual(false);



    });




});