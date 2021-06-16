import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/Services/Auth/auth.service";
import { ClientsService } from "src/app/Services/UserInfo/clients.service";

@Component({
  selector: "app-client-payment-dialogue",
  templateUrl: "./client-payment-dialogue.component.html",
  styleUrls: ["./client-payment-dialogue.component.scss"],
})
export class ClientPaymentDialogueComponent implements OnInit {
  prof_payment: string = "";
  prof_subject: string = "";
  prof_membership: string = "";

  constructor(
    private clientsService: ClientsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  commitTransaction() {
    console.log("Transaction commited");
    this.clientsService
      .paymentClient(this.prof_payment, this.prof_subject, this.prof_membership)
      .subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
