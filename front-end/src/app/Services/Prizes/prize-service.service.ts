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
export class PrizeServiceService {
  constructor(private httpClient: HttpClient) {}

  getServicesTypes(month: string, year: string): Observable<any> {
    let dateJson: any = { month: month, year: year };
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/monthlyPrizes",
      dateJson,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  updatePrizes(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/client/notifyPrizes",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
