import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { SessionsService } from "src/app/Services/SessionService/sessions.service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";
import { AdminDialogueChangeComponent } from "../admin-dialogue-change/admin-dialogue-change.component";
import { IdFormDialogComponent } from "../id-form-dialog/id-form-dialog.component";

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
  @Input()
  instructorArray: any;

  //Todo: implement change instructor
  constructor(
    private sessionScheduleService: SessionsService,
    public dialog: MatDialog,
    private adminScheduleService: AdminScheduleService,
    private authService: AuthService,
    private instructorService: InstructorsService
  ) {}

  ngOnInit(): void {}

  openDialogue() {
    const dialogRef = this.dialog.open(AdminDialogueChangeComponent, {
      data: {
        sessionServiceName: this.sessionService.name,
        instructor: this.instructor,
        session: this.session,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
      if (result != undefined) {
        this.instructor = result;
      }
    });
  }

  // Open dialog form
  onRegister() {
    const dialogRef = this.dialog.open(IdFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result != "") {
        this.sendRegistration(result);
      }
    });
  }

  sendRegistration(result: any) {
    let clientReservationForm = this.initReserveSessionInformation(result);
    this.sessionScheduleService.bookSession(clientReservationForm).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initReserveSessionInformation(clientIdentification: string): any {
    let roomId = "1";
    let reserveSessionJson: any = {
      date: this.session.date.toString(),
      startTime: this.session.time.toString(),
      clientIdentification: clientIdentification.toString(),
      roomId: roomId,
    };

    return reserveSessionJson;
  }
}
