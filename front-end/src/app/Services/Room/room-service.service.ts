import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";
@Injectable({
  providedIn: "root",
})
export class RoomServiceService {
  constructor(private httpClient: HttpClient) {}

  updateRoomMaxSpaces(roomMaxSpaces: any): Observable<any> {
    console.log(roomMaxSpaces);
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/services/setMaxSpaces",
      roomMaxSpaces,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
