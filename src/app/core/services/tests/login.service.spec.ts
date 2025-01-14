import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from '../login.service';
import { CustomHttpClient } from 'src/app/infrastructure/http/custom-http-client';
import { getHttpClientMock } from 'src/app/testHelpers/service-mock-generator';
import { UserRegisterLoginDTO } from '../../dto/user-register-login.dto';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginService', () => {
    let loginService: LoginService;
    let httpClientMock:any;
    let localStorageSetItemSpy: jasmine.Spy;
    let localStorageRemoveItemSpy: jasmine.Spy;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: []
        }).compileComponents();
        httpClientMock=getHttpClientMock()
        loginService = new LoginService(httpClientMock);
        localStorageSetItemSpy = spyOn(localStorage, 'setItem').and.callFake(() => {});
        localStorageRemoveItemSpy = spyOn(localStorage, 'removeItem').and.callFake(() => {});
    });


    it('after calling login method and receiving positive result it should set proper values in local storage and send true to loginState subject', (done) => {
        //arrange
        const loginData=new UserRegisterLoginDTO("testLogin","testPassword");
        const jwtResponse={
            accessToken:"testToken",
            accessTokenExpiration:"testExpiration"
        }
        httpClientMock.post.and.returnValue(of(jwtResponse));
        loginService.loginState$.subscribe({
            next:(result)=>{
                //assert
                expect(result).toEqual(true);
                expect(localStorageSetItemSpy).toHaveBeenCalledWith('token', 'testToken');
                expect(localStorageSetItemSpy).toHaveBeenCalledWith("tokenExpiration", 'testExpiration');
                done();
            }
        })

        //act 
        loginService.login(loginData);


    });

    it('after calling login method and receiving negative result it should send false to loginState subject', (done) => {
        //arrange
        const loginData=new UserRegisterLoginDTO("testLogin","testPassword");
        const errorMessage=new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' })
        httpClientMock.post.and.returnValue(throwError(()=>(errorMessage)));
        loginService.loginState$.subscribe({
            next:(result)=>{
                //assert
                expect(result).toEqual(false);
                done();
            }
        })

        //act 
        loginService.login(loginData);


    });


    it('after calling logout method and receiving response from server it should remove token from local storage', fakeAsync(() => {
        //arrange
        httpClientMock.postEmpty.and.returnValue(of(null));


        //act 
        loginService.logout();
        tick();

        //assert
        expect(localStorageRemoveItemSpy).toHaveBeenCalledWith('token');
        
    }));



});