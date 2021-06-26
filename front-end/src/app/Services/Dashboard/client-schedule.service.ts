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
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getCurrentSessionSchedule(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/sessions/activeSchedule",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getReservedSessions(): Observable<any> {
    let user = this.authService.getCurrentUser();
    if (user != undefined && user.identifier != undefined) {
      var userForm: any = { membershipNumber: user.identifier.toString() };
      console.log("PRUEBAAAA");
      console.log(userForm);
    }
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/sessions/reservedSessions",
      userForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getFilteredSessions(filterType: string, filterTerm: string): Observable<any> {
    let userForm: any = { filterType: filterType, filterTerm: filterTerm };

    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/sessions/getFilteredSchedule",
      userForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
