import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { ClientScheduleService } from "src/app/Services/Dashboard/client-schedule.service";

@Component({
  selector: "app-client-services",
  templateUrl: "./client-services.component.html",
  styleUrls: ["./client-services.component.scss"],
})
export class ClientServicesComponent implements OnInit {
  @Input()
  scheduleMap!: any;
  @Input()
  scheduleMapReservations!: any;

  constructor(private clientScheduleService: ClientScheduleService) {}

  ngOnInit(): void {
    console.log("🧔");
    console.log(this.scheduleMapReservations);
    console.log("🧔");
  }

  isSessionReserved(sessionName: string) {
    return this.scheduleMapReservations.has(sessionName);
  }
}
