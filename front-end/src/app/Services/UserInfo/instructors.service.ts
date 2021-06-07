import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Instructor from "src/app/Models/Schedule/Instructor";
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

  insertInstructor(instructor: Instructor): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/instructor/insert",
      instructor,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  deleteInstructor(instructor: Instructor): Observable<any> {
    let instructorDeleteJson = { instructorNumber: instructor.id?.toString() };
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/instructor/remove",
      instructorDeleteJson,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getInstructorDetails(instructor: Instructor): Observable<any> {
    let instructorDetailsJson = { instructorNumber: instructor.id?.toString() };
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/instructor/instructorInfo",
      instructorDetailsJson,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
