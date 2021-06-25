import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Client from "src/app/Models/Clients/Client";
import Service from "src/app/Models/Schedule/Service";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";
import { ClientsService } from "../UserInfo/clients.service";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  getServicesTypes(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/services/services",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  insertService(service: Service): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/insertService",
      service,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  deleteService(service: Service): Observable<any> {
    console.log("Hola Hola");
    console.log(service);
    let serviceJson = { serviceNumber: service.id?.toString() };
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/delete",
      serviceJson,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  updateMaxSpaces(serviceMaxSpaces: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/setMaxSpaces",
      serviceMaxSpaces,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getFavoriteServices(membershipNumber: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/favoriteServices",
      membershipNumber,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  removeFavoriteService(
    membershipNumber: any,
    service: Service
  ): Observable<any> {
    membershipNumber.serviceNumber = service.id?.toString();
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/removeFavoriteService",
      membershipNumber,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  addFavoriteService(membershipNumber: any, service: Service): Observable<any> {
    membershipNumber.serviceNumber = service.id?.toString();
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/addFavoriteService",
      membershipNumber,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
