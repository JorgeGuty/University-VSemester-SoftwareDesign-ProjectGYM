import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Service from "src/app/Models/Schedule/Service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";

@Component({
  selector: "app-service-dialogue",
  templateUrl: "./service-dialogue.component.html",
  styleUrls: ["./service-dialogue.component.scss"],
})
export class ServiceDialogueComponent implements OnInit {
  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {}

  serviceForm = new FormGroup({
    name: new FormControl("", Validators.required),
    maxSpaces: new FormControl("", Validators.pattern("^[0-9]*")),
    cost: new FormControl("", Validators.required),
  });

  initService(formJSON: any): Service {
    let service: Service = {
      name: formJSON.value.name,
      maxSpaces: formJSON.value.maxSpaces,
      cost: formJSON.value.cost,
    };
    return service;
  }

  onSave() {
    let service: Service = this.initService(this.serviceForm);
    console.log("Datos de instructor insertados");
    console.log(service);
    this.servicesService.insertService(service).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
