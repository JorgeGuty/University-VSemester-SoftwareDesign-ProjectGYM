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
  @Output()
  errorMessage = new EventEmitter<string>();

  constructor(private clientScheduleService: ClientScheduleService) {}

  ngOnInit(): void {
    console.log("🧔");
    console.log(this.scheduleMapReservations);
    console.log("🧔");
  }

  isSessionReserved(sessionName: string) {
    return this.scheduleMapReservations.has(sessionName);
  }

  onError(message: any) {
    console.log("Catch that m8 yeap i did 👨‍🦰");
    this.errorMessage.emit(message);
  }
}
