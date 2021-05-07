import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-preliminary-dialog",
  templateUrl: "./admin-preliminary-dialog.component.html",
  styleUrls: ["./admin-preliminary-dialog.component.scss"],
})
export class AdminPreliminaryDialogComponent implements OnInit {
  constructor(private adminScheduleService: AdminScheduleService) {}

  ngOnInit(): void {}

  preliminaryForm = new FormGroup({
    className: new FormControl("", Validators.required),
    day: new FormControl("", Validators.required),
    hour: new FormControl(0, Validators.pattern("([01]?[0-9]|2[0-3])")),
    min: new FormControl(0, Validators.pattern("[0-5][0-9]")),
    year: new FormControl(2000, Validators.pattern("^[12][0-9]{3}$")),
    month: new FormControl(1, Validators.pattern("^(0?[1-9]|1[012])$")),
    duration: new FormControl("", Validators.required),
    instructorIdNum: new FormControl("", Validators.required),
    sessionServiceName: new FormControl("", Validators.required),
  });

  onSave() {
    console.log("Clase creada");
    if (this.preliminaryForm.valid) console.log(this.preliminaryForm.value);
    // this.sendForm(this.preliminaryForm.value);
  }

  sendForm(form: any) {
    //Todo: implement method
    this.adminScheduleService
      .insertPreliminarySessionSchedule(form)
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
