import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { getAuthorisationServiceMock, getHttpClientMock, getLoginServiceMock } from "src/app/testHelpers/service-mock-generator";
import { throwError } from "rxjs";
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors, withInterceptorsFromDi } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot, Routes } from "@angular/router";
import { AuthorisationService } from "../../services/authorisation.service";
import { JwtInterceptor } from "../jwt.interceptor";
import { AuthorisationError } from "../../errors/authorisation.error";
import { HttpClientTestingModule, HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";

describe('Jwt interceptor', () => {
    let authorisationServiceMock: any;
    let jwtInterceptor: JwtInterceptor;
    let httpClient:HttpClient;
    let httpControllerMock:any;
    let routerMock:any;


    beforeEach(() => {
        authorisationServiceMock =getAuthorisationServiceMock();
        routerMock=jasmine.createSpyObj('Router',['navigate']);
        TestBed.configureTestingModule({
            imports: [ 
                
                ],
            providers: [
                provideHttpClient(
                    withInterceptorsFromDi()
                ),
                provideHttpClientTesting(),
            { provide: Router, useValue: routerMock },
            { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
            { provide: AuthorisationService, useValue:  authorisationServiceMock},
            

            
        ],
            declarations: []
        }).compileComponents();

        
        let router=TestBed.inject(Router);
        jwtInterceptor = new JwtInterceptor(authorisationServiceMock,router);
        httpClient = TestBed.inject(HttpClient);
        httpControllerMock = TestBed.inject(HttpTestingController); 
 
    });
    afterEach(() => {
        httpControllerMock.verify();
      }); 

    it("user isn't logged in, request to url where authorisation is needed, expect that intercept method will block request ", fakeAsync( () => {
        //arrange
        
        authorisationServiceMock.isLoggedIn.and.returnValue(Promise.resolve(false));
        authorisationServiceMock.IsAuthorizationRequiredForUrl.and.returnValue(true);
        authorisationServiceMock.GetAcessToken.and.returnValue("testToken");
        
        //act
       httpClient.post(ApiEndpoints.AUTHORIZED_REQUEST,null,{ withCredentials: true }).subscribe(
        {
            next:()=>{},
            error:(error)=>{}
        }
       )
        
       tick()
       
        //assert 
        httpControllerMock.expectNone(ApiEndpoints.AUTHORIZED_REQUEST);
        
    }));

    it("request to url where authorisation is not needed, expect that intercept method will send request with no jwt header ", fakeAsync (() => {
        //arrange
        let wasExceptionThrown=false;
        authorisationServiceMock.isLoggedIn.and.returnValue(Promise.resolve(false));
        authorisationServiceMock.IsAuthorizationRequiredForUrl.and.returnValue(false);
        authorisationServiceMock.GetAcessToken.and.returnValue("testToken");
        
        //act
       httpClient.post(ApiEndpoints.AUTHORIZED_REQUEST,null,{ withCredentials: true }).subscribe(
        {
            next:()=>{},
            error:(error)=>{}
        });
        
        tick();
       
        //assert 
        let request=httpControllerMock.expectOne(ApiEndpoints.AUTHORIZED_REQUEST);
        expect(request.request.headers.has("Authorization")).toBeFalse();
    }));

    it("request to url where authorisation is needed, user is loged in, expect that intercept method will send request with jwt header ", fakeAsync (() => {
        //arrange
        let wasExceptionThrown=false;
        authorisationServiceMock.isLoggedIn.and.returnValue(Promise.resolve(true));
        authorisationServiceMock.IsAuthorizationRequiredForUrl.and.returnValue(true);
        authorisationServiceMock.GetAcessToken.and.returnValue("testToken");
        
        //act
       httpClient.post(ApiEndpoints.AUTHORIZED_REQUEST,null,{ withCredentials: true }).subscribe(
        {
            next:()=>{},
            error:(error)=>{}
        });
        
        tick();
       
        //assert 
        let request=httpControllerMock.expectOne(ApiEndpoints.AUTHORIZED_REQUEST);
        expect(request.request.headers.has("Authorization")).toBeTrue();
    }));







});


