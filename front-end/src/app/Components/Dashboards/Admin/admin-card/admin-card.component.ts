import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";
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

  //Todo: implement change instructor
  constructor(
    public dialog: MatDialog,
    private adminScheduleService: AdminScheduleService
  ) {}

  ngOnInit(): void {}

  onInstructorChange() {
    console.log("Instructor changed!!!");
  }

  // Open dialog form
  onRegister() {
    const dialogRef = this.dialog.open(IdFormDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
