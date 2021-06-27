import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { Session } from "../../../../Models/Schedule/Session";
import { AdminScheduleDialogComponent } from "../admin-schedule-dialog/admin-schedule-dialog.component";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.scss"],
})
export class AdminDashboardComponent implements OnInit {
  scheduleMap: Map<Date, any>;
  scheduleMapUnchecked: Map<Date, any>;

  constructor(
    private authService: AuthService,
    private adminScheduleService: AdminScheduleService,
    private instructorService: InstructorsService,
    public dialog: MatDialog
  ) {
    this.scheduleMap = new Map();
    this.scheduleMapUnchecked = new Map();
  }

  ngOnInit(): void {
    this.getMonthlySessions();
  }

  getMonthlySessions() {
    this.adminScheduleService
      .getCurrentSessionSchedule()
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: any, key: any) => {
            let scheduledSession = this.initSession(session);
            this.fillScheduleHashmap(scheduledSession);
          });
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }

        this.getUncheckedMonthlySessions();
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

  getUncheckedMonthlySessions() {
    this.adminScheduleService
      .getUncheckedSessionSchedule()
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: any, key: any) => {
            let scheduledSession = this.initSession(session);
            this.fillUncheckedScheduleHashmap(scheduledSession);
          });
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases 👩");
        }
      });
  }

  //Auxiliary function for getMonthlySessions
  fillUncheckedScheduleHashmap(scheduledSession: Session) {
    if (scheduledSession.date != undefined) {
      let currentDay: any[] = this.scheduleMapUnchecked.get(
        scheduledSession.date
      );
      if (currentDay == undefined) {
        this.scheduleMapUnchecked.set(scheduledSession.date, [
          scheduledSession,
        ]);
      } else {
        currentDay.push(scheduledSession);
        this.scheduleMapUnchecked.set(scheduledSession.date, currentDay);
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

  openDatePicker() {
    const dialogRef = this.dialog.open(AdminScheduleDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
