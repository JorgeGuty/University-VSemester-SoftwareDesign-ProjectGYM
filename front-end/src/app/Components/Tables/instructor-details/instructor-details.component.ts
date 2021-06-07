import {
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Instructor from "src/app/Models/Schedule/Instructor";
import Service from "src/app/Models/Schedule/Service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";

@Component({
  selector: "app-instructor-details",
  templateUrl: "./instructor-details.component.html",
  styleUrls: ["./instructor-details.component.scss"],
})
export class InstructorDetailsComponent implements OnInit {
  instructor: Instructor;
  serviceListString: string;
  serviceArray: Array<Service> = [];
  serviceId = 0;

  constructor(
    private servicesService: ServicesService,
    private instructorService: InstructorsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.instructor = new Instructor();
    this.serviceListString = "";
    this.instructor = this.data.instructor;
    console.log("Instructor Recibido");
    console.log(this.instructor);
    this.loadServiceString();
    this.loadServicesTypes();
  }

  ngOnInit(): void {}

  loadServiceString() {
    this.instructor.services?.forEach((service: Service) => {
      this.serviceListString += service.name + ",";
    });
  }

  loadServicesTypes() {
    this.servicesService
      .getServicesTypes()
      .subscribe((serviceTypesList: [Service]) => {
        serviceTypesList.forEach((serviceType: any, key: any) => {
          console.log("SERVICEEE");
          console.log(serviceType);
          this.serviceArray.push(serviceType);
        });
      });
  }

  addService() {
    console.log("Service added");
    console.log(this.instructor.id);
    console.log(this.serviceId);
  }
}
