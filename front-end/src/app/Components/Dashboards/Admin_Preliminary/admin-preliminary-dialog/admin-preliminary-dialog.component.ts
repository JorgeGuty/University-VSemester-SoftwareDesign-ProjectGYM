import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-admin-preliminary-dialog",
  templateUrl: "./admin-preliminary-dialog.component.html",
  styleUrls: ["./admin-preliminary-dialog.component.scss"],
})
export class AdminPreliminaryDialogComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSave() {
    console.log("Clase creada");
  }
}

// @Component({
//   selector: 'dialog-overview-example-dialog',
//   templateUrl: 'dialog-overview-example-dialog.html',
// })
// export class DialogOverviewExampleDialog {

//   constructor(
//     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

// }
