import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-admin-card-container",
  templateUrl: "./admin-card-container.component.html",
  styleUrls: ["./admin-card-container.component.scss"],
})
export class AdminCardContainerComponent implements OnInit {
  @Input()
  scheduleMap: any;
  @Input()
  scheduleMapUnchecked: any;
  @Output()
  update = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console.log("🧔");
    console.log(this.scheduleMap);
    console.log("🧔");
    console.log("🧔");
    console.log(this.scheduleMapUnchecked);
    console.log("🧔");
  }

  onUpdate() {
    this.update.emit();
  }
}
