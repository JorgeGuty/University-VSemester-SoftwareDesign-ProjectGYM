import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class AdminScheduleService {
  constructor(private httpClient: HttpClient) {}

  //Todo: apply interface
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

  // Todo: do change class instructor
  // changeCurrentSessionInstructor(data:any): Observable<any> {
  //   return this.httpClient.post(
  //     ConnectionsServices.currentConnection + "/admin/changeInstructor",
  //     data,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `${AuthService.getAuthToken()}`,
  //       },
  //     }
  //   );
  // }
}
