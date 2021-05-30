import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { RoomServiceService } from "src/app/Services/Room/room-service.service";

@Component({
  selector: "app-admin-room-dialogue",
  templateUrl: "./admin-room-dialogue.component.html",
  styleUrls: ["./admin-room-dialogue.component.scss"],
})
export class AdminRoomDialogueComponent implements OnInit {
  roomForm = new FormGroup({
    roomId: new FormControl("", Validators.required),
    roomMaxSpace: new FormControl("", Validators.required),
  });

  constructor(private roomService: RoomServiceService) {}

  ngOnInit(): void {}

  onSave() {
    let roomForm: any = {
      roomNumber: this.roomForm.value.roomId.toString(),
      maxSpaces: this.roomForm.value.roomMaxSpace.toString(),
    };
    console.log(roomForm);
    this.roomService.updateRoomMaxSpaces(roomForm).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
