import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class InstructorsService {
  constructor(private httpClient: HttpClient) {}

  getRegisteredInstructors(): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/instructor/instructors",
      { filterByService: "0", service: "", filterByType: "0", type: "" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getInstructorsFromService(serviceName: string): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/instructor/instructors",
      {
        filterByService: "1",
        service: serviceName,
        filterByType: "0",
        type: "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
