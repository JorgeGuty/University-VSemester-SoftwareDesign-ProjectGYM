import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminPreliminaryDialogComponent } from "../admin-preliminary-dialog/admin-preliminary-dialog.component";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { Session } from "src/app/Models/Schedule/Session";
import { AdminPreliminaryDatePickerComponent } from "../../admin-preliminary-date-picker/admin-preliminary-date-picker.component";

@Component({
  selector: "app-admin-preliminary-dashboard",
  templateUrl: "./admin-preliminary-dashboard.component.html",
  styleUrls: ["./admin-preliminary-dashboard.component.scss"],
})
export class AdminPreliminaryDashboardComponent implements OnInit {
  scheduleMap: Map<string, any>;

  exampleList01: Array<string> = ["hola", "hola", "hola"]; // Prueba
  exampleList02: Array<string> = ["fecha", "fecha", "fecha"]; // Prueba
  currentSchedule: Array<string> = [];
  // Todo : currentPreliminarySchedule : Array<PreliminarySession> = [];

  constructor(
    public dialog: MatDialog,
    private adminScheduleService: AdminScheduleService
  ) {
    this.scheduleMap = new Map();
  }

  ngOnInit(): void {
    this.fillScheduleData("hola");
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
      console.log(result);
      if (result.year === "2021") {
        this.currentSchedule = this.exampleList01;
      } else {
        this.currentSchedule = this.exampleList02;
      }
      this.fillScheduleData(result);
    });
  }

  fillScheduleData(date: any) {
    //Todo: implement method
    this.adminScheduleService
      .getPreliminarySessionSchedule(date)
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: Session, key: any) => {
            //this.currentPreliminarySchedule.push(session)
            console.log(session);
            let scheduledSession = this.initSession(session);
            this.fillScheduleHashmap(scheduledSession);
            console.log(this.scheduleMap.get("Thu"));
          });
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }
      });
  }

  fillScheduleHashmap(scheduledSession: Session) {
    let date: Date;
    if (scheduledSession.date?.toString() != undefined) {
      date = new Date(scheduledSession.date?.toString());
    } else {
      date = new Date();
    }
    let keyDay: string = date.toString().split(" ")[0];
    if (scheduledSession.date != undefined) {
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
}
