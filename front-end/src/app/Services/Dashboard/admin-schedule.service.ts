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
      ConnectionsServices.currentConnection + "/sessions/activeSchedule",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  getUncheckedSessionSchedule(): Observable<any> {
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/sessions/attendancePending",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  // Todo: do change class instructor
  changeCurrentSessionInstructor(
    sessionForm: any,
    instructorId: any
  ): Observable<any> {
    let form: any = {
      instructorNumber: instructorId.toString(),
      date: sessionForm.date.toString(),
      roomId: "1",
      startTime: sessionForm.time.toString(),
    };
    return this.httpClient.post(
      ConnectionsServices.currentConnection +
        "/sessions/changeSessionInstructor",
      form,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  // Receives a date json {"year" : "yyyy", "month" : "monthName"}
  // Todo: Avisarle a Jorge acerca del json que se envia
  getPreliminarySessionSchedule(dateJSON: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection +
        "/preliminarySchedule/preliminarySchedule",
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
    console.log("ESTO ES LO QUE ME ENTRA");
    console.log(form);
    return this.httpClient.post(
      ConnectionsServices.currentConnection +
        "/preliminarySchedule/insertPreliminarySession",
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
      ConnectionsServices.currentConnection +
        "/preliminarySchedule/deletePreliminarySession",
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
        "/preliminarySchedule/confirmPreliminarySchedule",
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

  setRoomWorkingHours(form: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/rooms/setWorkingHours",
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

  getSessionParticipant(session: any): Observable<any> {
    let sessionJson = { date: session.date, roomId: "1", time: session.time };
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/sessionParticipants",
      sessionJson,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
        observe: "response",
      }
    );
  }

  setAttendance(session: any, attendants: string): Observable<any> {
    let attendantsJson = {
      date: session.date,
      roomId: "1",
      startTime: session.time,
      attendants: attendants,
    };
    console.log("ERROR RARO");
    console.log(attendantsJson);
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/sessions/setAttendance",
      attendantsJson,
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
