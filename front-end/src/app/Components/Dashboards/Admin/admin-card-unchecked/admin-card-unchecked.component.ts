import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Client from "src/app/Models/Clients/Client";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
import { SessionsService } from "src/app/Services/SessionService/sessions.service";
import { AdminDialogueChangeComponent } from "../admin-dialogue-change/admin-dialogue-change.component";
import { AdminDialogueUncheckedComponent } from "../admin-dialogue-unchecked/admin-dialogue-unchecked.component";

@Component({
  selector: "app-admin-card-unchecked",
  templateUrl: "./admin-card-unchecked.component.html",
  styleUrls: ["./admin-card-unchecked.component.scss"],
})
export class AdminCardUncheckedComponent implements OnInit {
  @Input()
  session!: any;
  @Input()
  instructor!: any;
  @Input()
  sessionService!: any;
  @Input()
  instructorArray: any;
  @Output()
  update = new EventEmitter<any>();

  constructor(
    private sessionScheduleService: SessionsService,
    private adminScheduleService: AdminScheduleService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialogue() {
    ("Dialogue open 🎊");
    this.adminScheduleService.getSessionParticipant(this.session).subscribe(
      (res) => {
        if (res.body != null) {
          let participants: Client[] = [];
          res.body.forEach((participant: Client) => {
            participants.push(participant);
          });

          if (participants != []) {
            console.log("There are Participants 👨‍🦰👨‍🦰👨‍🦰");
            this.openDialogue_aux(participants);
          } else {
            // deberia ser error desde la base
            console.log("No single Participants 👨‍🦰");
          }
        }
        if (res.body == null) {
          console.log("Error: No Participants in session 💀💀💀");
        }
      },
      (err) => {
        console.log("Error: No Participants 💀💀💀");
      }
    );
  }

  openDialogue_aux(participants: Client[]) {
    const dialogRef = this.dialog.open(AdminDialogueUncheckedComponent, {
      data: {
        participantsArray: participants,
        session: this.session,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      console.log(result);
      this.onUpdate();
    });
  }

  onUpdate() {
    this.update.emit();
  }
}
