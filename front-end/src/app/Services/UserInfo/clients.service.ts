import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class ClientsService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  getClientInfo(): Observable<any> {
    let user = this.authService.getCurrentUser();
    if (user != undefined && user.identifier != undefined) {
      var userForm: any = { clientIdentification: user.identifier.toString() };
    }
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/clientInfo",
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
