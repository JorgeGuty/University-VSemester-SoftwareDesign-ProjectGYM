import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
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
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

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
  selector: "app-admin-preliminary-date-picker",
  templateUrl: "./admin-preliminary-date-picker.component.html",
  styleUrls: ["./admin-preliminary-date-picker.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AdminPreliminaryDatePickerComponent implements OnInit {
  // @Output() openPreliminary: EventEmitter<any>;

  date = new FormControl(moment());

  constructor(private adminScheduleService: AdminScheduleService) {
    // this.openPreliminary = new EventEmitter();
  }

  ngOnInit(): void {}

  openPreliminarySchedule(): any {
    // console.log(this.getYear(this.date.value._d));
    // console.log(this.getMonth(this.date.value._d));
    let dateJSON: any = {
      year: this.getYear(this.date.value._d),
      month: this.getMonth(this.date.value._d),
    };
    //this.openPreliminary.emit(dateJSON);
    return dateJSON;
  }

  getYear(date: any) {
    date = date.toString();
    let dateString = date.split(" ");
    return dateString[3];
  }

  getMonth(date: any) {
    date = date.toString();
    let dateString = date.split(" ");
    return dateString[1];
  }

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
}
