import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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

  // Receives a date json {"year" : "yyyy", "month" : "monthName"}
  // Todo: Avisarle a Jorge acerca del json que se envia
  getPreliminarySessionSchedule(dateJSON: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/admin/preliminarySchedule",
      dateJSON,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  insertPreliminarySessionSchedule(form: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/admin/insertPreliminarySession",
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
        observe: "response",
      }
    );
  }

  deletePreliminarySessionSchedule(form: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/admin/deletePreliminarySession",
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
        observe: "response",
      }
    );
  }

  // dateJSON
  confirmPreliminarySchedule(form: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection +
        "/admin/confirmPreliminarySchedule",
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
        observe: "response",
      }
    );
  }
}
