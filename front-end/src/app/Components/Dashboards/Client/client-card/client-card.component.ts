import { TYPED_NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Session } from "src/app/Models/Schedule/Session";
import { Instructor } from "src/app/Models/Schedule/Instructor";
import { Service } from "src/app/Models/Schedule/Service";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";
import { SessionsService } from "src/app/Services/SessionService/sessions.service";
import { AuthService } from "src/app/Services/Auth/auth.service";
import Alert from "src/app/Models/Alertas/Alert";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-client-card",
  templateUrl: "./client-card.component.html",
  styleUrls: ["./client-card.component.scss"],
})
export class ClientCardComponent implements OnInit {
  @Input()
  session!: any;
  @Input()
  instructor!: any;
  @Input()
  sessionService!: any;
  @Input()
  isReserved!: boolean;
  @Output()
  errorMessage = new EventEmitter<string>();

  alert: any = {
    type: "danger",
    message: "This is an standard alert message",
  };

  constructor(
    private sessionScheduleService: SessionsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  onRegister() {
    let reserveSession: any = this.initReserveSessionInformation();

    if (!this.isReserved) {
      console.log("Reservar");
      this.sessionScheduleService.bookSession(reserveSession).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
          this.onError(
            "The session of '" +
              this.session.name +
              "' full, but we will put you in queue 😊"
          );
        }
      );
    } else {
      console.log("Cancelar");
      console.log(reserveSession);
      this.sessionScheduleService.cancelBookedSession(reserveSession).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    }

    this.isReserved = !this.isReserved; // bool
  }

  initReserveSessionInformation(): any {
    let userInfo: any = this.authService.getCurrentUser();
    let roomId = "1";
    console.log(userInfo);
    console.log("Informacion de id: " + userInfo.identifier);
    let reserveSessionJson: any = {
      date: this.session.date.toString(),
      startTime: this.session.time.toString(),
      clientIdentification: userInfo.identifier.toString(),
      roomId: roomId,
    };

    return reserveSessionJson;
  }

  onError(message: any) {
    this.errorMessage.emit(message);
  }
}
