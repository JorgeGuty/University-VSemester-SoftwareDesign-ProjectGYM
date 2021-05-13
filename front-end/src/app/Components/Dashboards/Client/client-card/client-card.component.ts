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
    if (!this.isReserved) {
      this.sessionScheduleService.bookSession(this.session.id);
      console.log(
        "Session with ID:" + this.session.id + " reservation completed"
      );
    } else {
      //Todo: Implement cancelBookedSession route in API
      this.sessionScheduleService.cancelBookedSession(this.session.id);
    }

    this.isReserved = !this.isReserved; // bool
  }
}
