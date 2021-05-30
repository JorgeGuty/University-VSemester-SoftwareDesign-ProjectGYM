import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Service from "src/app/Models/Schedule/Service";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";

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
}
