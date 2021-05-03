import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { Session } from "../../../Models/Schedule/Session";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  scheduleMap: Map<Date, any>;

  constructor(
    private authService: AuthService,
    private adminScheduleService: AdminScheduleService
  ) {
    this.scheduleMap = new Map();
  }

  ngOnInit(): void {
    this.getMonthlySessions();
  }

  getMonthlySessions() {
    this.adminScheduleService
      .getCurrentSessionSchedule()
      .subscribe((sessions: any) => {
        sessions.sessions.forEach((session: any, key: any) => {
          let scheduledSession = this.initSession(session);
          this.fillScheduleHashmap(scheduledSession);
        });
      });
  }

  //Auxiliary function for getMonthlySessions
  fillScheduleHashmap(scheduledSession: Session) {
    if (scheduledSession.date != undefined) {
      let currentDay: any[] = this.scheduleMap.get(scheduledSession.date);
      if (currentDay == undefined) {
        this.scheduleMap.set(scheduledSession.date, [scheduledSession]);
      } else {
        currentDay.push(scheduledSession);
        this.scheduleMap.set(scheduledSession.date, currentDay);
      }
    }
  }

  initSession(sessionJson: any): Session {
    let scheduledSession: Session = {
      id: sessionJson.id,
      name: sessionJson.name,
      instructor: {
        name: sessionJson.session_instructor.name,
        identification: sessionJson.session_instructor.identification,
      },
      sessionService: {
        name: sessionJson.session_service.name,
        maxSpaces: sessionJson.session_service.max_spaces,
      },
      availableSpaces: sessionJson.available_spaces,
      cost: sessionJson.cost,
      date: sessionJson.date,
      time: sessionJson.time,
      duration: sessionJson.duration_min,
    };

    return scheduledSession;
  }
}
