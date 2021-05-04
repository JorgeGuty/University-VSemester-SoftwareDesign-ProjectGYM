import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AdminPreliminaryDialogComponent } from "../admin-preliminary-dialog/admin-preliminary-dialog.component";

@Component({
  selector: "app-admin-preliminary-dashboard",
  templateUrl: "./admin-preliminary-dashboard.component.html",
  styleUrls: ["./admin-preliminary-dashboard.component.scss"],
})
export class AdminPreliminaryDashboardComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openForm() {
    const dialogRef = this.dialog.open(AdminPreliminaryDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
