import { Injectable } from "@angular/core";
import { UserRegisterLoginDTO } from "../dto/user-register-login.dto";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { Subject } from "rxjs";
import { OperationStatus } from "../enum/operation.status";


@Injectable({providedIn:'root'})
export class RegisterService 
{
    registerState$:Subject<OperationStatus>=new Subject<OperationStatus>();
    constructor(private httpClient:CustomHttpClient)
    {

    }

    register(newUser: UserRegisterLoginDTO): void {
        this.httpClient.post("/api/register",newUser).subscribe({
            next: this.showResultsOfRegistration.bind(this),
            error:this.showResultsOfRegistrationAfterError.bind(this)
        })
    }
    showResultsOfRegistration(result:any)
    {
        this.registerState$.next(OperationStatus.SUCCESS);

    }
    showResultsOfRegistrationAfterError(error:any)
    {
        this.registerState$.next(OperationStatus.FAILURE);
    }

    
}