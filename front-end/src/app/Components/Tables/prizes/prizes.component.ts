import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Prizes, { Prize } from "src/app/Models/Prizes/Prizes";
import { PrizeServiceService } from "src/app/Services/Prizes/prize-service.service";
import { AdminPreliminaryDatePickerComponent } from "../../Dashboards/Admin_Preliminary/admin-preliminary-date-picker/admin-preliminary-date-picker.component";

@Component({
  selector: "app-prizes",
  templateUrl: "./prizes.component.html",
  styleUrls: ["./prizes.component.scss"],
})
export class PrizesComponent implements OnInit {
  prizes: Prizes[] = [];
  columnContent: string[] = [];

  alert: any = undefined;

  constructor(
    private prizeService: PrizeServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPrizes();
  }

  loadPrizes() {
    this.prizeService.getServicesTypes("6", "2021").subscribe(
      (res) => {
        if (res != null && res.length != 0) {
          console.log("Premios cargados 👧👧👧");
          this.prizes = res;
          //console.log(Object.keys(prizes[0]));
          this.columnContent = Object.keys(this.prizes[0]);
          this.columnContent = this.columnContent.reverse();
          //this.columnContent.push("Actions");
        } else {
          console.log("Error no hay premios 🎁🎁🎁");
          this.onError("There is no prizes 🎁🎁🎁 on the actual date");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadPrizesCalendar(month: string, year: string) {
    this.prizeService.getServicesTypes(month, year).subscribe(
      (res) => {
        console.log("hola");
        console.log(res);
        console.log("hola");
        if (res != null && res.length != 0) {
          console.log("Premios cargados 👧👧👧");
          this.prizes = res;
          //console.log(Object.keys(prizes[0]));
          this.columnContent = Object.keys(this.prizes[0]);
          this.columnContent = this.columnContent.reverse();
          //this.columnContent.pop("Actions");
        } else {
          this.prizes = [];
          console.log("Error no hay premios 🎁🎁🎁");
          this.onError(
            "There are no prizes 🎁🎁🎁, date: " + month + " " + year
          );
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  notifyUser() {
    console.log("Premio enviado 👧👧👧");
    this.prizeService.updatePrizes().subscribe(
      (res) => {
        console.log("holis");
        console.log(res);
      },
      (err) => {
        console.log("Error");
        console.log(err);
      }
    );
  }

  openCalendar() {
    const dialogRef = this.dialog.open(AdminPreliminaryDatePickerComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(result);
      this.loadPrizesCalendar(result.month, result.year);
    });
  }

  onError(message: any) {
    console.log("Catch that mate 👨‍🦰");
    this.alert = {
      type: "info",
      message: message,
    };
  }

  close() {
    this.alert = undefined;
  }
}
