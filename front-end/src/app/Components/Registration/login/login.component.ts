import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../Services/Auth/auth.service";
import { Router } from "@angular/router";

import { User } from "../../../Models/Users/User";
import { UserTypes } from "../../../Models/Users/UserTypes";

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
  reg_passwordConfirmation: string = "";

  // TODO: implement flash message
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onLogin() {
    console.log("Se Logea");
    const user = {
      username: this.log_username,
      password: this.log_password,
    };

    this.authService.authenticateUser(user).subscribe(
      (data: User) => {
        console.log(data.username);
        console.log(data.token);
        console.log(data.type);
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
  }

  onRegister() {
    console.log("Se Registra");
    console.log("Username: " + this.reg_username);
    console.log("Password: " + this.reg_password);
    console.log("Password Confirmation" + this.reg_passwordConfirmation);
  }
}
