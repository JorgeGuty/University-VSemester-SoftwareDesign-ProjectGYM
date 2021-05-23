import { Component, Input, OnInit } from "@angular/core";
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

  constructor() {}

  ngOnInit(): void {}

  onDelete(service: Service) {
    // TODO: Implement delete Instructor service
    console.log(service);
  }
}
