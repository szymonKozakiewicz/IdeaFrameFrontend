import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorisationService } from '../services/authorisation.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthorisationService, private router: Router) {}

    async canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot):  Promise<boolean> {
        
        
        
        if (await this.authService.IsLoggedIn()) {
     
            return true;
        } 

        
        this.router.navigate(['/login']);
        return false;
    }
}