import { Component, OnInit } from "@angular/core";
import Service from "src/app/Models/Schedule/Service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"],
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  columnContent: string[] = [];

  constructor(public servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.servicesService
      .getServicesTypes()
      .subscribe((serviceList: [Service]) => {
        serviceList.forEach((service: any, key: any) => {
          if (this.columnContent.length == 0)
            this.columnContent = Object.keys(service);
          this.services.push(service);
        });
        this.columnContent.push("Actions");
      });
  }

  onDelete(services: Service) {
    // TODO: Implement delete Instructor service
    console.log(services);
  }
}
