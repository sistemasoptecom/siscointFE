import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
    providedIn: 'root'
})

export class AuthGuard  {
    constructor( private router:Router, private jwtHelper : JwtHelperService){}
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
        if(localStorage.getItem("jwt") != null)
            return true
        else
            this.router.navigate(['/login']);
            return false;
    }
}