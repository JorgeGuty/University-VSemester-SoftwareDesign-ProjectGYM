import { TYPED_NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, Input } from "@angular/core";
import { Session } from "src/app/Models/Schedule/Session";
import { Instructor } from "src/app/Models/Schedule/Instructor";
import { Service } from "src/app/Models/Schedule/Service";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";
import { SessionsService } from "src/app/Services/SessionService/sessions.service";

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

  constructor(private sessionScheduleService: SessionsService) {}

  ngOnInit(): void {}

  onRegister() {
    let reserveSession: any = this.initReserveSessionInformation();

    if (!this.isReserved) {
      this.sessionScheduleService.bookSession(reserveSession).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      //Todo: Implement cancelBookedSession route in API
      this.sessionScheduleService.cancelBookedSession(this.session.id);
    }

    this.isReserved = !this.isReserved; // bool
  }

  initReserveSessionInformation(): any {
    console.log("INIT SESSION!!!!");
    console.log(this.session.date);
    console.log(this.session.time);
    let roomId = "1";
    let clientIdentification = "1100";
    let reserveSessionJson: any = {
      date: this.session.date.toString(),
      time: this.session.time.toString(),
      clientIdentification: clientIdentification,
      roomId: roomId,
    };

    return reserveSessionJson;
  }
}
