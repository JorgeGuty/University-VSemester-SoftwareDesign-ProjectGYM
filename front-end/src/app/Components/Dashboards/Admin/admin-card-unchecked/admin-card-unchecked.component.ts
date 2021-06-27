import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { SessionsService } from "src/app/Services/SessionService/sessions.service";

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

  constructor(
    private sessionScheduleService: SessionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialogue() {
    ("Dialogue open 🎊");
  }
}
