import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../../Models/Users/User";
import { mixinColor } from "@angular/material/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated: boolean;
  private currentUser: User;
  private authToken: string;
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
    return this.httpClient.post("http://localhost:3000/login", userInfo, {
      headers: { "Content-Type": "application/json" },
    });
  }

  // TODO: register in API
  // getProfile() {
  //   let headers = new HttpHeaders();
  //   this.loadToken();
  //   headers.append("Authorization", this.authToken);
  //   headers.append("Content-Type", "application/json");
  //   return this.httpClient.get("http://localhost:3000/user/profile", {
  //     headers,
  //   });
  // }

  storeUserData(token: string, user: User) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    if (token != null) this.authToken = token;
  }

  logout() {
    //null authToken is ""
    this.authToken = "";
    this.user = null;
    localStorage.clear();
  }
}
