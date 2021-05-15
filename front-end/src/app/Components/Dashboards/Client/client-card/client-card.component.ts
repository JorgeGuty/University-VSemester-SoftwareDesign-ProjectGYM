import { TYPED_NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, Input } from "@angular/core";
import { Session } from "src/app/Models/Schedule/Session";
import { Instructor } from "src/app/Models/Schedule/Instructor";
import { Service } from "src/app/Models/Schedule/Service";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";
import { SessionsService } from "src/app/Services/SessionService/sessions.service";
import { AuthService } from "src/app/Services/Auth/auth.service";

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
        }
      );
    } else {
      console.log("Cancelar");
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
    let clientIdentification = "1100";
    let reserveSessionJson: any = {
      date: this.session.date.toString(),
      startTime: this.session.time.toString(),
      clientIdentification: userInfo.identification,
      roomId: roomId,
    };

    return reserveSessionJson;
  }
}
