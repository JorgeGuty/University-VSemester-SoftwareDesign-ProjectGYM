import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { User } from "../../Models/Users/User";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthenticated: boolean;
  private currentUser: User;
  private token: string;
  private user: any;

  constructor(private httpClient: HttpClient) {
    this.isAuthenticated = false;
    this.token = "";
    this.currentUser = {
      _id: "",
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
}
