import { Component, OnInit, Input } from "@angular/core";
import DaysEnum from "src/app/Models/Calendar/DaysEnum";
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

  constructor(private adminScheduleService: AdminScheduleService) {}

  ngOnInit(): void {}

  onEliminateCard() {
    console.log("Eliminada papichulo!!!");
  }

  getDayName(day: any) {
    return DaysEnum[day];
  }
}
