import { AuthenticationService } from './../_services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

declare let $: any;
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }else{
      let user = JSON.parse(localStorage.getItem('userData')!);
      let name= user.nombres +' '+ user.paterno +' '+ user.materno;
      $(".menu-sections").removeClass("disp-n");
      $(".user-name").removeClass("disp-n");
      $(".name").html(name); 
      if((user.rol == 3 && user.id != 3)|| user.rol == 5 || user.id ==  7){
        $(".nivel4").addClass("disp-n");
      }
    }

    return true;
  }
}