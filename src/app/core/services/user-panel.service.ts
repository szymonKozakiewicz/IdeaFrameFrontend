import { Injectable } from '@angular/core';
import { ApiEndpoints } from 'src/app/infrastructure/http/api-endpoints';
import { CustomHttpClient } from 'src/app/infrastructure/http/custom-http-client';
import { AuthorisationError } from '../errors/authorisation.error';

@Injectable({
    providedIn: 'root'
})
export class UserPanelService {

    constructor(private httpClient:CustomHttpClient) { }

    public sendAuthorizedRequest():void
    {
        this.httpClient.get<string>(ApiEndpoints.AUTHORIZED_REQUEST).subscribe({
            next:()=>console.log("Request success"),
            error:(error)=>{
                if(error instanceof AuthorisationError)
                    console.log("No authorization from server")
            }
        });
    }

    

}