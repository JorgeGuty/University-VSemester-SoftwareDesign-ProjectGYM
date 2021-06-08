import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";
import UserTypes from "src/app/Models/Users/UserTypes";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    //TODO: "You logged out" message
    this.router.navigateByUrl("/login");
    return false;
  }

  isAdmin() {
    let type = this.authService.getCurrentUser()?.type;
    if (type != undefined) return type == UserTypes.Admin;
    return 0;
  }
}
