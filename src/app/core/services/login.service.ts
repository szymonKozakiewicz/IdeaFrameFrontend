import { Injectable } from "@angular/core";
import { UserRegisterLoginDTO } from "../dto/user-register-login.dto";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { catchError, Observable, of, Subject } from "rxjs";
import { OperationStatus } from "../enum/operation.status";
import { JwtResponse } from "../dto/jwt-response";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";


@Injectable({providedIn:'root'})
export class LoginService 
{
    
    loginState$:Subject<boolean>=new Subject<boolean>();

    constructor(private httpClient:CustomHttpClient)
    {

    }
    

    login(userLoginData:UserRegisterLoginDTO)
    {   
        this.httpClient.post(ApiEndpoints.LOGIN,userLoginData).subscribe({
            next: this.loginSuccess.bind(this),
            error:this.loginFail.bind(this)
        })

    }

    public logout()
    {
        this.httpClient.postEmpty(ApiEndpoints.LOGOUT).subscribe({
            next: ()=>{
                this.removeTokenFromLocalStorage();
            }
        });
    }

    public removeTokenFromLocalStorage(){

        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiration");
        
    }

    public updateJwtTokenAfterRefresh(jwtResponse:any)
    {
        this.removeTokenFromLocalStorage();
        this.setJwtTokenInLocalStorage(jwtResponse);
    }

    private loginSuccess(jwtResponse:any)
    {
       
        this.setJwtTokenInLocalStorage(jwtResponse);
        this.loginState$.next(true);
    }

    private setJwtTokenInLocalStorage(jwtResponse: any) {
        localStorage.setItem("token", jwtResponse.accessToken);
        localStorage.setItem("tokenExpiration", jwtResponse.accessTokenExpiration);
    }

    private loginFail(jwtResponse:any)
    {
        this.loginState$.next(false);
    }
  
}