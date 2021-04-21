import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  log_email: string = "";
  log_password: string = "";
  reg_username: string = "";
  reg_password: string = "";
  reg_passwordConfirmation: string = "";

  constructor() {}

  ngOnInit(): void {}

  onLogin() {
    console.log("Se Logea");
    console.log("Username: " + this.log_email);
    console.log("Password: " + this.log_password);
  }

  onRegister() {
    console.log("Se Registra");
    console.log("Username: " + this.reg_username);
    console.log("Password: " + this.reg_password);
    console.log("Password Confirmation" + this.reg_passwordConfirmation);
  }
}
