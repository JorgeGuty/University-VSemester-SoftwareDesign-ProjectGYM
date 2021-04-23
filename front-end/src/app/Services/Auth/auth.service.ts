import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../../Models/Users/User";
import { mixinColor } from "@angular/material/core";
import { ConnectionsServices } from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated: boolean;
  private currentUser: User;
  private authToken: any;
  private user: any;

  constructor(private httpClient: HttpClient) {
    this.isAuthenticated = false;
    this.authToken = "";
    this.currentUser = {
      id: "",
      username: "",
      password: "",
    };
  }

  // TODO: register in API
  // registerUser(userInfo: User) {
  //   let headers = new HttpHeaders();
  //   headers.append("Content-Type", "application/json");
  //   return this.httpClient.post(
  //     "http://localhost:3000/user/register",
  //     userInfo,
  //     {
  //       headers: headers,
  //     }
  //   );
  // }

  authenticateUser(userInfo: User) {
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/login",
      userInfo,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // TODO: register in API
  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    return this.httpClient.get(
      ConnectionsServices.currentConnection + "/tokenTest",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${this.authToken}`,
        },
      }
    );
  }

  storeUserData(token: string, user: User) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    if (token != null) this.authToken = token;
    console.log("Auth: " + this.authToken);
  }

  // loadUserData() {
  //   const userData = localStorage.getItem("user");
  //   if (userData != null) {
  //     return userData;
  //   }
  //   return "";
  // }

  logout() {
    //null authToken is ""
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
