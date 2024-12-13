import { Injectable } from "@angular/core";
import { UserRegisterLoginDTO } from "../dto/user-register-login.dto";
import { CustomHttpClient } from "src/app/infrastructure/http/custom-http-client";
import { catchError, Observable, of, Subject } from "rxjs";
import { OperationStatus } from "../enum/operation.status";


@Injectable({providedIn:'root'})
export class RegisterService 
{
    registerState$:Subject<OperationStatus>=new Subject<OperationStatus>();
    constructor(private httpClient:CustomHttpClient)
    {

    }

    register(newUser: UserRegisterLoginDTO): void {
        this.httpClient.post("https://localhost:7231/api/RegisterLogin/registerNewUser",newUser).subscribe({
            next: this.showResultsOfRegistration.bind(this),
            error:this.showResultsOfRegistrationAfterError.bind(this)
        })
    }

    isLoginAvailable(login:string):Observable<any>
    {
        return this.httpClient.getWithQuery<any>("https://localhost:7231/api/RegisterLogin/isLoginAvailable","login",login)
        .pipe(
            catchError(this.transformErrorToFalse())
        );
    }

    private transformErrorToFalse(): (err: any, caught: Observable<boolean>) => Observable<boolean> {
        
        return error => {
            console.log(error);
            return of(false);
        };
    }

    private showResultsOfRegistration(result:any)
    {
        
        this.registerState$.next(OperationStatus.SUCCESS);

    }
    private showResultsOfRegistrationAfterError(error:any)
    {
       
        this.registerState$.next(OperationStatus.FAILURE);
    }

    
}