import { Component, OnInit } from "@angular/core";
import Filters from "src/app/Models/Calendar/Filters";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";

import { Session } from "../../../../Models/Schedule/Session";

@Component({
  selector: "app-client-dashboard",
  templateUrl: "./client-dashboard.component.html",
  styleUrls: ["./client-dashboard.component.scss"],
})
export class ClientDashboardComponent implements OnInit {
  Filters: any = Filters;
  scheduleMap: Map<Date, any>;
  scheduleMapReservations: Map<String, any>;
  filterTerm: string = "";
  filterNumber: number[] = [0, 1, 2, 3];
  filtersNumber: number = 0;

  constructor(
    private authService: AuthService,
    private clientScheduleService: ClientScheduleService
  ) {
    this.scheduleMap = new Map();
    this.scheduleMapReservations = new Map();
  }

  ngOnInit(): void {
    //this.getMonthlyReservedSessions();
    this.getMonthlySessions();
  }

  getMonthlySessions() {
    //load schedule
    this.clientScheduleService
      .getCurrentSessionSchedule()
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: any, key: any) => {
            let scheduledSession = this.initSession(session);
            this.fillScheduleHashmap(scheduledSession);
          });
          this.getMonthlyReservedSessions();
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }
      });
  }
  getMonthlyReservedSessions() {
    this.clientScheduleService
      .getReservedSessions()
      .subscribe((reservedSessions: any) => {
        console.log("Sesiones RESERVADAS");
        console.log(reservedSessions);
        reservedSessions.sessions.forEach((session: any, key: any) => {
          this.scheduleMapReservations.set(session.id, session);
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
  //Receive a session Json
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

  filterSessions() {
    console.log("Filtered by: " + this.filtersNumber);
    console.log("Filter term: " + this.filterTerm);
    this.scheduleMap.clear();
    this.clientScheduleService
      .getFilteredSessions(this.filtersNumber.toString(), this.filterTerm)
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: any, key: any) => {
            let scheduledSession = this.initSession(session);
            this.fillScheduleHashmap(scheduledSession);
          });
          this.getMonthlyReservedSessions();
          console.log("Sesiones Filtradas 🙌");
          console.log(this.scheduleMap);
          console.log("Sesiones Filtradas 🙌");
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }
      });
  }
}
