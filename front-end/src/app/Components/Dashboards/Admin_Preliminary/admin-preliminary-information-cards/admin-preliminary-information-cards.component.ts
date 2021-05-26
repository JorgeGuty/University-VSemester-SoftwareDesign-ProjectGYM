import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";
import { Component, OnInit, Input } from "@angular/core";
import DaysEnum from "src/app/Models/Calendar/DaysEnum";

@Component({
  selector: "app-admin-preliminary-information-cards",
  templateUrl: "./admin-preliminary-information-cards.component.html",
  styleUrls: ["./admin-preliminary-information-cards.component.scss"],
})
export class AdminPreliminaryInformationCardsComponent
  implements OnInit, OnChanges
{
  @Input()
  sessionSchedule!: any;
  @Input()
  dateJSON!: any;

  constructor() {}

  ngOnInit(): void {
    console.log("Fechisima");
    console.log(this.dateJSON);
  }

  getDayName(day: any) {
    let this_day = day + 1;
    console.log("dia => " + this_day);
    return DaysEnum[this_day];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("ME SOLICITARON CAMBIAR");
    console.log(changes);
  }
}
