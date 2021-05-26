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
export class SessionsService {
  constructor(private httpClient: HttpClient) {}

  bookSession(form: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/sessions/bookSession",
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  cancelBookedSession(form: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/sessions/cancelBooking",
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
