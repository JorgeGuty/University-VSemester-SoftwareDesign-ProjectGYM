import { Component, OnInit } from "@angular/core";
import Prizes, { Prize } from "src/app/Models/Prizes/Prizes";
import { PrizeServiceService } from "src/app/Services/Prizes/prize-service.service";

@Component({
  selector: "app-prizes",
  templateUrl: "./prizes.component.html",
  styleUrls: ["./prizes.component.scss"],
})
export class PrizesComponent implements OnInit {
  prizes: Prizes[] = [];
  columnContent: string[] = [];

  constructor(private prizeService: PrizeServiceService) {}

  ngOnInit(): void {
    this.loadPrizes();
  }

  loadPrizes() {
    this.prizeService.getServicesTypes("6", "2021").subscribe(
      (res) => {
        if (res.length != 0) {
          console.log("Premios cargados 👧👧👧");
          this.prizes = res;
          //console.log(Object.keys(prizes[0]));
          this.columnContent = Object.keys(this.prizes[0]);
          this.columnContent = this.columnContent.reverse();
          this.columnContent.push("Actions");
        } else {
          console.log("Error no hay precios");
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  notifyUser(prize: any) {
    console.log("Premio enviado 👧👧👧");
  }

  openCalendar() {
    console.log("Calendario Abirtop ");
  }
}
