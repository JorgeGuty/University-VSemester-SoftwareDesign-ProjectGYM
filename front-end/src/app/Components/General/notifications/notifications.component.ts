import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import Notifications from "src/app/Models/Schedule/Notifications";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.component.html",
  styleUrls: ["./notifications.component.scss"],
})
export class NotificationsComponent implements OnInit {
  @Input()
  notificationArray!: Notifications[];

  constructor() {}

  ngOnInit(): void {}
}
