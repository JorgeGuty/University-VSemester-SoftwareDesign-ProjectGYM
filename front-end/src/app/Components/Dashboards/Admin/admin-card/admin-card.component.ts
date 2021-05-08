import { Component, OnInit, Input } from "@angular/core";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-card",
  templateUrl: "./admin-card.component.html",
  styleUrls: ["./admin-card.component.scss"],
})
export class AdminCardComponent implements OnInit {
  @Input()
  session!: any;
  @Input()
  instructor!: any;
  @Input()
  sessionService!: any;

  //Todo: implement change instructor
  constructor(private adminScheduleService: AdminScheduleService) {}

  ngOnInit(): void {}

  onInstructorChange() {
    console.log("Instructor changed!!!");
  }
}
