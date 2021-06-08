import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import DaysEnum from "src/app/Models/Calendar/DaysEnum";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-schedule-dialog",
  templateUrl: "./admin-schedule-dialog.component.html",
  styleUrls: ["./admin-schedule-dialog.component.scss"],
})
export class AdminScheduleDialogComponent implements OnInit {
  DaysEnum = DaysEnum;
  daysNumber = [1, 2, 3, 4, 5, 6, 7];

  constructor(private adminScheduleService: AdminScheduleService) {}

  ngOnInit(): void {}

  roomForm = new FormGroup({
    weekDay: new FormControl("", Validators.required),
    openingHour: new FormControl(0, Validators.pattern("([01]?[0-9]|2[0-3])")),
    openingMin: new FormControl(0, Validators.pattern("[0-5][0-9]")),
    closingHour: new FormControl(0, Validators.pattern("([01]?[0-9]|2[0-3])")),
    closingMin: new FormControl(0, Validators.pattern("[0-5][0-9]")),
    roomNumber: new FormControl(0, Validators.pattern("^[0-9]*")),
  });

  initRoomForm(formJson: any): any {
    let openingTime: string =
      formJson.value.openingHour + ":" + formJson.value.openingMin;
    let closingTime: string =
      formJson.value.closingHour + ":" + formJson.value.closingMin;
    let roomJson: any = {
      weekDay: formJson.value.weekDay.toString(),
      roomNumber: formJson.value.roomNumber.toString(),
      openingTime: openingTime,
      closingTime: closingTime,
    };
    return roomJson;
  }

  onSave() {
    let roomJson: any = this.initRoomForm(this.roomForm);
    console.log("Room");
    console.log(roomJson);
    this.adminScheduleService.setRoomWorkingHours(roomJson).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
