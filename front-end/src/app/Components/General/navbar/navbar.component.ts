import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";
import UserTypes from "src/app/Models/Users/UserTypes";
import Notifications from "src/app/Models/Schedule/Notifications";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  notificationArray: Notifications[] = [];
  membershipNumber: any = "";

  constructor(
    public authService: AuthService,
    private router: Router,
    private clientSchedule: ClientScheduleService,
    private clientsService: ClientsService
  ) {
    if (!this.isAdmin()) this.loadNotifications();
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

    this.clientsService.getClientInfo().subscribe((profiles: any[]) => {
      profiles.forEach((profile: any) => {
        this.membershipNumber = {
          membershipNumber: profile.membershipNumber.toString(),
        };
      });
      this.clientSchedule.getNotifications(this.membershipNumber).subscribe(
        (res) => {
          console.log("Lo logramos equipo 🎉");
          console.log(res);
          console.log("Lo logramos equipo 🎉");
          this.notificationArray = res;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }
}
