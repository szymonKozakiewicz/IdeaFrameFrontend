import { Injectable } from "@angular/core";
import { firstValueFrom, Observable, of } from "rxjs";
import { ApiEndpoints } from "src/app/infrastructure/http/api-endpoints";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { LoginService } from "./login.service";

@Injectable({providedIn:'root'})
export class AuthorisationService {

    urlsWhereAuthNotRequired:string[]=[ApiEndpoints.REFRESH_TOKEN,ApiEndpoints.IS_LOGIN_AVAILABLE,ApiEndpoints.REGISTER,ApiEndpoints.LOGIN];

    constructor(private httpClient:CustomHttpClient, private loginService:LoginService)
    {

    }

    public async IsLoggedIn(): Promise<boolean> {
        
    
       const tokenNotExist=!this.doAcessTokenExist();
        if(tokenNotExist)
            return false;

        const tokenActive=!this.isTokenExpired()
        if(tokenActive)
        {
            return true;
        }

        let tokenRefreshed = await this.tryToRefreshAcessToken();
        if(!tokenRefreshed)
        {
            this.loginService.removeTokenFromLocalStorage();
        }

        return tokenRefreshed; 

    }

    public IsAuthorizationRequiredForUrl(url:string):boolean
    {
        let result=true;
        if(this.urlsWhereAuthNotRequired.includes(url))
            result=false;
        return result;
    }


    public GetAcessToken():string|null
    {
        return localStorage.getItem("token");
    }


    private async tryToRefreshAcessToken():Promise<boolean> {

        let refreshTokenObservable:Observable<boolean>=this.httpClient.postEmpty<boolean>(ApiEndpoints.REFRESH_TOKEN);
        const result=await firstValueFrom(refreshTokenObservable);
        return result;

    }

    private isTokenExpired() {
        let result = false;
        const tokenExpiration: string = localStorage.getItem("tokenExpiration") ?? "";
        const tokenExpirationDate = new Date(tokenExpiration);
        const tokenExpired = tokenExpirationDate < new Date();
        if (tokenExpired)
            result = true;
        return result;
    }

    private doAcessTokenExist() {
        let result = true;
        const token = localStorage.getItem('token');
        const tokenNotExist = token === null;
        if (tokenNotExist)
            result = false;
        return result;
    }


}