import { Component, Inject, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";

@Component({
  selector: "app-service-max-spaces-update-dialogue",
  templateUrl: "./service-max-spaces-update-dialogue.component.html",
  styleUrls: ["./service-max-spaces-update-dialogue.component.scss"],
})
export class ServiceMaxSpacesUpdateDialogueComponent implements OnInit {
  serviceNumber: any;

  serviceForm = new FormGroup({
    serviceMax: new FormControl("", Validators.required),
  });

  constructor(
    private servicesService: ServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.serviceNumber = this.data.serviceNumber;
  }

  ngOnInit(): void {}

  onSave() {
    console.log(this.serviceForm.value.serviceMax);
    console.log(this.serviceNumber);
    let serviceForm: any = {
      serviceNumber: this.serviceNumber.toString(),
      maxSpaces: this.serviceForm.value.serviceMax.toString(),
    };
    this.servicesService.updateMaxSpaces(serviceForm).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
