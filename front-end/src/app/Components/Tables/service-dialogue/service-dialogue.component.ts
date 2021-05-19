import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Service from "src/app/Models/Schedule/Service";

@Component({
  selector: "app-service-dialogue",
  templateUrl: "./service-dialogue.component.html",
  styleUrls: ["./service-dialogue.component.scss"],
})
export class ServiceDialogueComponent implements OnInit {
  constructor() {}

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
    // TODO: implement save register instructor
    console.log("Saved Service");
  }
}
