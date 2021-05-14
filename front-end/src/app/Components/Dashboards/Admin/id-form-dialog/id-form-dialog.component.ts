import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-id-form-dialog",
  templateUrl: "./id-form-dialog.component.html",
  styleUrls: ["./id-form-dialog.component.scss"],
})
export class IdFormDialogComponent implements OnInit {
  clientId: string = "";

  constructor(public dialogRef: MatDialogRef<IdFormDialogComponent>) {}

  ngOnInit(): void {}

  onConfirm() {
    this.dialogRef.close(this.clientId);
  }
}
