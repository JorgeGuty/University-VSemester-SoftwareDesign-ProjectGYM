import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Client from "src/app/Models/Clients/Client";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";

@Component({
  selector: "app-client-dialogue",
  templateUrl: "./client-dialogue.component.html",
  styleUrls: ["./client-dialogue.component.scss"],
})
export class ClientDialogueComponent implements OnInit {
  constructor(public clientService: ClientsService) {}

  ngOnInit(): void {}

  clientForm = new FormGroup({
    name: new FormControl("", Validators.required),
    identification: new FormControl("", Validators.pattern("^[0-9]*")),
    email: new FormControl("", Validators.required),
    phone: new FormControl("", Validators.pattern("^[0-9]*")),
  });

  initClient(formJSON: any): Client {
    let client: Client = {
      name: formJSON.value.name,
      identification: formJSON.value.identification,
      email: formJSON.value.email,
      phone: formJSON.value.phone,
    };
    console.log("Cliente inicializado como:");
    console.log(client);
    return client;
  }

  onSave() {
    let client: Client = this.initClient(this.clientForm);
    this.clientService.insertClient(client).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
