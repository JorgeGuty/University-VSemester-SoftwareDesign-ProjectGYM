import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

import { User } from "../../Models/Users/User";
import { mixinColor } from "@angular/material/core";
import { ConnectionsServices } from "../Connections/connectionsConstants";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  static getAuthToken() {
    return localStorage.getItem("id_token");
  }

  static getUser() {
    return localStorage.getItem("user");
  }

  private isAuthenticated: boolean;
  private currentUser?: User;
  private authToken: any;
  private helper = new JwtHelperService();

  constructor(private httpClient: HttpClient) {
    this.isAuthenticated = false;
    this.authToken = "";
    this.currentUser = undefined;
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
    console.log(userInfo);
    return this.httpClient.post(
      ConnectionsServices.currentConnection + "/general/login",
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
      ConnectionsServices.currentConnection + "/client/userInfo",
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
    this.currentUser = user;
    console.log(this.currentUser);
    console.log("Guarde los datos");
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    if (token != null) this.authToken = token;
    const user = localStorage.getItem("user");
    if (user != undefined) this.currentUser = JSON.parse(user);
    console.log("Token Loaded: " + this.authToken);
    console.log("User Loaded: " + this.currentUser);
  }

  // loadUserData() {
  //   const userData = localStorage.getItem("user");
  //   if (userData != null) {
  //     return userData;
  //   }
  //   return "";
  // }

  getCurrentUser() {
    if(this.currentUser)console.log(this.currentUser.identifier)
    return this.currentUser;
  }

  loggedIn() {
    const isExpired = this.helper.isTokenExpired(this.authToken);
    return !isExpired;
  }

  logout() {
    //null authToken is ""
    console.log("Sali");
    this.authToken = null;
    this.currentUser = undefined;
    localStorage.clear();
  }
}
