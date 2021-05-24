import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";

import Client from "src/app/Models/Clients/Client";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";
import User from "src/app/Models/Users/User";
import UserTypes from "src/app/Models/Users/UserTypes";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public client: Client;
  public user: User;
  prof_clientName?: string = "";
  prof_email?: string = "";
  prof_phone?: string = "";
  prof_identification?: string = "";
  prof_membershipNumber?: number = 999;
  user_username?: string = "";

  constructor(
    private clientsService: ClientsService,
    private authService: AuthService
  ) {
    this.client = {};
    this.user = {};
  }

  ngOnInit(): void {
    this.clientsService.getClientInfo().subscribe((profiles) => {
      console.log(profiles);
      profiles.forEach((profile: any, key: any) => {
        this.client = profile;
        this.prof_clientName = this.client.name;
        this.prof_email = this.client.email;
        this.prof_phone = this.client.phone;
        this.prof_identification = this.client.identification;
        this.prof_membershipNumber = this.client.membershipNumber;
      });
    });
    this.user = this.authService.getCurrentUser();
    this.user_username = this.user.username;
  }

  //Todo : Implement Service
  onSaveClient() {
    console.log("Name Updated: " + this.prof_clientName);
    console.log("Email Updated: " + this.prof_email);
    console.log("Phone Updated: " + this.prof_phone);
    console.log("Identification Updated: " + this.prof_identification);
  }

  onSaveUser() {
    console.log("Username Updated: " + this.user_username);
    console.log("Old Username: " + this.user.username);

    let old_user = this.user.username;
    let new_user = this.user_username;
    let user_type = UserTypes.Client.toString();

    let userInfo: any = {
      oldUsername: old_user,
      newUsername: new_user,
      userTypeId: user_type,
    };

    this.user.username = this.user_username;

    this.authService.updateUser(userInfo).subscribe(
      (res) => {
        console.log(res);
        this.authService.updateCurrentUser(userInfo.newUsername);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
