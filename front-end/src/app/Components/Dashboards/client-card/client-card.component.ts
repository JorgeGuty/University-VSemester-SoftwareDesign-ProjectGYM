import { Component, OnInit, Input } from "@angular/core";
import { Session } from "src/app/Models/Schedule/Session";

@Component({
  selector: "app-client-card",
  templateUrl: "./client-card.component.html",
  styleUrls: ["./client-card.component.scss"],
})
export class ClientCardComponent implements OnInit {
  @Input()
  session!: Session;

  constructor() {}

  ngOnInit(): void {}
}
