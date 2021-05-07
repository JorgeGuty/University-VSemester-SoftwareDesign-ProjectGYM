import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminPreliminaryDialogComponent } from "../admin-preliminary-dialog/admin-preliminary-dialog.component";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { Session } from "src/app/Models/Schedule/Session";
import { AdminPreliminaryDatePickerComponent } from "../admin-preliminary-date-picker/admin-preliminary-date-picker.component";
import DaysEnum from "src/app/Models/Calendar/DaysEnum";

@Component({
  selector: "app-admin-preliminary-dashboard",
  templateUrl: "./admin-preliminary-dashboard.component.html",
  styleUrls: ["./admin-preliminary-dashboard.component.scss"],
})
export class AdminPreliminaryDashboardComponent implements OnInit {
  scheduleMap: Map<number, any>;
  public show = true;

  // Todo : currentPreliminarySchedule : Array<PreliminarySession> = [];

  constructor(
    public dialog: MatDialog,
    private adminScheduleService: AdminScheduleService
  ) {
    this.scheduleMap = new Map();
  }

  ngOnInit(): void {
    //this.fillScheduleData("hola");
  }

  openForm() {
    const dialogRef = this.dialog.open(AdminPreliminaryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  //Todo: implmentar array de schedules con el get de preliminary schedule
  openDatePicker() {
    const dialogRef = this.dialog.open(AdminPreliminaryDatePickerComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log("FECHAAAA");
      console.log(result);
      this.scheduleMap = new Map();
      this.fillScheduleData(result);
    });
  }

  fillScheduleData(date: any) {
    //Todo: implement method
    this.adminScheduleService
      .getPreliminarySessionSchedule(date)
      .subscribe((sessions: any) => {
        console.log(sessions);
        if (sessions != null) {
          sessions.preliminary_sessions.forEach(
            (session: Session, key: any) => {
              //this.currentPreliminarySchedule.push(session)
              console.log("holis mundo");
              console.log(session);
              //let scheduledSession = this.initSession(session);
              console.log(session);
              this.fillScheduleHashmap(session);
              console.log(this.scheduleMap.get(4));
            }
          );
          console.log(this.scheduleMap);
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }
      });
  }

  fillScheduleHashmap(scheduledSession: any) {
    console.log("puta vida");
    console.log(scheduledSession.week_day);
    // let date: Date;
    // if (scheduledSession.date?.toString() != undefined) {
    //   date = new Date(scheduledSession.date?.toString());
    // } else {
    //   date = new Date();
    // }
    // let keyDay: string = date.toString().split(" ")[0];
    let keyDay: number = scheduledSession.week_day;
    if (scheduledSession.week_day != undefined) {
      let dayOfWeek: any[] = this.scheduleMap.get(keyDay);
      if (dayOfWeek == undefined) {
        this.scheduleMap.set(keyDay, [scheduledSession]);
      } else {
        dayOfWeek.push(scheduledSession);
        this.scheduleMap.set(keyDay, dayOfWeek);
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

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }

  getDayName(day: any) {
    return DaysEnum[day];
  }
}
