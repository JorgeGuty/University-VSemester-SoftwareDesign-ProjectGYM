import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import Service from "src/app/Models/Schedule/Service";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { ServicesService } from "src/app/Services/ServicesInfo/services.service";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";
import { ServiceDialogueComponent } from "../service-dialogue/service-dialogue.component";

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./service.component.scss"],
})
export class ServiceComponent implements OnInit {
  services: Service[] = [];
  favoriteSessionsMap: Map<number, Service>;
  columnContent: string[] = [];
  isButtonsLoaded: boolean = false;
  membershipNumber: any;

  constructor(
    public dialog: MatDialog,
    public servicesService: ServicesService,
    private clientsService: ClientsService,
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
    this.clientsService.getClientInfo().subscribe((profiles: any[]) => {
      profiles.forEach((profile: any) => {
        this.membershipNumber = {
          membershipNumber: profile.membershipNumber.toString(),
        };
      });
      this.servicesService.getFavoriteServices(this.membershipNumber).subscribe(
        (res) => {
          console.log("Lo logre 🎉");
          this.loadFavoriteServices_aux(res);
          console.log("Lo logre 🎉");
        },
        (err) => {
          console.log("no logre 🎉");
          console.log(err);
        }
      );
    });
  }

  loadFavoriteServices_aux(services: Service[]) {
    services.forEach((service) => {
      if (service.id != undefined)
        this.favoriteSessionsMap.set(service.id, service);
    });
  }

  deleteFavoriteService(service: Service) {
    this.servicesService
      .removeFavoriteService(this.membershipNumber, service)
      .subscribe(
        (res) => {
          console.log("Lo logre 🎉");
          if (service.id != undefined)
            this.favoriteSessionsMap.delete(service.id);
          console.log("Lo logre 🎉");
        },
        (err) => {
          console.log("no logre 🎉");
          console.log(err);
        }
      );
  }

  addFavoriteService(service: Service) {
    this.servicesService
      .addFavoriteService(this.membershipNumber, service)
      .subscribe(
        (res) => {
          console.log("Lo logre 🎉");
          if (service.id != undefined)
            this.favoriteSessionsMap.set(service.id, service);
          console.log("Lo logre 🎉");
        },
        (err) => {
          console.log("no logre 🎉");
          console.log(err);
        }
      );
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
    this.addFavoriteService(serviceJSON);
  }

  onCancel(serviceJSON: Service) {
    this.deleteFavoriteService(serviceJSON);
  }

  onUpdate() {
    this.loadServices();
  }
}
