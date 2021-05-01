import { TYPED_NULL_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, Input } from "@angular/core";
import { Session } from "src/app/Models/Schedule/Session";
import { Instructor } from "src/app/Models/Schedule/Instructor";
import { Service } from "src/app/Models/Schedule/Service";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: "app-client-card",
  templateUrl: "./client-card.component.html",
  styleUrls: ["./client-card.component.scss"],
})
export class ClientCardComponent implements OnInit {
  @Input()
  session!: Session;
  @Input()
  instructor!: Instructor;
  @Input()
  sessionService!: Service;

  isReserved: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  isTileNumber(number: string, tile: Tile) {
    return tile.text === number;
  }

  onRegister() {
    console.log("Registrandose!!!");
    this.isReserved = !this.isReserved;
  }
}
