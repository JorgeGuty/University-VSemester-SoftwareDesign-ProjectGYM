import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminPreliminaryDialogComponent } from "../admin-preliminary-dialog/admin-preliminary-dialog.component";
import { AdminPreliminaryDatePickerComponent } from "../../admin-preliminary-date-picker/admin-preliminary-date-picker.component";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-preliminary-dashboard",
  templateUrl: "./admin-preliminary-dashboard.component.html",
  styleUrls: ["./admin-preliminary-dashboard.component.scss"],
})
export class AdminPreliminaryDashboardComponent implements OnInit {
  exampleList01: Array<string> = ["hola", "hola", "hola"]; // Prueba
  exampleList02: Array<string> = ["fecha", "fecha", "fecha"]; // Prueba
  currentSchedule: Array<string> = [];
  // Todo : currentPreliminarySchedule : Array<PreliminarySession> = [];

  constructor(
    public dialog: MatDialog,
    private adminScheduleService: AdminScheduleService
  ) {}

  ngOnInit(): void {}

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
      //this.fillScheduleData(result);
    });
  }

  fillScheduleData(date: any) {
    //Todo: implement method
    this.adminScheduleService
      .getPreliminarySessionSchedule(date)
      .subscribe((sessions: any) => {
        if (sessions.sessions != null) {
          sessions.sessions.forEach((session: any, key: any) => {
            //this.currentPreliminarySchedule.push(session)
          });
        } else {
          //TODO: Mostrar Error de vacio
          console.log("Erroooooor!!! no hay clases");
        }
      });
  }
}
