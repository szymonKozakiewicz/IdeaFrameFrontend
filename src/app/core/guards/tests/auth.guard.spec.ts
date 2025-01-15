import { TestBed } from "@angular/core/testing";
import { getAuthorisationServiceMock, getHttpClientMock, getLoginServiceMock } from "src/app/testHelpers/service-mock-generator";
import { throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthGuard } from "../auth.guard";
import { RouterTestingModule } from "@angular/router/testing";
import { ActivatedRouteSnapshot, provideRouter, Router, RouterStateSnapshot } from "@angular/router";
import { AuthorisationService } from "../../services/authorisation.service";

describe('Authorisation guard', () => {
    let authorisationServiceMock: any;
    let authGuard: AuthGuard;



    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideRouter([])],
            declarations: []
        }).compileComponents();

        authorisationServiceMock =getAuthorisationServiceMock();
        let router=TestBed.inject(Router);
        authGuard = new AuthGuard(authorisationServiceMock,router);

    });


    it('should return false if user not logged in', async () => {
        //arrange
        
        authorisationServiceMock.isLoggedIn.and.returnValue(Promise.resolve(false));
        let activatedRouteSnapshot=new ActivatedRouteSnapshot();
        const routerStateSnapshot: RouterStateSnapshot = { } as RouterStateSnapshot;
        
        
        //act
        let resultPromise=authGuard.canActivate(activatedRouteSnapshot,routerStateSnapshot);
        const result:boolean=await resultPromise;
        //assert 
        expect(result).toEqual(false);
        
    });

    
    it('should return true if user is logged in', async () => {
        //arrange
        
        authorisationServiceMock.isLoggedIn.and.returnValue(Promise.resolve(true));
        let activatedRouteSnapshot=new ActivatedRouteSnapshot();
        const routerStateSnapshot: RouterStateSnapshot = { } as RouterStateSnapshot;
        
        
        //act
        let resultPromise=authGuard.canActivate(activatedRouteSnapshot,routerStateSnapshot);
        const result:boolean=await resultPromise;
        //assert 
        expect(result).toEqual(true);
        
    });




});