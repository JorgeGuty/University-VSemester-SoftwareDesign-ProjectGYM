import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import Client from "src/app/Models/Clients/Client";
import Instructor from "src/app/Models/Schedule/Instructor";
import { AdminScheduleService } from "src/app/Services/Dashboard/admin-schedule.service";

@Component({
  selector: "app-admin-dialogue-unchecked",
  templateUrl: "./admin-dialogue-unchecked.component.html",
  styleUrls: ["./admin-dialogue-unchecked.component.scss"],
})
export class AdminDialogueUncheckedComponent implements OnInit {
  @Output()
  participantsCheckedOutput = new EventEmitter<string>();

  participantsNumber: number[] = [];
  participantsChecked: string;
  participants: Client[];
  participantDisplayed: Client[] = [];
  page = 1;
  pageSize = 4;
  collectionSize: number;
  session: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private adminScheduleService: AdminScheduleService
  ) {
    this.participantsChecked = "";
    this.participants = data.participantsArray;
    this.session = data.session;
    console.log("Logre llegar hasta aca 👲");
    console.log(data);
    console.log(this.participants);
    this.collectionSize = this.participants.length;
  }

  ngOnInit(): void {}

  onConfirm() {
    console.log("Message Confirmed 🙌");
    this.participantsChecked = this.participantsNumber.toString();
    console.log(this.session);
    console.log(this.participantsChecked);
    this.adminScheduleService
      .setAttendance(this.session, this.participantsChecked)
      .subscribe(
        (res) => {
          console.log("Confirmed Successfully 🥂");
          console.log(res);
        },
        (err) => {
          console.log("Error in attendance confirmation 👴");
          console.log(err);
        }
      );
  }

  refreshParticipants() {
    this.participantDisplayed = this.participants
      .map((participant, i) => ({ id: i + 1, ...participant }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  setCheck(membershipNumber: any) {
    let num: number = +membershipNumber;
    let setCheck: boolean = true;
    for (let i = 0; i < this.participantsNumber.length; i++) {
      if (this.participantsNumber[i] === num) {
        setCheck = false;
        this.participantsNumber.splice(i, 1);
        break;
      }
    }

    if (setCheck) this.participantsNumber.push(num);

    this.participantsNumber.push();
    console.log("Lista actualizada 💯");
    console.log(this.participantsNumber);
  }
}
