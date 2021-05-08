import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  getServicesTypes(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/general/services",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}