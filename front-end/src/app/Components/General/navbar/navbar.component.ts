import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    //TODO: "You logged out" message
    this.router.navigateByUrl("/login");
    return false;
  }
}
