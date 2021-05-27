import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Client from "src/app/Models/Clients/Client";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";
import { ClientDialogueComponent } from "../client-dialogue/client-dialogue.component";

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

  onDelete(instructorJSON: any) {
    console.log(instructorJSON);
  }
}
