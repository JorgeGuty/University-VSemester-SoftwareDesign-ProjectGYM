import { Component, OnInit } from "@angular/core";
import { AuthService } from "./Services/Auth/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "front-end";

  constructor(private authService: AuthService) {
    this.authService.loadToken();
    console.log("CARGANDO DATOS...");
  }

  ngOnInit(): void {}
}
