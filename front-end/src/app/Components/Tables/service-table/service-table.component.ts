import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import Service from "src/app/Models/Schedule/Service";

@Component({
  selector: "app-service-table",
  templateUrl: "./service-table.component.html",
  styleUrls: ["./service-table.component.scss"],
})
export class ServiceTableComponent implements OnInit {
  @Input()
  services!: any;
  @Input()
  columnContent!: any;
  @Output()
  serviceDeleted = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onDelete(service: Service) {
    this.serviceDeleted.emit(service);
  }
}
