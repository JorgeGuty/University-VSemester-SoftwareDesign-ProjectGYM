import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import UserTypes from "src/app/Models/Users/UserTypes";
import { AuthService } from "../Services/Auth/auth.service";

@Injectable()
export class AuthAdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    // Check if authenticated and user is admin
    let type = 0;
    const user = this.authService.getCurrentUser();
    if (user?.type != undefined) type = user.type;
    console.log("Tipo:" + type);
    if (this.authService.loggedIn() && type == UserTypes.Admin) {
      return true;
    }
    this.router.navigateByUrl("/");
    return false;
  }
}
