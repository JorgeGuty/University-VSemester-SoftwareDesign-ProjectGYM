import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminPreliminaryDialogComponent } from "../admin-preliminary-dialog/admin-preliminary-dialog.component";
import { FormControl } from "@angular/forms";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";

import * as moment from "moment";
import { AdminPreliminaryDatePickerComponent } from "../../admin-preliminary-date-picker/admin-preliminary-date-picker.component";

export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-admin-preliminary-dashboard",
  templateUrl: "./admin-preliminary-dashboard.component.html",
  styleUrls: ["./admin-preliminary-dashboard.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdminPreliminaryDashboardComponent implements OnInit {
  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: moment.Moment,
    datepicker: MatDatepicker<moment.Moment>
  ) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openForm() {
    const dialogRef = this.dialog.open(AdminPreliminaryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDatePicker() {
    const dialogRef = this.dialog.open(AdminPreliminaryDatePickerComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
