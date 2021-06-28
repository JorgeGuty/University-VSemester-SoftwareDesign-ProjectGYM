import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-prizes-table",
  templateUrl: "./prizes-table.component.html",
  styleUrls: ["./prizes-table.component.scss"],
})
export class PrizesTableComponent implements OnInit {
  @Input()
  notifications!: any;
  @Input()
  columnContent!: any[];

  constructor() {
    console.log(this.columnContent);
  }

  ngOnInit(): void {}

  notifyUser(notification: any) {
    console.log("Notification send 🥧🥧🥧");
  }

  openCalendar() {
    console.log("Calendar Opened");
  }
}
