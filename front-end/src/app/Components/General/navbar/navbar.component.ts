import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";
import UserTypes from "src/app/Models/Users/UserTypes";
import Notifications from "src/app/Models/Schedule/Notifications";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  notificationArray: Notifications[] = [];

  constructor(public authService: AuthService, private router: Router) {
    this.loadNotifications();
  }

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

  loadNotifications() {
    console.log("Estoy recargando notificaciones 🎉");
    this.notificationArray = [
      { message: "Hola eduardo", time: "18:00", date: "2021-06-06" },
      { message: "Hola jorge", time: "13:00", date: "2021-06-06" },
      { message: "Hola jorge", time: "13:00", date: "2021-06-06" },
      { message: "Hola jorge", time: "13:00", date: "2021-06-06" },
      { message: "Hola jorge", time: "13:00", date: "2021-06-06" },
    ];
  }
}
