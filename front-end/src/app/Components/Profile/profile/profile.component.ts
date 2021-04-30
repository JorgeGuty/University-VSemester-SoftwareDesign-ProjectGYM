import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";

import Client from "src/app/Models/Clients/Client";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public client: Client;
  prof_username?: string = "";
  prof_email?: string = "";
  prof_phone?: string = "";
  prof_identification?: string = "";

  constructor(private authService: AuthService, private router: Router) {
    this.client = {};
  }

  ngOnInit(): void {
    this.authService.getProfile().subscribe((profile) => {
      this.client = profile;
      this.prof_username = this.client.username;
      this.prof_email = this.client.email;
      this.prof_phone = this.client.phone;
      this.prof_identification = this.client.identification;
    });
  }

  onSave() {
    console.log("Username Updated: " + this.prof_username);
    console.log("Email Updated: " + this.prof_email);
    console.log("Phone Updated: " + this.prof_phone);
    console.log("Identification Updated: " + this.prof_identification);
  }
}
