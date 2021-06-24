import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Service from "src/app/Models/Schedule/Service";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import { ServiceDialogueComponent } from "../service-dialogue/service-dialogue.component";

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"],
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  favoriteSessionsMap: Map<any, Service>;
  columnContent: string[] = [];
  isButtonsLoaded: boolean = false;

  constructor(
    public dialog: MatDialog,
    public servicesService: ServicesService,
    public authService: AuthService
  ) {
    this.favoriteSessionsMap = new Map();
  }

  ngOnInit(): void {
    this.loadServices();

    if (!this.authService.isAdmin()) {
      this.loadFavoriteServices();
    }
  }

  openDialogue() {
    const dialogRef = this.dialog.open(ServiceDialogueComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // this.fillScheduleData(this.dateJSON);
      this.loadServices();
    });
  }

  loadServices() {
    this.servicesService
      .getServicesTypes()
      .subscribe((serviceList: [Service]) => {
        console.log(serviceList);
        this.services = [];
        serviceList.forEach((service: any, key: any) => {
          if (this.columnContent.length == 0)
            this.columnContent = Object.keys(service);
          this.services.push(service);
        });
        if (!this.isButtonsLoaded) {
          this.isButtonsLoaded = true;
          this.columnContent.push("Actions");
          //sthis.columnContent.push("Updates");
        }
      });
  }

  loadFavoriteServices() {
    console.log("Cargue mis servicios favoritos");
  }

  onDelete(serviceJSON: Service) {
    this.servicesService.deleteService(serviceJSON).subscribe(
      (res) => {
        this.loadServices();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onMarked(serviceJSON: any) {
    console.log("Yo marque como favorito el servicio");
    console.log(serviceJSON);
  }

  onUpdate() {
    this.loadServices();
  }
}
