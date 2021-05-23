import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";

import Client from "src/app/Models/Clients/Client";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  public client: Client;
  prof_clientName?: string = "";
  prof_email?: string = "";
  prof_phone?: string = "";
  prof_identification?: string = "";
  prof_membershipNumber?: number = 999;

  constructor(private clientsService: ClientsService, private router: Router) {
    this.client = {};
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
  }

  //Todo : Implement Service
  onSave() {
    console.log("Name Updated: " + this.prof_clientName);
    console.log("Email Updated: " + this.prof_email);
    console.log("Phone Updated: " + this.prof_phone);
    console.log("Identification Updated: " + this.prof_identification);
  }
}
