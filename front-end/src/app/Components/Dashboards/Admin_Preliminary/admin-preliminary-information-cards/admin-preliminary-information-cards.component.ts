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
  implements OnInit, OnChanges {
  @Input()
  sessionSchedule!: any;

  constructor() {}

  ngOnInit(): void {}

  getDayName(day: any) {
    return DaysEnum[day];
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
