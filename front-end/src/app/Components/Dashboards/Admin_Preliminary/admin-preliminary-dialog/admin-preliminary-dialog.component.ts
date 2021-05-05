import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-admin-preliminary-dialog",
  templateUrl: "./admin-preliminary-dialog.component.html",
  styleUrls: ["./admin-preliminary-dialog.component.scss"],
})
export class AdminPreliminaryDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  preliminaryForm = new FormGroup({
    className: new FormControl("", Validators.required),
    day: new FormControl("", Validators.required),
    cost: new FormControl("", Validators.required),
    hour: new FormControl(0, Validators.pattern("([01]?[0-9]|2[0-3])")),
    min: new FormControl(0, Validators.pattern("[0-5][0-9]")),
    duration: new FormControl("", Validators.required),
    instructorId: new FormControl("", Validators.required),
    sessionServiceId: new FormControl("", Validators.required),
  });

  onSave() {
    console.log("Clase creada");
    if (this.preliminaryForm.valid) console.log(this.preliminaryForm.value);
  }
}
