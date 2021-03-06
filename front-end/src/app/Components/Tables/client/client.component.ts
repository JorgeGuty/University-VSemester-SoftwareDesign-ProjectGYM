import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Client from "src/app/Models/Clients/Client";
import Instructor from "src/app/Models/Schedule/Instructor";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";
import { ClientDialogueComponent } from "../client-dialogue/client-dialogue.component";
import { ClientPaymentDialogueComponent } from "../client-payment-dialogue/client-payment-dialogue.component";

@Component({
  selector: "app-client",
  templateUrl: "./client.component.html",
  styleUrls: ["./client.component.scss"],
})
export class ClientComponent implements OnInit {
  client: Client[] = [];
  columnContent: string[] = [];
  isButtonsLoaded: boolean = false;

  constructor(public dialog: MatDialog, public clientService: ClientsService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  openDialogue() {
    const dialogRef = this.dialog.open(ClientDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadClients();
    });
  }

  openPaymentDialogue() {
    const dialogRef = this.dialog.open(ClientPaymentDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadClients();
    });
  }

  loadClients() {
    this.clientService.getClients().subscribe((clientList: [Client]) => {
      this.client = [];
      clientList.forEach((client: any, key: any) => {
        if (this.columnContent.length == 0)
          this.columnContent = Object.keys(client);
        this.client.push(client);
      });
      if (!this.isButtonsLoaded) {
        this.isButtonsLoaded = true;
        this.columnContent.push("Actions");
      }
      console.log(this.columnContent);
      console.log(this.client);
    });
  }

  initClient(clientJSON: any): Client {
    let client: Client = {};
    client.balance = clientJSON.balance;
    client.email = clientJSON.email;
    client.identification = clientJSON.identification;
    client.membershipNumber = clientJSON.membershipNumber.toString();
    client.name = clientJSON.name;
    client.phone = clientJSON.phone;
    return client;
  }

  onDelete(clientJSON: any) {
    let client: Client = this.initClient(clientJSON);
    console.log("clientJSON");
    console.log(client);
    this.clientService.deleteClient(client).subscribe(
      (res) => {
        this.loadClients();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
