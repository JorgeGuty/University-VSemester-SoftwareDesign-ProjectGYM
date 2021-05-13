import { Component, OnInit, ɵɵsetComponentScope } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminPreliminaryDialogComponent } from "../admin-preliminary-dialog/admin-preliminary-dialog.component";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { Session } from "src/app/Models/Schedule/Session";
import { AdminPreliminaryDatePickerComponent } from "../admin-preliminary-date-picker/admin-preliminary-date-picker.component";
import DaysEnum from "src/app/Models/Calendar/DaysEnum";
import PreliminarySession from "src/app/Models/Prelimimary/PreliminarySession";

@Component({
  selector: "app-admin-preliminary-dashboard",
  templateUrl: "./admin-preliminary-dashboard.component.html",
  styleUrls: ["./admin-preliminary-dashboard.component.scss"],
})
export class AdminPreliminaryDashboardComponent implements OnInit {
  scheduleMap: Map<number, any>;
  dateJSON: any;
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
      this.fillScheduleData(this.dateJSON);
    });
  }

  openDatePicker() {
    const dialogRef = this.dialog.open(AdminPreliminaryDatePickerComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.scheduleMap = new Map();
      this.dateJSON = result;
      console.log(this.dateJSON);
      this.fillScheduleData(result);
    });
  }

  fillScheduleData(date: any) {
    this.adminScheduleService
      .getPreliminarySessionSchedule(date)
      .subscribe((sessions: any) => {
        console.log(sessions);
        if (sessions != null) {
          sessions.preliminary_sessions.forEach(
            (session: Session, key: any) => {
              this.fillScheduleHashmap(session);
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

  confirmSchedule() {
    this.adminScheduleService
      .confirmPreliminarySchedule(this.dateJSON)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  reload() {
    this.show = false;
    setTimeout(() => (this.show = true));
  }

  getDayName(day: any) {
    return DaysEnum[day];
  }
}
