import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";

import { Session } from "../../../Models/Schedule/Session";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrls: ["./client-dashboard.component.scss"],
})
export class ClientDashboardComponent implements OnInit {
  schedule: Session[] = [];

  constructor(
    private authService: AuthService,
    private clientScheduleService: ClientScheduleService
  ) {}

  ngOnInit(): void {
    //testing loading schedule
    this.clientScheduleService
      .getCurrentSessionSchedule()
      .subscribe((sessions: any) => {
        sessions.sessions.forEach((session: any, key: any) => {
          //For each sesion create a sesion
          //console.log(session);
          let scheduledSession: Session = {
            name: session.name,
            instructor: {
              name: session.session_instructor.name,
              identification: session.session_instructor.identification,
            },
            sessionService: {
              name: session.session_service.name,
              maxSpaces: session.session_service.max_spaces,
            },
            availableSpaces: session.available_spaces,
            cost: session.cost,
            date: session.date,
            time: session.time,
            duration: session.duration_min,
          };

          this.schedule.push(scheduledSession);
        });
      });

    //console.log(this.schedule);
  }
}
