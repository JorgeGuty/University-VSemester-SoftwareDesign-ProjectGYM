import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Session } from "../../Models/Schedule/Session";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class ClientScheduleService {
  private sessions = [];

  constructor(private httpClient: HttpClient) {}

  getCurrentSessionSchedule(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/activeSchedule",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
