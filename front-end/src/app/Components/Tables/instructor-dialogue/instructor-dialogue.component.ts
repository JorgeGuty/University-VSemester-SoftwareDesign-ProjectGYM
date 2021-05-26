import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import Instructor from "src/app/Models/Schedule/Instructor";
import Service from "src/app/Models/Schedule/Service";
import { InstructorsService } from "src/app/Services/UserInfo/instructors.service";

@Component({
  selector: "app-instructor-dialogue",
  templateUrl: "./instructor-dialogue.component.html",
  styleUrls: ["./instructor-dialogue.component.scss"],
})
export class InstructorDialogueComponent implements OnInit {
  serviceArray: Array<string> = [];

  constructor(
    private servicesService: ServicesService,
    private instructorService: InstructorsService
  ) {}

  ngOnInit(): void {
    //this.loadServicesTypes();
    this.serviceArray.push("planta");
    this.serviceArray.push("temporal");
    console.log(this.serviceArray);
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
      });
  }

  onSave() {
    let instructor: Instructor = this.initInstructor(this.instructorForm);
    console.log("Datos de instructor insertados");
    console.log(instructor);
    this.instructorService.insertInstructor(instructor).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
