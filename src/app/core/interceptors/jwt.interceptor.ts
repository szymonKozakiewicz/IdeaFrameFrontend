import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { AuthorisationService } from '../services/authorisation.service';
import { AuthorisationError } from '../errors/authorisation.error';
import { Router } from '@angular/router';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthorisationService, private router:Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  
        const authorizationNotRequired = !this.authService.IsAuthorizationRequiredForUrl(req.url); 

        if (authorizationNotRequired)
            return next.handle(req);

        
        let result=from(this.authService.isLoggedIn()).pipe(switchMap(isLoggedIn=>{
            return this.tryToAddJwtTokenToRequest(isLoggedIn,req,next);
        }),catchError(this.navigateToLoginAfterError.bind(this)));

        return result;
    }

    private navigateToLoginAfterError(error:any)
    {
        this.router.navigate(['/login']);
        return throwError(()=>new AuthorisationError());

    }

    private tryToAddJwtTokenToRequest(isLoggedIn:boolean,req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>>
    {

        if(!isLoggedIn)
            return throwError(()=>new AuthorisationError());

        const token=this.authService.GetAcessToken();
        
        if(!token)
            return throwError(()=>new AuthorisationError());

        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });

        return next.handle(req);

    }
}