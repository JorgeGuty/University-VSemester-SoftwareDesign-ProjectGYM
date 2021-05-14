import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

import { Session } from "../../Models/Schedule/Session";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";
import User from "src/app/Models/Users/User";

@Injectable({
  providedIn: "root",
})
export class ClientScheduleService {
  constructor(private httpClient: HttpClient) {}

  getCurrentSessionSchedule(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/general/activeSchedule",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getReservedSessions(form: any): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/client/reservedSessions",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  bookSession(clientIdentification: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/general/bookSession",
      clientIdentification,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  cancelBookedSession(sessionId: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/general/cancelBookedSession",
      sessionId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
