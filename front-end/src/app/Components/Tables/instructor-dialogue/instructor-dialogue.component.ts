import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import Instructor from "src/app/Models/Schedule/Instructor";
import Service from "src/app/Models/Schedule/Service";

@Component({
  selector: "app-instructor-dialogue",
  templateUrl: "./instructor-dialogue.component.html",
  styleUrls: ["./instructor-dialogue.component.scss"],
})
export class InstructorDialogueComponent implements OnInit {
  serviceArray: any = [];

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.loadServicesTypes();
  }

  instructorForm = new FormGroup({
    name: new FormControl("", Validators.required),
    identification: new FormControl("", Validators.pattern("^[0-9]*")),
    email: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
  });

  initInstructor(formJSON: any): Instructor {
    let instructor: Instructor = {
      name: formJSON.value.name,
      identification: formJSON.value.identification,
      email: formJSON.value.email,
      type: formJSON.value.type,
    };
    return instructor;
  }

  loadServicesTypes() {
    this.servicesService
      .getServicesTypes()
      .subscribe((serviceTypesList: [Service]) => {
        serviceTypesList.forEach((serviceType: any, key: any) => {
          this.serviceArray.push(serviceType);
        });
        // console.log(serviceTypesList);
        // console.log(this.serviceArray);
      });
  }

  onSave() {
    // TODO: implement save register instructor
    console.log("Saved Instructor");
  }
}
