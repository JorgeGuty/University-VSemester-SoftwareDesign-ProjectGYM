import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Service from "src/app/Models/Schedule/Service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import { ServiceMaxSpacesUpdateDialogueComponent } from "../service-max-spaces-update-dialogue/service-max-spaces-update-dialogue.component";

@Component({
  selector: "app-service-table",
  templateUrl: "./service-table.component.html",
  styleUrls: ["./service-table.component.scss"],
})
export class ServiceTableComponent implements OnInit {
  @Input()
  services!: any;
  @Input()
  columnContent!: any;
  @Output()
  serviceDeleted = new EventEmitter<any>();
  @Output()
  serviceUpdated = new EventEmitter<any>();

  openUpdateDialogue(service: any) {
    const dialogRef = this.dialog.open(
      ServiceMaxSpacesUpdateDialogueComponent,
      {
        data: {
          serviceNumber: service.id,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
      this.serviceUpdated.emit();
    });
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onDelete(service: Service) {
    this.serviceDeleted.emit(service);
  }
}
