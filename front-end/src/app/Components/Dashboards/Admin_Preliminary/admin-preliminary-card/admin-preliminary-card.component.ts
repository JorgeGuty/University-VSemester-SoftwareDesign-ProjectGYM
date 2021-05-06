import { Component, OnInit } from "@angular/core";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-preliminary-card",
  templateUrl: "./admin-preliminary-card.component.html",
  styleUrls: ["./admin-preliminary-card.component.scss"],
})
export class AdminPreliminaryCardComponent implements OnInit {
  constructor(private adminScheduleService: AdminScheduleService) {}

  ngOnInit(): void {}
}
