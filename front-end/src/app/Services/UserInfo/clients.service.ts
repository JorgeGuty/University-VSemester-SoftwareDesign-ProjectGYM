import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../Auth/auth.service";
import ConnectionsServices from "../Connections/connectionsConstants";
import Client from "src/app/Models/Clients/Client";

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
      var userForm: any = { membershipNumber: user.identifier.toString() };
    }
    console.log(user);
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

  getClients(): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/clients",
      { filterDebtors: "0" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  insertClient(clientForm: Client): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/createClient",
      clientForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  deleteClient(clientForm: any): Observable<any> {
    // "membershipNumber"
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/deleteClient",
      clientForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  updateClient(clientForm: any): Observable<any> {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/updateClientDetails",
      clientForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }

  paymentClient(
    amountPayment: any,
    subject: any,
    membershipId: any
  ): Observable<any> {
    let paymentForm = {
      membershipNumber: membershipId,
      paymentMethodId: "1",
      amount: amountPayment,
      subject: subject,
    };
    console.log("Payment Form");
    console.log(paymentForm);
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/client/insertCredit",
      paymentForm,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${AuthService.getAuthToken()}`,
        },
      }
    );
  }
}
