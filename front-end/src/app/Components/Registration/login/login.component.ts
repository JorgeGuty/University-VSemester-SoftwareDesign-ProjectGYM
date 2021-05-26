import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";

import { User } from "../../../Models/Users/User";
import { UserTypes } from "../../../Models/Users/UserTypes";
import Registration from "src/app/Models/Registration/Registration";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  log_username: string = "";
  log_password: string = "";
  reg_username: string = "";
  reg_password: string = "";
  reg_membership: string = "";

  // TODO: implement flash message
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    console.log("Se Logea");
    const user = {
      username: this.log_username,
      password: this.log_password,
    };
    console.log(" mundo");
    this.authService.authenticateUser(user).subscribe(
      (data: User) => {
        console.log("INFORMACION USUARIO");
        console.log(data);
        if (data.token != undefined)
          this.authService.storeUserData(data.token, data);

        if (data.type == UserTypes.Admin)
          this.router.navigateByUrl("admin/adminDashboard");
        if (data.type == UserTypes.Client)
          this.router.navigateByUrl("client/clientDashboard");
      },
      (error) => {
        //TODO: Display FlashMessages
        this.router.navigateByUrl("/login");
      }
    );
    console.log(" mundo");
  }

  onRegister() {
    let registration: Registration = this.initRegistrationForm();
    this.authService.registerClientUser(registration).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initRegistrationForm(): Registration {
    let registrationForm: Registration = new Registration();
    registrationForm.membershipNumber = this.reg_membership;
    registrationForm.password = this.reg_password;
    registrationForm.username = this.reg_username;

    return registrationForm;
  }
}
