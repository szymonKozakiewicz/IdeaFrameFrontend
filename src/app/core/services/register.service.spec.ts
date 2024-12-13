import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RegisterService } from './register.service';
import { getHttpClientMock } from 'src/app/testHelpers/service-mock-generator';
import { UserRegisterLoginDTO } from '../dto/user-register-login.dto';
import { CustomHttpClient } from 'src/app/infrastructure/http/custom-http-client';
import { firstValueFrom, of, throwError } from 'rxjs';
import { OperationStatus } from '../enum/operation.status';
import { HttpErrorResponse } from '@angular/common/http';



describe('register service', () => {

    let registerService: RegisterService;
    let httpClientMock: any;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: []
        })
            .compileComponents();
        httpClientMock = getHttpClientMock()
        registerService = new RegisterService(httpClientMock);


    });

    it('check if after calling register method and reciving ok result, registerState subject is called with proper value', (done) => {
        let user = new UserRegisterLoginDTO("testLogin", "testPassword");

        httpClientMock.post.and.returnValue(of(null));

        registerService.registerState$.subscribe({
            next: (result) => {
                //assert
                expect(result).toEqual(OperationStatus.SUCCESS);
                done();
            }

        })
        //act
        registerService.register(user);
    });


    it('check if after calling register method and reciving bad request result, registerState subject is called with proper value', (done) => {
        let user = new UserRegisterLoginDTO("testLogin", "testPassword");
        const errorMessage=new HttpErrorResponse({ status: 400, statusText: 'Bad Request' })
        httpClientMock.post.and.returnValue(throwError(()=>(errorMessage)));

        registerService.registerState$.subscribe({
            next: (result) => {
                //assert
                expect(result).toEqual(OperationStatus.FAILURE);
                done();
            }

        })
        //act
        registerService.register(user);
    });
});
