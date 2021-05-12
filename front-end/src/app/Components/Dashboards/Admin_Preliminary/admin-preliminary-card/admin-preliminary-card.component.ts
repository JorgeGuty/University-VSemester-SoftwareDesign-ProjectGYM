import { Component, OnInit, Input } from "@angular/core";
import DaysEnum from "src/app/Models/Calendar/DaysEnum";
import DeletePreliminarySession from "src/app/Models/Prelimimary/DeletePreliminaryForm";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-preliminary-card",
  templateUrl: "./admin-preliminary-card.component.html",
  styleUrls: ["./admin-preliminary-card.component.scss"],
})
export class AdminPreliminaryCardComponent implements OnInit {
  @Input()
  session!: any;
  @Input()
  instructor!: any;
  @Input()
  sessionService!: any;
  @Input()
  dateJSON!: any;

  constructor(private adminScheduleService: AdminScheduleService) {}

  ngOnInit(): void {}

  onEliminateCard() {
    let deteledPreliminarySession: DeletePreliminarySession = this.initDeleteForm();
    this.adminScheduleService
      .deletePreliminarySessionSchedule(deteledPreliminarySession)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  initDeleteForm(): DeletePreliminarySession {
    let roomId: number = 1;
    let deteledPreliminarySession: DeletePreliminarySession = {
      year: this.dateJSON.year,
      month: this.dateJSON.month,
      startTime: this.session.time,
      weekDay: this.session.week_day.toString(),
      roomId: roomId.toString(),
    };

    console.log(deteledPreliminarySession);
    return deteledPreliminarySession;
  }

  getDayName(day: any) {
    return DaysEnum[day];
  }
}
